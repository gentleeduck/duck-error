import type { ErrorKit, KitError } from '@gentleduck/error'

/** What a caller can make the database refuse, named for what it means rather than by its driver code. */
export const REFUSAL_KINDS = ['conflict', 'duplicate', 'invalid', 'missing', 'timeout'] as const
export type Refusal = (typeof REFUSAL_KINDS)[number]

/** Postgres SQLSTATE -> refusal kind. Pass a different table to classify another driver's codes. */
export const POSTGRES_REFUSALS: Readonly<Record<string, Refusal>> = {
  '22001': 'invalid',
  '22P02': 'invalid',
  '23502': 'invalid',
  '23503': 'missing',
  '23505': 'duplicate',
  '23514': 'invalid',
  '40001': 'conflict',
  '40P01': 'conflict',
  '55P03': 'conflict',
  '57014': 'timeout',
}

/** One code for the whole refusal, or a code per constraint name where `'*'` answers the rest. */
export type Answer<C extends string> = C | Readonly<Record<string, C>>

/** How a thrown error becomes one of the kit's codes. */
export type Rules<C extends string> = { readonly [K in Refusal]?: Answer<C> } & {
  /** An error whose message is a key answers as its value: one of the kit's codes, or a shared helper's bare message. */
  readonly rename?: Readonly<Record<string, C>>
}

/** What `Throws` wraps. Async only: the wrapper awaits, so a sync method would start returning a promise. */
export type AsyncMethod = (...args: never[]) => Promise<unknown>

export type MethodDecorator = <M extends AsyncMethod>(
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<M>,
) => void

function own<V>(table: Readonly<Record<string, V>>, key: string): V | undefined {
  return Object.hasOwn(table, key) ? table[key] : undefined
}

/** Duck-typed like `hasErrorCode`, so it matches an already-typed error from any kit, not only this one. */
function isKitError(
  value: unknown,
): value is Error & { readonly code: string; readonly meta: Record<string, unknown> } {
  return (
    value instanceof Error &&
    'code' in value &&
    typeof (value as { code: unknown }).code === 'string' &&
    'meta' in value
  )
}

/** Walks `cause`: an ORM commonly wraps the driver error in one carrying only the query, its params and the cause. */
function refusalOf(
  error: unknown,
  refusals: Readonly<Record<string, Refusal>>,
): { kind: Refusal; constraint: string } | undefined {
  for (let node = error; typeof node === 'object' && node !== null; node = 'cause' in node ? node.cause : undefined) {
    const kind = 'code' in node && typeof node.code === 'string' ? own(refusals, node.code) : undefined
    if (kind)
      return { constraint: 'constraint' in node && typeof node.constraint === 'string' ? node.constraint : '*', kind }
  }
  return undefined
}

function codeFor<C extends string>(
  error: unknown,
  rules: Rules<C>,
  refusals: Readonly<Record<string, Refusal>>,
): C | undefined {
  const refusal = refusalOf(error, refusals)
  if (!refusal) return undefined
  const answer = rules[refusal.kind]
  return typeof answer === 'object' ? (own(answer, refusal.constraint) ?? own(answer, '*')) : answer
}

function over<C extends string>(module: Answer<C> | undefined, method: Answer<C> | undefined) {
  return typeof module === 'object' && typeof method === 'object' ? { ...module, ...method } : (method ?? module)
}

function merge<C extends string>(moduleRules: Rules<C>, methodRules: Rules<C>): Rules<C> {
  const refusals: { -readonly [K in Refusal]?: Answer<C> } = {}
  for (const kind of REFUSAL_KINDS) {
    const merged = over(moduleRules[kind], methodRules[kind])
    // exactOptionalPropertyTypes: an absent key and a key present with value undefined are distinct
    // types here, so a kind neither side declared must be left out, not set to undefined.
    if (merged !== undefined) refusals[kind] = merged
  }
  return { ...refusals, rename: { ...moduleRules.rename, ...methodRules.rename } }
}

/**
 * Builds a `Throws` method decorator bound to one kit and one driver's refusal table.
 *
 * A decorated method's rejection becomes one of the kit's own {@link ErrorKit.Bare} codes -
 * restricted to Bare because the classification only ever has a cause to offer, never caller
 * meta, so a code declared with required meta could never be constructed here.
 * @example
 * ```ts
 * const kit = createErrorKit('UsersError', USERS_CODES)
 * const { Throws } = createThrows(kit, POSTGRES_REFUSALS, { duplicate: 'USERS_EMAIL_TAKEN' })
 *
 * class Users {
 *   @Throws('USERS_QUERY_FAILED', { missing: 'USERS_ORG_NOT_FOUND' })
 *   async create(email: string) {
 *     // any rejection not already one of this kit's own errors is classified by refusalOf,
 *     // or falls back to USERS_QUERY_FAILED with the original error on `cause`
 *   }
 * }
 * ```
 */
export function createThrows<R extends ErrorKit.Registry>(
  kit: ErrorKit<R>,
  refusals: Readonly<Record<string, Refusal>>,
  moduleRules: Rules<ErrorKit.Bare<R>> = {},
): { Throws(code: ErrorKit.Bare<R>, methodRules?: Rules<ErrorKit.Bare<R>>): MethodDecorator } {
  type Code = ErrorKit.Bare<R>

  // Args<R, C> is exact per literal C; Code here is Bare<R>, a union, which kit.fail's own generic
  // signature doesn't distribute across the way a literal call site does. Every member of Bare<R>
  // accepts (undefined, cause) by construction - that's the definition of Bare - so this line is
  // narrowing a real mismatch between a per-literal API and a per-union caller, not papering over
  // an unsound one; see kit.ts's own `registry[code] as number` for the same class of gap.
  const failWithCause = kit.fail as unknown as (code: Code, meta: undefined, cause: unknown) => KitError<R>

  function raise(code: Code, cause: unknown): KitError<R> {
    return failWithCause(code, undefined, cause)
  }

  function answer(error: unknown, code: Code, merged: Rules<Code>): unknown {
    const renamed = error instanceof Error && merged.rename ? own(merged.rename, error.message) : undefined
    if (renamed) return raise(renamed, error)
    if (isKitError(error)) return error
    return raise(codeFor(error, merged, refusals) ?? code, error)
  }

  /** `function` and `Reflect.apply`, not an arrow: a decorated method is called on its instance and has to keep it. */
  function wrap(fn: AsyncMethod, code: Code, merged: Rules<Code>): AsyncMethod {
    return async function (this: unknown, ...args: never[]) {
      try {
        return await Reflect.apply(fn, this, args)
      } catch (error) {
        throw answer(error, code, merged)
      }
    }
  }

  function Throws(code: Code, methodRules: Rules<Code> = {}): MethodDecorator {
    const merged = merge(moduleRules, methodRules)
    return (_target: object, key: string | symbol, descriptor: { value?: AsyncMethod }) => {
      const method = descriptor.value
      if (!method) throw new TypeError(`@Throws decorates a method, and ${String(key)} is an accessor`)
      descriptor.value = wrap(method, code, merged)
    }
  }

  return { Throws }
}
