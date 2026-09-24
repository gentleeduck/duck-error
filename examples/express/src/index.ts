import express from 'express'
import { errorHandler } from './error-handler'
import { asAppError, throwAppError } from './errors'

const WIDGETS: Record<string, { id: string; name: string }> = {
  '1': { id: '1', name: 'Sprocket' },
}

const app = express()

app.get('/widgets/:id', (req, res) => {
  const widget = WIDGETS[req.params.id]
  if (!widget) throwAppError('NOT_FOUND', { resource: 'widget', id: req.params.id })
  res.json(widget)
})

app.get('/rate-limited', () => {
  throwAppError('RATE_LIMITED', { retryAfter: 60 })
})

app.get('/boom', () => {
  try {
    throw new Error('connection refused')
  } catch (err) {
    throw asAppError(err, 'STORAGE_FAILED', { cause: String(err) })
  }
})

// Registered last: Express only treats a 4-arg handler as error middleware,
// and only routes reached after this point in the chain forward to it.
app.use(errorHandler)

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('express example listening on http://localhost:3000')
})
