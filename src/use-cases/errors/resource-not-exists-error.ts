export class ResourceNotExistErro extends Error {
    constructor() {
      super('Resource not found.')
    }
  }