export class IcecastServerError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'IcecastServerError'
  }
}
