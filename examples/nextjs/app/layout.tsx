import type { ReactNode } from 'react'

export const metadata = {
  title: 'duck-error Next.js example',
  description: 'Route Handlers and a Server Action wired to @gentleduck/duck-error.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '2rem auto', padding: '0 1rem' }}>
        {children}
      </body>
    </html>
  )
}
