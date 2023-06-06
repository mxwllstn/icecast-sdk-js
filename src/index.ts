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
  static default: typeof IcecastServer
  constructor(host: string) {
    (this.host = host)
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
    const sources = await this.getSources()
    return sources && sources.filter(source => source.mount === `/${mountpoint}`)?.[0]
  }

}

/* exports for commonjs and es6 */
module.exports = IcecastServer
module.exports.Icecast = IcecastServer
module.exports.default = IcecastServer
export default IcecastServer
