import { NextResponse } from 'next/server'
import { asAppError, throwAppError } from '@/lib/errors'

export async function GET() {
  try {
    throwAppError('RATE_LIMITED', { retryAfter: 60 })
  } catch (err) {
    const typed = asAppError(err, 'STORAGE_FAILED', { cause: String(err) })
    return NextResponse.json(typed.toJSON(), { status: typed.status })
  }
}
