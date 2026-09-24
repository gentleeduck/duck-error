import type { ErrorRequestHandler } from 'express'
import { AppError } from './errors'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.status).json(err.toJSON())
    return
  }
  // eslint-disable-next-line no-console
  console.error(err)
  res.status(500).json({ ok: false, error: { code: 'INTERNAL', status: 500 } })
}
