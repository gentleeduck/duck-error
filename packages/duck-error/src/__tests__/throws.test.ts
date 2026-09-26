import { describe, expect, it } from 'vitest'
import { detail } from '../brand'
import { createErrorKit } from '../kit'
import { createThrows, POSTGRES_REFUSALS } from '../throws/throws'

const USERS_ERRORS = {
  USERS_QUERY_FAILED: 500,
  USERS_EMAIL_TAKEN: 409,
  USERS_NOT_FOUND: 404,
  USERS_ORG_NOT_FOUND: detail<{ orgId: string }>(404),
} as const satisfies Record<string, number>

const kit = createErrorKit('UsersError', USERS_ERRORS)

function pgError(code: string, constraint?: string): Error & { code: string; constraint?: string } {
  const err = new Error('driver refusal') as Error & { code: string; constraint?: string }
  err.code = code
  if (constraint) err.constraint = constraint
  return err
}

// @ts-expect-error a code that requires meta can never be constructed by an auto-translation path, which only ever has a cause
createThrows(kit, POSTGRES_REFUSALS, { missing: 'USERS_ORG_NOT_FOUND' })

describe('createThrows', () => {
  it('translates a matched refusal to the module rule’s code', async () => {
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS, { duplicate: 'USERS_EMAIL_TAKEN' })
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw pgError('23505')
      }
    }
    await expect(new Service().create()).rejects.toMatchObject({ code: 'USERS_EMAIL_TAKEN' })
  })

  it('falls back to the decorator code when no rule covers the refusal kind', async () => {
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS)
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw pgError('55P03') // classifies as 'conflict', no rule declared for it
      }
    }
    await expect(new Service().create()).rejects.toMatchObject({ code: 'USERS_QUERY_FAILED' })
  })

  it('falls back to the decorator code for an error with no recognizable refusal', async () => {
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS)
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw new TypeError('boom')
      }
    }
    await expect(new Service().create()).rejects.toMatchObject({ code: 'USERS_QUERY_FAILED' })
  })

  it('keeps the original error reachable on cause', async () => {
    const original = pgError('23505')
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS, { duplicate: 'USERS_EMAIL_TAKEN' })
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw original
      }
    }
    try {
      await new Service().create()
      expect.unreachable()
    } catch (err) {
      expect((err as Error).cause).toBe(original)
    }
  })

  it('walks a wrapped cause chain to find the refusal', async () => {
    const wrapper = new Error('query failed', { cause: pgError('23503') })
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS, { missing: 'USERS_NOT_FOUND' })
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw wrapper
      }
    }
    await expect(new Service().create()).rejects.toMatchObject({ code: 'USERS_NOT_FOUND' })
  })

  it('picks a constraint-named sub-rule over the catchall', async () => {
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS, {
      duplicate: { users_email_key: 'USERS_EMAIL_TAKEN', '*': 'USERS_QUERY_FAILED' },
    })
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw pgError('23505', 'users_email_key')
      }
    }
    await expect(new Service().create()).rejects.toMatchObject({ code: 'USERS_EMAIL_TAKEN' })
  })

  it('renames a bare thrown message to one of the kit’s codes', async () => {
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS, { rename: { 'not found': 'USERS_NOT_FOUND' } })
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw new Error('not found')
      }
    }
    await expect(new Service().create()).rejects.toMatchObject({ code: 'USERS_NOT_FOUND' })
  })

  it('passes an already-typed error from this kit through unchanged', async () => {
    const original = kit.fail('USERS_EMAIL_TAKEN')
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS)
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw original
      }
    }
    await expect(new Service().create()).rejects.toBe(original)
  })

  it('passes an already-typed error from an unrelated kit through unchanged', async () => {
    const otherKit = createErrorKit('OtherError', { OTHER_BAD: 400 } as const)
    const original = otherKit.fail('OTHER_BAD')
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS)
    class Service {
      @Throws('USERS_QUERY_FAILED')
      async create(): Promise<void> {
        throw original
      }
    }
    await expect(new Service().create()).rejects.toBe(original)
  })

  it('method rules override module rules for the same refusal kind', async () => {
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS, { duplicate: 'USERS_QUERY_FAILED' })
    class Service {
      @Throws('USERS_QUERY_FAILED', { duplicate: 'USERS_EMAIL_TAKEN' })
      async create(): Promise<void> {
        throw pgError('23505')
      }
    }
    await expect(new Service().create()).rejects.toMatchObject({ code: 'USERS_EMAIL_TAKEN' })
  })

  it('rejects decorating a non-method at decoration time', () => {
    const { Throws } = createThrows(kit, POSTGRES_REFUSALS)
    expect(() => {
      class Service {
        // @ts-expect-error deliberately decorating an accessor to exercise the guard
        @Throws('USERS_QUERY_FAILED')
        get broken() {
          return 1
        }
      }
      void Service
    }).toThrow(/accessor/)
  })
})
