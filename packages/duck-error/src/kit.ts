import type { Brand } from './brand'
import { scrubMeta } from './scrub'

/** Type-level helpers derived from a registry: which codes exist, what each one carries, and the args its constructor demands. */
export namespace ErrorKit {
  /** A plain object literal mapping codes to HTTP status numbers, the whole contract a kit is built from. */
  export type Registry = Record<string, number>

  /** Every key of a registry, narrowed to `string`: the set of codes a kit's methods accept. */
  export type Code<R extends Registry> = keyof R & string

  /**
   * The meta shape a code carries, looked up straight from the registry's own value for it.
   * @example
   * ```ts
   * type WidgetMeta = ErrorKit.Meta<typeof REGISTRY, 'WIDGET_NOT_FOUND'> // { widgetId: string }
   * ```
   */
  export type Meta<R extends Registry, C extends Code<R>> = Brand.MetaOf<R[C]>

  /** True when T has at least one non-optional key. */
  export type HasRequired<T> = { [K in keyof T]-?: undefined extends T[K] ? never : K }[keyof T]

  /**
   * Every code in the registry branded {@link fault}: the ones a store or adapter can raise itself, as opposed to only flow/validation logic.
   * @example
   * ```ts
   * type StoreRaisable = ErrorKit.Faults<typeof REGISTRY> // 'STORAGE_FAILED' | 'INTERNAL'
   * ```
   */
  export type Faults<R extends Registry> = { [C in Code<R>]: R[C] extends Brand.Fault ? C : never }[Code<R>]

  /**
   * A code that needs nothing beyond itself.
   * @example
   * ```ts
   * type NoMetaNeeded = ErrorKit.Bare<typeof REGISTRY> // every code declared with a plain number, no detail()/fault()<M>
   * ```
   */
  export type Bare<R extends Registry> = {
    [C in Code<R>]: [HasRequired<Meta<R, C>>] extends [never] ? C : never
  }[Code<R>]

  /**
   * Meta (required, optional, or absent per Meta's required keys) followed by an always-optional
   * `cause`. Meta's own slot is gated on the value's own Carries brand, not on Meta, since a bare
   * code's Meta resolves to `{}` which anything would satisfy. A bare code still reserves the meta
   * slot, typed to accept only `undefined`, so cause stays in a fixed position the constructor can
   * read without knowing which branch produced the call.
   * @example
   * ```ts
   * const REGISTRY = {
   *   TEST_BARE: 500, // Args -> [meta?: undefined, cause?: unknown]
   *   TEST_DETAIL: detail<{ field: string }>(400), // Args -> [meta: { field: string }, cause?: unknown]
   *   TEST_DETAIL_NO_ARG: detail(400), // no <M> given -> [meta?: undefined, cause?: unknown] (behaves like bare)
   * } as const satisfies Record<string, number>
   * const TestError = createErrorKit('TestError', REGISTRY).ErrorClass
   *
   * new TestError('TEST_BARE') // ok, no second argument
   * new TestError('TEST_BARE', undefined, dbError) // ok, cause with no meta
   * // @ts-expect-error a code that carries something cannot be raised without it
   * new TestError('TEST_DETAIL')
   * new TestError('TEST_DETAIL', { field: 'x' }) // ok
   * new TestError('TEST_DETAIL', { field: 'x' }, dbError) // ok, meta and cause together
   * ```
   */
  export type Args<R extends Registry, C extends Code<R>> =
    R[C] extends Brand.Carries<any>
      ? [HasRequired<Meta<R, C>>] extends [never]
        ? [meta?: Meta<R, C>, cause?: unknown]
        : [meta: Meta<R, C>, cause?: unknown]
      : [meta?: undefined, cause?: unknown]
}

/**
 * The shape every kit's error instances have, independent of which kit built them.
 * @example
 * ```ts
 * const err = kit.fail('WIDGET_NOT_FOUND', { widgetId: 'w1' })
 * err.toJSON() // { ok: false, error: { code: 'WIDGET_NOT_FOUND', status: 404, widgetId: 'w1' } }
 * ```
 */
export interface KitError<R extends ErrorKit.Registry, C extends ErrorKit.Code<R> = ErrorKit.Code<R>> extends Error {
  readonly code: C
  readonly status: number
  /** Same value as `status`, under the name Nest's base exception filter reads. */
  readonly statusCode: number
  readonly meta: Record<string, unknown>
  toJSON(): { ok: false; error: { code: C; status: number } & Record<string, unknown> }
}

