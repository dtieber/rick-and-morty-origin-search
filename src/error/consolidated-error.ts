export class ConsolidatedError extends Error {
  constructor(message: string, private underlying: Error[]) {
    const consolidatedMessage = `${message}: ${underlying.map(error => error.message).join()}`
    super(consolidatedMessage)
    Object.setPrototypeOf(this, ConsolidatedError.prototype)
  }
}
