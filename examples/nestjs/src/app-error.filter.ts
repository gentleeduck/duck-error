import { type ArgumentsHost, Catch, type ExceptionFilter } from '@nestjs/common'
import type { Response } from 'express'
import { AppError } from './errors'

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  catch(err: AppError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>()
    res.status(err.statusCode).json(err.toJSON())
  }
}
