export interface Endpoint {
  method: 'CREATE' | 'GET' | 'PUT' | 'DELETE'
  path: string
  args: string[]
  auth: boolean
  xml?: boolean
}

export default {
  getStats: {
    method: 'GET',
    path: '/status-json.xsl',
    auth: false,
  } as Endpoint,
  updateSource: {
    method: 'GET',
    path: '/admin/metadata',
    auth: true,
    xml: true,
  } as Endpoint,
}
