import { type NextRequest, NextResponse } from 'next/server'
import { asAppError, throwAppError } from '@/lib/errors'

const WIDGETS: Record<string, { id: string; name: string }> = {
  '1': { id: '1', name: 'Sprocket' },
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const widget = WIDGETS[id]
    if (!widget) throwAppError('NOT_FOUND', { resource: 'widget', id })
    return NextResponse.json(widget)
  } catch (err) {
    const typed = asAppError(err, 'STORAGE_FAILED', { cause: String(err) })
    return NextResponse.json(typed.toJSON(), { status: typed.status })
  }
}
