# duck-error Fastify example

Minimal Fastify app showing `@gentleduck/duck-error` wired through `setErrorHandler`. Full write-up:
[gentleduck.org/duck-error/integrations/fastify](https://gentleduck.org/duck-error/integrations/fastify).

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
