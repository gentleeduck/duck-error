# duck-error NestJS example

Minimal NestJS app showing `@gentleduck/duck-error` wired through an `ExceptionFilter`. Full
write-up: [gentleduck.org/duck-error/integrations/nestjs](https://gentleduck.org/duck-error/integrations/nestjs).

## Run

```sh
bun install
bun run dev
```

## Try it

```sh
curl http://localhost:3000/widgets/1        # 200
curl http://localhost:3000/widgets/missing  # 404 NOT_FOUND
curl http://localhost:3000/rate-limited     # 429 RATE_LIMITED
curl http://localhost:3000/boom             # 500 STORAGE_FAILED — wraps a plain Error via asError
```

## What to look at

- `src/errors.ts` — the registry and kit
- `src/app-error.filter.ts` — `@Catch(AppError)`, reads `err.statusCode`
- `src/widgets.controller.ts` — `throwAppError` and `asAppError` in use
- `src/main.ts` — `app.useGlobalFilters(new AppErrorFilter())`

This package pins its own `typescript@^5.9.3` instead of following the workspace's TS 7.
`@nestjs/cli`'s `nest build` calls the compiler's programmatic API, which TypeScript 7.0
doesn't expose yet (it ships the `tsc` binary only; the API is slated to return in 7.1).
