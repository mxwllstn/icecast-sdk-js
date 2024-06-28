import { IcecastServerError } from './errors.js'

export function parseBasicAuthHeaders(username?: string, password?: string) {
  if (!username || !password) {
    throw new IcecastServerError('username and password required')
  }
  return { Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64') }
}
