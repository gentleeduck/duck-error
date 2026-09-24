import { Controller, Get, Param } from '@nestjs/common'
import { asAppError, throwAppError } from './errors'

const WIDGETS: Record<string, { id: string; name: string }> = {
  '1': { id: '1', name: 'Sprocket' },
}

@Controller()
export class WidgetsController {
  @Get('widgets/:id')
  findOne(@Param('id') id: string) {
    const widget = WIDGETS[id]
    if (!widget) throwAppError('NOT_FOUND', { resource: 'widget', id })
    return widget
  }

  @Get('rate-limited')
  rateLimited() {
    throwAppError('RATE_LIMITED', { retryAfter: 60 })
  }

  @Get('boom')
  boom() {
    try {
      throw new Error('connection refused')
    } catch (err) {
      throw asAppError(err, 'STORAGE_FAILED', { cause: String(err) })
    }
  }
}
