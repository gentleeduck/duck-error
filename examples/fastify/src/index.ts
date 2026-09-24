import Fastify from 'fastify'
import { AppError, asAppError, throwAppError } from './errors'

const WIDGETS: Record<string, { id: string; name: string }> = {
  '1': { id: '1', name: 'Sprocket' },
}

const app = Fastify()

app.setErrorHandler((err, _req, reply) => {
  if (err instanceof AppError) {
    reply.status(err.status).send(err.toJSON())
    return
  }
  app.log.error(err)
  reply.status(500).send({ ok: false, error: { code: 'INTERNAL', status: 500 } })
})

app.get('/widgets/:id', async (req) => {
  const { id } = req.params as { id: string }
  const widget = WIDGETS[id]
  if (!widget) throwAppError('NOT_FOUND', { resource: 'widget', id })
  return widget
})

app.get('/rate-limited', async () => {
  throwAppError('RATE_LIMITED', { retryAfter: 60 })
})

app.get('/boom', async () => {
  try {
    throw new Error('connection refused')
  } catch (err) {
    throw asAppError(err, 'STORAGE_FAILED', { cause: String(err) })
  }
})

app.listen({ port: 3000 }, () => {
  // eslint-disable-next-line no-console
  console.log('fastify example listening on http://localhost:3000')
})
