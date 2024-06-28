import { type Endpoint } from './endpoints.js'
import { IcecastServerError } from './errors.js'
import { IcecastAdminParams } from './index.js'
import { parseBasicAuthHeaders } from './utils.js'

interface RequestOptions {
  params?: Record<string, string>
  body?: Record<string, string>
}

class Api {
  host: string
  admin: IcecastAdminParams
  static default: typeof Api
  constructor(host: string, admin: IcecastAdminParams) {
    (this.host = host, this.admin = admin)
  }

  checkHost = () => {
    if (!this.host) {
      throw new IcecastServerError('Host is missing.')
    }
  }

  makeRequest = async (endpoint: Endpoint, options?: RequestOptions): Promise<unknown> => {
    const { params, body } = options ?? {}
    this.checkHost()
    const baseUrl = this.host
    const apiUrl = baseUrl + endpoint.path + (params ? `?${new URLSearchParams(params)}` : '')
    const authenticate = endpoint.auth

    const headers = {
      ...(authenticate && { ...parseBasicAuthHeaders(this.admin.username, this.admin.password) }),
    }

    try {
      const response = await fetch(apiUrl, {
        headers,
        method: endpoint.method,
        ...(body && { body: JSON.stringify(body) }),
      })
      if (!response.ok) {
        throw new IcecastServerError(response.statusText)
      } else {
        return endpoint?.xml
          ? {
              status: response.status,
              message: await response.text(),
            }
          : await response.json()
      }
    } catch (error: any) {
      throw new IcecastServerError(error?.cause?.message ?? error?.message)
    }
  }
}

export default Api
