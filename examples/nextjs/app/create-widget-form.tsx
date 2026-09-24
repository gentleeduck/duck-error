'use client'

import { useState } from 'react'
import { createWidget } from './actions/create-widget'

export function CreateWidgetForm() {
  const [result, setResult] = useState<string | null>(null)

  async function onSubmit(formData: FormData) {
    const name = String(formData.get('name') ?? '')
    const res = await createWidget({ name })
    setResult(res.ok ? `created: ${res.widget.id}` : `error: ${res.error.code}`)
  }

  return (
    <form action={onSubmit}>
      <input name="name" placeholder="widget name (leave blank to trigger NOT_FOUND)" />
      <button type="submit">Create</button>
      {result && <p>{result}</p>}
    </form>
  )
}
