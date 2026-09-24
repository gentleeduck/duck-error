# duck-error Express example

Minimal Express 5 app showing `@gentleduck/errors` wired through a terminal 4-arg error
middleware. Full write-up:
[gentleduck.org/duck-error/integrations/express](https://gentleduck.org/duck-error/integrations/express).

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

Express 5 forwards a rejected/thrown handler to the error middleware automatically. On Express
4, wrap each handler in a `try`/`catch` that calls `next(err)` — see the integration guide.
