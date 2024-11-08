interface IErrorFeed {
  status?: number
  title?: string
  detail?: string
  meta?: any // eslint-disable-line
}

export default class Error {
  status = 500
  title = 'InternalServerError'
  detail?: string
  meta: any // eslint-disable-line

  constructor(feed: IErrorFeed = {}) {
    this.status = feed.status || this.status
    this.title = feed.title || this.title
    this.detail = feed.detail
    this.meta = feed.meta || {}
  }
}

export class BadRequestError extends Error {
  constructor(reason?: string) {
    super({
      status: 400,
      title: 'Bad Request',
      detail: 'The request body was invalid',
      meta: { reason },
    })
  }
}

export class ResourceNotFoundError extends Error {
  constructor(reason?: string) {
    super({
      status: 404,
      title: 'Not Found',
      detail: reason || 'Requested resource not found',
    })
  }
}

export class ConflictError extends Error {
  constructor(detail: string) {
    super({ status: 409, title: 'Conflict', detail })
  }
}

export class ForbiddenError extends Error {
  constructor(detail?: string) {
    super({
      status: 403,
      title: 'Forbidden',
      detail,
    })
  }
}

export class UnauthorizedError extends Error {
  constructor(detail?: string) {
    super({
      status: 401,
      title: 'Unauthorized',
      detail,
    })
  }
}

export class BadJWTError extends Error {
  constructor(token: string) {
    super({
      status: 400,
      title: 'Bad JWT',
      detail: 'The request cannot be authorized due to bad JWT Authorization',
      meta: {
        givenToken: token,
      },
    })
  }
}

export class InvalidJWTError extends Error {
  constructor(token: string) {
    super({
      status: 403,
      title: 'Invalid JWT',
      detail:
        'The request cannot be authorized, the given JWT was invalid or has expirated',
      meta: {
        givenToken: token,
      },
    })
  }
}

export class MissingJWTError extends Error {
  constructor() {
    super({
      status: 400,
      title: 'Missing JWT',
      detail: 'Bad request, there was no authorization JWT specified',
    })
  }
}
