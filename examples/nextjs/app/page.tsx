import { CreateWidgetForm } from './create-widget-form'

export default function Home() {
  return (
    <main>
      <h1>duck-error Next.js example</h1>
      <p>
        Route Handlers, secret-safe JSON bodies, and a Server Action — all backed by one kit in{' '}
        <code>lib/errors.ts</code>.
      </p>

      <h2>Route Handlers</h2>
      <ul>
        <li>
          <a href="/api/widgets/1">/api/widgets/1</a> — 200
        </li>
        <li>
          <a href="/api/widgets/missing">/api/widgets/missing</a> — 404 <code>NOT_FOUND</code>
        </li>
        <li>
          <a href="/api/rate-limited">/api/rate-limited</a> — 429 <code>RATE_LIMITED</code>
        </li>
        <li>
          <a href="/api/boom">/api/boom</a> — 500 <code>STORAGE_FAILED</code>, wraps a plain <code>Error</code> via{' '}
          <code>asError</code>
        </li>
      </ul>

      <h2>Server Action</h2>
      <CreateWidgetForm />
    </main>
  )
}
