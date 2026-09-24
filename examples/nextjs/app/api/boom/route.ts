import { NextResponse } from 'next/server'
import { asAppError } from '@/lib/errors'

export async function GET() {
  try {
    throw new Error('connection refused')
  } catch (err) {
    const typed = asAppError(err, 'STORAGE_FAILED', { cause: String(err) })
    return NextResponse.json(typed.toJSON(), { status: typed.status })
  }
}
