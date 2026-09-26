# duck-error docs

Content-only docs app: `content/docs/**` is consumed by the docs site build, not built here.
This package's own job is generating the API reference.

## Regenerating the API reference

```sh
bun run docs:api          # from this directory
bun run --cwd apps/duck-error-docs docs:api   # from the repo root
```

Runs [TypeDoc](https://typedoc.org) + `typedoc-plugin-markdown` against `packages/duck-error/src`
and writes plain `.md` files into `content/docs/api/`. Those files are generated output, not
hand-edited — a wrong description means the JSDoc comment in `packages/duck-error/src` is wrong,
not the generated file.

### Why `docs:api` sets `NODE_OPTIONS`

This workspace pins TypeScript 7, which doesn't expose the programmatic compiler API yet (ships
the `tsc` binary only — see `examples/nestjs/README.md` for the same constraint hitting Nest's
CLI). TypeDoc needs that API, so this package pins its own `typescript@^5.9.3`. Bun hoists
`typedoc` itself to the workspace root `node_modules`, though, so a plain run resolves the
workspace's TS 7 instead of the local 5.9.3 anyway — `scripts/ts5-hook.mjs` is a Node module
resolution hook (registered via `scripts/register-ts5-hook.mjs`) that redirects just `typedoc`'s
`import 'typescript'` to this package's own nested copy, without touching resolution anywhere
else in the workspace.