/** What {@link createErrorKit} returns: the error class plus the construct/throw/narrow helpers built around it. */
export interface ErrorKit<R extends ErrorKit.Registry> {
  /** For instanceof checks or subclassing. See createErrorKit for why it's never shared across kits. */
  readonly ErrorClass: new <C extends ErrorKit.Code<R> = ErrorKit.Code<R>>(
    code: C,
    ...args: ErrorKit.Args<R, C>
  ) => KitError<R, C>
  /** Constructs and returns (never throws) a typed instance. `Args`' trailing `cause` is set on the
   *  instance when given, left unset (not `undefined`-but-present) when omitted. */
  fail<C extends ErrorKit.Code<R>>(code: C, ...args: ErrorKit.Args<R, C>): KitError<R, C>
  /** {@link ErrorKit.fail}, thrown rather than returned. */
  throwError<C extends ErrorKit.Code<R>>(code: C, ...args: ErrorKit.Args<R, C>): never
  /** An already-typed error as it stands; anything else wrapped under the fallback code with the original on `cause`. */
  asError<C extends ErrorKit.Code<R>>(error: unknown, code: C, ...args: ErrorKit.Args<R, C>): KitError<R>
  /** {@link ErrorKit.asError}, thrown rather than returned. */
  rethrowError<C extends ErrorKit.Code<R>>(error: unknown, code: C, ...args: ErrorKit.Args<R, C>): never
  /**
   * Checked by property, not instanceof, so a duplicated copy of this package still matches; meta is checked too, since code alone could narrow to a meta that isn't actually there.
   * @example
   * ```ts
   * try {
   *   await widgets.get(id)
   * } catch (err) {
   *   if (kit.hasErrorCode(err, 'WIDGET_NOT_FOUND')) return res.status(404).json({ widgetId: err.meta.widgetId })
   *   throw err
   * }
   * ```
   */
  hasErrorCode<C extends ErrorKit.Code<R>>(err: unknown, code: C): err is Error & { readonly meta: ErrorKit.Meta<R, C> }
  /**
   * Reads `err.meta` at the shape `code` declares. Safe once the caller has confirmed `err.code === code`.
   * @example
   * ```ts
   * if (err.code === 'WIDGET_NOT_FOUND') kit.metaOf(err, 'WIDGET_NOT_FOUND').widgetId // typed, no cast
   * ```
   */
  metaOf<C extends ErrorKit.Code<R>>(err: KitError<R>, code: C): ErrorKit.Meta<R, C>
}

/**
 * Each call declares its own class (never shared), so two kits' instances never satisfy each other's instanceof; name becomes both the runtime `.name` and the stack-trace identity.
 * @example
 * ```ts
 * const REGISTRY = {
 *   WIDGET_NOT_FOUND: detail<{ widgetId: string }>(404),
 *   STORAGE_FAILED: fault<{ cause?: string }>(500),
 * } as const satisfies Record<string, number>
 *
 * const kit = createErrorKit('AppError', REGISTRY)
 * export const AppError = kit.ErrorClass
 *
 * kit.throwError('WIDGET_NOT_FOUND', { widgetId: 'w1' })
 * // -> AppError { code: 'WIDGET_NOT_FOUND', status: 404, meta: { widgetId: 'w1' } }
 * ```
 */
export function createErrorKit<const R extends ErrorKit.Registry, Name extends string>(
  name: Name,
  registry: R,
): ErrorKit<R> {
  class KitErrorImpl<C extends ErrorKit.Code<R> = ErrorKit.Code<R>> extends Error {
    readonly code: C
    readonly status: number
    readonly statusCode: number
    readonly meta: Record<string, unknown>

    constructor(code: C, ...args: ErrorKit.Args<R, C>) {
      super(code)
      this.name = name
      this.code = code
      // Total in fact (code is keyof R), but noUncheckedIndexedAccess can't see that through a generic R.
      this.status = registry[code] as number
      this.statusCode = this.status
      // Meta is always slot 0 (undefined for a bare code) and cause always slot 1: fixed positions,
      // because this constructor runs generically across every branch of Args and can't tell at
      // runtime which branch a given call came from (the Carries brand is compile-time only).
      const [meta, cause] = args as [Record<string, unknown> | undefined, unknown]
      this.meta = { ...meta }
      if (cause !== undefined) this.cause = cause
    }

    toJSON(): { ok: false; error: { code: C; status: number } & Record<string, unknown> } {
      return { ok: false, error: { code: this.code, status: this.status, ...scrubMeta(this.meta) } }
    }
  }

  function fail<C extends ErrorKit.Code<R>>(code: C, ...args: ErrorKit.Args<R, C>): KitError<R, C> {
    return new KitErrorImpl<C>(code, ...args)
  }

  function throwError<C extends ErrorKit.Code<R>>(code: C, ...args: ErrorKit.Args<R, C>): never {
    throw fail(code, ...args)
  }

  function asError<C extends ErrorKit.Code<R>>(error: unknown, code: C, ...args: ErrorKit.Args<R, C>): KitError<R> {
    if (error instanceof KitErrorImpl) return error
    const typed = fail(code, ...args)
    typed.cause = error
    return typed
  }

  function rethrowError<C extends ErrorKit.Code<R>>(error: unknown, code: C, ...args: ErrorKit.Args<R, C>): never {
    throw asError(error, code, ...args)
  }

  function hasErrorCode<C extends ErrorKit.Code<R>>(
    err: unknown,
    code: C,
  ): err is Error & { readonly meta: ErrorKit.Meta<R, C> } {
    return err instanceof Error && 'code' in err && err.code === code && 'meta' in err
  }

  // biome-ignore lint/correctness/noUnusedFunctionParameters: code pins C so the call site infers Meta<R, C>
  function metaOf<C extends ErrorKit.Code<R>>(err: KitError<R>, code: C): ErrorKit.Meta<R, C> {
    return err.meta as ErrorKit.Meta<R, C>
  }

  return { ErrorClass: KitErrorImpl, fail, throwError, asError, rethrowError, hasErrorCode, metaOf }
}
