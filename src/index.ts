import axios from 'axios'

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

export type IcecastSources = IcecastSource[]
class IcecastServer {
  host: string
  admin?: { username: string; password: string }
  static default: typeof IcecastServer
  constructor(host: string, admin?: { username: string; password: string }) {
    (this.host = host), (this.admin = admin)
  }

  getStats = async (): Promise<IcecastStats> => {
    const req = (await axios.get(`${this.host}/status-json.xsl`)).data
    const data = req?.icestats || JSON.parse(req.replace('"title":-,', '"title":"-",')).icestats
    if (data?.source) {
      data.source = Array.isArray(data.source)
        ? data.source.map((source: any) => {
            const mount = `/${source?.listenurl?.split('/').pop()}`
            return {
              mount,
              ...source
            }
          })
        : {
            mount: `/${data.source.listenurl.split('/').pop()}`,
            ...data.source
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
    return sources && sources.filter(source => source.mount === `/${mountpoint}`)?.[0]
  }

  updateSource = async (mountpoint: string, metadata: string): Promise<IcecastSource | any> => {
    if (!this.admin?.username || !this.admin?.password) {
      throw new Error('admin username and password required')
    }
    if (!mountpoint) {
      throw new Error('mountpoint required')
    }
    if (!metadata) {
      throw new Error('metadata required')
    }
    const data = await axios.get(`${this.host}/admin/metadata`, {
      auth: {
        username: this.admin.username,
        password: this.admin.password
      },
      params: {
        mount: `/${mountpoint}`,
        mode: 'updinfo',
        song: metadata
      }
    })
    return data.status === 200 ? { ...(await this.getSource(mountpoint)), ...(metadata && { title: metadata }) } : data
  }
}

/* exports for commonjs and es6 */
module.exports = IcecastServer
module.exports.Icecast = IcecastServer
module.exports.default = IcecastServer
export default IcecastServer
