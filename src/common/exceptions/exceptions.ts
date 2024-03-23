import httpStatus from 'http-status'
export class BadRequestException extends Error {
  statusCode: number
  constructor(message = 'BAD_REQUEST') {
    super(message)
    this.statusCode = httpStatus.BAD_REQUEST
  }
}
export class UnauthorizedException extends Error {
  statusCode: number
  constructor(message = 'UNAUTHORIZED') {
    super(message)
    this.statusCode = httpStatus.UNAUTHORIZED
  }
}

export class NotFoundException extends Error {
  statusCode: number
  constructor(message = 'NOT FOUND') {
    super(message)
    this.statusCode = httpStatus.NOT_FOUND
  }
}

export class InternalServerErrorException extends Error {
  statusCode: number
  constructor(message = 'INTERNAL SERVER ERROR') {
    super(message)
    this.statusCode = httpStatus.INTERNAL_SERVER_ERROR
  }
}
