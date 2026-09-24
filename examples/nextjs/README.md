# duck-error Next.js example

Route Handlers and a Server Action showing `@gentleduck/errors`, since Next.js has no single
centralized error hook the way Express, Fastify, Hono, and NestJS do. Full write-up:
[gentleduck.org/duck-error/integrations/nextjs](https://gentleduck.org/duck-error/integrations/nextjs).

## Run

```sh
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) for a page linking to every route, plus a
form that calls the Server Action.

## Try it directly

```sh
curl http://localhost:3000/api/widgets/1        # 200
curl http://localhost:3000/api/widgets/missing  # 404 NOT_FOUND
curl http://localhost:3000/api/rate-limited      # 429 RATE_LIMITED
curl http://localhost:3000/api/boom              # 500 STORAGE_FAILED — wraps a plain Error via asError
```

## What to look at

- `lib/errors.ts` — the registry and kit
- `app/api/widgets/[id]/route.ts` — `try`/`catch` + `asAppError` in a Route Handler
- `app/actions/create-widget.ts` — a Server Action returning `{ ok, ... }` instead of throwing across the boundary
- `app/create-widget-form.tsx` — the client component calling that action
