import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'
import httpStatus from 'http-status'
const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message)
    }
    next()
  }
}

export default validate
