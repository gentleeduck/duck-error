import { createErrorKit, detail, type ErrorKit, fault, type KitError } from '@gentleduck/errors'

const REGISTRY = {
  NOT_FOUND: detail<{ resource: string; id: string }>(404),
  RATE_LIMITED: detail<{ retryAfter: number }>(429),
  STORAGE_FAILED: fault<{ cause?: string }>(500),
} as const satisfies Record<string, number>

const kit = createErrorKit('AppError', REGISTRY)

export const AppError = kit.ErrorClass
export type AppError<C extends AppError.Code = AppError.Code> = KitError<typeof REGISTRY, C>
export namespace AppError {
  export type Code = ErrorKit.Code<typeof REGISTRY>
}

export const throwAppError = kit.throwError
export const asAppError = kit.asError
export const hasAppErrorCode = kit.hasErrorCode
