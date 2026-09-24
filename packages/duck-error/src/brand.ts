/** Branded status types: what a code's number also says it carries. */
export namespace Brand {
  /**
   * Required, not optional — optional is satisfied by any plain number; plain key, not unique symbol, to avoid TS4023 in a consumer's own build.
   * @template M - The meta shape the code carries.
   */
  export type Carries<M extends object> = number & { readonly __carries: M }

  /** A status whose code a store/adapter can answer with, rather than one only flow or validation logic raises. */
  export type Fault = number & { readonly __fault: true }

  /**
   * What a status says its code hands back. A plain status says nothing, which is a meta with no keys.
   * @template S - The status to read the meta from.
   */
  export type MetaOf<S> = S extends Carries<infer M> ? M : Record<never, never>
}

/**
 * M can't be inferred (no parameter uses it), so it defaults to never, not object — object would silently accept any meta shape.
 * @template M - The meta shape the code carries.
 */
export function detail<M extends object = never>(status: number): Brand.Carries<M> {
  return status as Brand.Carries<M>
}

/**
 * The same declaration as {@link detail}, for a code an adapter can answer with itself.
 * @template M - The meta shape the code carries, when given.
 */
export function fault(status: number): Brand.Fault
export function fault<M extends object>(status: number): Brand.Carries<M> & Brand.Fault
export function fault<M extends object>(status: number): Brand.Carries<M> & Brand.Fault {
  return status as Brand.Carries<M> & Brand.Fault
}
