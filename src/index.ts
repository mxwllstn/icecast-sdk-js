import Api from './Api.js'
import endpoints from './endpoints.js'

export interface IcecastStats {
  admin: string
  host: string
  location: string
  server_id: string
  server_start: string
  server_start_iso8601: string
  source: IcecastSource | IcecastSources | null
}

export interface IcecastSource {
  mount: string
  bitrate: number
  genre: string
  listener_peak: number
  listeners: number
  listenurl: string
  server_description: string
  server_name: string
  server_type: string
  server_url: string
  stream_start: string
  stream_start_iso8601: string
  title: string
  dummy: null
}

export interface IcecastAdminParams {
  username?: string
  password?: string
}

export type IcecastSources = IcecastSource[]
class IcecastServer {
  host: string
  admin: IcecastAdminParams
  api: Api
  static default: typeof IcecastServer
  constructor(host: string, admin: IcecastAdminParams = {}) {
    (this.host = host), (this.admin = admin)
    this.api = new Api(host, admin)
  }

  getStats = async (): Promise<IcecastStats> => {
    const req = await this.api.makeRequest(endpoints.getStats) as any
    const data = req?.icestats || JSON.parse(req?.replace('"title":-,', '"title":"-",'))?.icestats
    if (data?.source) {
      data.source = Array.isArray(data.source)
        ? data.source.map((source: any) => {
          const mount = `/${source?.listenurl?.split('/').pop()}`
          return {
            mount,
            ...source,
          }
        })
        : {
            mount: `/${data.source.listenurl.split('/').pop()}`,
            ...data.source,
          }
    }
    return data
  }

  getSources = async (): Promise<IcecastSources | null> => {
    const { source } = (await this.getStats()) || {}
    return source ? (Array.isArray(source) ? source : [source]) : null
  }

  getSource = async (mountpoint: string): Promise<IcecastSource | null> => {
    if (!mountpoint) {
      throw new Error('mountpoint required')
    }
    const sources = await this.getSources()
    const source = sources?.filter(source => source.mount === `/${mountpoint}`)?.[0] ?? null
    if (!source) {
      throw new Error('source does not exist at mountpoint')
    }
    return source
  }

  updateSource = async (mountpoint: string, metadata: string): Promise<any> => {
    if (!mountpoint) {
      throw new Error('mountpoint required')
    }
    if (!metadata) {
      throw new Error('metadata required')
    }
    const source = await this.getSource(mountpoint)
    const params = {
      mount: `/${mountpoint}`,
      mode: 'updinfo',
      song: metadata,
    }
    /* 3825 character limit */
    const data = await this.api.makeRequest(endpoints.updateSource, { params }) as any
    const response = data.status === 200 ? { ...source, ...(metadata && { title: metadata }) } as IcecastSource : data
    return response
  }
}

export default IcecastServer
