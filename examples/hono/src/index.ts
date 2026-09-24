import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { AppError, asAppError, throwAppError } from './errors'

const WIDGETS: Record<string, { id: string; name: string }> = {
  '1': { id: '1', name: 'Sprocket' },
}

const app = new Hono()

app.onError((err, c) => {
  if (err instanceof AppError) {
    // c.json's status parameter is typed against a fixed union of known HTTP status
    // codes, not `number` — a status computed at runtime needs this cast. Type-level
    // only: any number still reaches the response as the same status either way.
    return c.json(err.toJSON(), err.status as any)
  }
  console.error(err)
  return c.json({ ok: false, error: { code: 'INTERNAL', status: 500 } }, 500)
})

app.get('/widgets/:id', (c) => {
  const id = c.req.param('id')
  const widget = WIDGETS[id]
  if (!widget) throwAppError('NOT_FOUND', { resource: 'widget', id })
  return c.json(widget)
})

// Expression body, not a block: a block with no `return` infers `void` even when its
// last statement is a `never`-returning call, which Hono's Handler type rejects.
app.get('/rate-limited', () => throwAppError('RATE_LIMITED', { retryAfter: 60 }))

app.get('/boom', () => {
  try {
    throw new Error('connection refused')
  } catch (err) {
    throw asAppError(err, 'STORAGE_FAILED', { cause: String(err) })
  }
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  // eslint-disable-next-line no-console
  console.log('hono example listening on http://localhost:3000')
})
