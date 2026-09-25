/** Branded status types: what a code's number also says it carries. */
export namespace Brand {
  /**
   * Required, not optional — optional is satisfied by any plain number; plain key, not unique symbol, to avoid TS4023 in a consumer's own build.
   * @template M - The meta shape the code carries.
   * @example
   * ```ts
   * const REGISTRY = {
   *   WIDGET_NOT_FOUND: detail<{ widgetId: string }>(404),
   * } as const satisfies Record<string, number>
   * const { throwError } = createErrorKit('AppError', REGISTRY)
   *
   * // @ts-expect-error meta is required, not optional
   * throwError('WIDGET_NOT_FOUND')
   * throwError('WIDGET_NOT_FOUND', { widgetId: 'w1' }) // ok
   * ```
   */
  export type Carries<M extends object> = number & { readonly __carries: M }

  /**
   * A status whose code a store/adapter can answer with, rather than one only flow or validation logic raises.
   * @example
   * ```ts
   * const REGISTRY = {
   *   RATE_LIMITED: detail<{ retryAfter: number }>(429), // flow-raised only
   *   STORAGE_FAILED: fault<{ cause?: string }>(500), // an adapter can raise this one itself
   * } as const satisfies Record<string, number>
   *
   * type StoreRaisable = ErrorKit.Faults<typeof REGISTRY> // 'STORAGE_FAILED'
   * ```
   */
  export type Fault = number & { readonly __fault: true }

  /**
   * What a status says its code hands back. A plain status says nothing, which is a meta with no keys.
   * @template S - The status to read the meta from.
   * @example
   * ```ts
   * const REGISTRY = { WIDGET_NOT_FOUND: detail<{ widgetId: string }>(404) } as const satisfies Record<string, number>
   *
   * type Meta = Brand.MetaOf<(typeof REGISTRY)['WIDGET_NOT_FOUND']> // { widgetId: string }
   * type Bare = Brand.MetaOf<500> // Record<never, never> — a plain status carries nothing
   * ```
   */
  export type MetaOf<S> = S extends Carries<infer M> ? M : Record<never, never>
}

/**
 * M can't be inferred (no parameter uses it), so it defaults to never, not object — object would silently accept any meta shape.
 * @template M - The meta shape the code carries.
 * @example
 * ```ts
 * const REGISTRY = {
 *   WIDGET_NOT_FOUND: detail<{ widgetId: string }>(404), // meta required at the call site
 *   BAD_INPUT: detail(400), // no <M> given — behaves like a bare code, not an unchecked one
 * } as const satisfies Record<string, number>
 * ```
 */
export function detail<M extends object = never>(status: number): Brand.Carries<M> {
  return status as Brand.Carries<M>
}

/**
 * The same declaration as {@link detail}, for a code an adapter can answer with itself.
 * @template M - The meta shape the code carries, when given.
 * @example
 * ```ts
 * const REGISTRY = {
 *   INTERNAL: fault(500), // adapter-raisable, no meta
 *   STORAGE_FAILED: fault<{ cause?: string }>(500), // adapter-raisable, with meta
 * } as const satisfies Record<string, number>
 * ```
 */
export function fault(status: number): Brand.Fault
export function fault<M extends object>(status: number): Brand.Carries<M> & Brand.Fault
export function fault<M extends object>(status: number): Brand.Carries<M> & Brand.Fault {
  return status as Brand.Carries<M> & Brand.Fault
}
