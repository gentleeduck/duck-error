'use server'

import { asAppError, throwAppError } from '@/lib/errors'

interface CreateWidgetInput {
  name: string
}

export async function createWidget(input: CreateWidgetInput) {
  try {
    // A Server Action can throw an AppError internally — it's crossing the boundary
    // to the client unchanged that Next.js won't let through, which is why this
    // whole function is wrapped and returns a discriminated value instead.
    if (!input.name) throwAppError('NOT_FOUND', { resource: 'widget-name', id: 'missing' })
    const widget = { id: crypto.randomUUID(), name: input.name }
    return { ok: true as const, widget }
  } catch (err) {
    const typed = asAppError(err, 'STORAGE_FAILED', { cause: String(err) })
    return { ok: false as const, error: typed.toJSON().error }
  }
}
