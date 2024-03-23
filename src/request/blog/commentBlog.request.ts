import Joi from 'joi'
export const CommentBlogValidation = Joi.object({
  content: Joi.string().required(),
  user: Joi.object().required(),
  like: Joi.number().optional(),
  createdAt: Joi.date().default(Date.now)
})
