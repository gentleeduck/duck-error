# duck-error Hono example

Minimal Hono app (running on the Node adapter) showing `@gentleduck/error` wired through
`app.onError`. Full write-up:
[gentleduck.org/duck-error/integrations/hono](https://gentleduck.org/duck-error/integrations/hono).

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

`app.onError` is portable to any Hono runtime target (Bun, Deno, Cloudflare Workers, Vercel
Edge) — only the `serve(...)` call at the bottom of `src/index.ts` is Node-adapter-specific.
