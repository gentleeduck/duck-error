/** What may not reach the wire, by key name. */
const SECRET_KEY =
  /secret|password|passphrase|plaintext|token|hash|salt|signature|credential|private|otp|recovery|apikey|api_key/i

const DEPTH_CAP = 8

/**
 * True when a key name looks like it might hold a secret. Checked against a fixed pattern, not a per-registry allowlist.
 * @example
 * ```ts
 * isSecretKey('apiToken') // true: substring match, so it over-redacts rather than under-redacts
 * isSecretKey('widgetId') // false
 * ```
 */
export function isSecretKey(key: string): boolean {
  return SECRET_KEY.test(key)
}

/**
 * Every secret-bearing key dropped, at any depth. Past the cap the subtree is truncated, not walked.
 * @example
 * ```ts
 * scrubMeta({ widgetId: 'w1', detail: { password: 'leak-me' } })
 * // -> { widgetId: 'w1', detail: {} }: 'password' matches the secret pattern, 'detail' and 'widgetId' don't
 * ```
 */
export function scrubMeta(meta: object, depth = 0): Record<string, unknown> {
  const safe: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(meta)) {
    if (!isSecretKey(key)) safe[key] = scrubValue(value, depth + 1)
  }
  return safe
}

function scrubValue(value: unknown, depth: number): unknown {
  if (depth > DEPTH_CAP) return '[depth-cap]'
  if (Array.isArray(value)) return value.map((item) => scrubValue(item, depth + 1))
  if (value instanceof Date) return value
  if (typeof value === 'object' && value !== null) return scrubMeta(value, depth)
  return value
}
