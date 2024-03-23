import express from 'express'

export const ErrorHandlerMiddleware = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'
  return res.status(statusCode).json({ message }).end()
}
