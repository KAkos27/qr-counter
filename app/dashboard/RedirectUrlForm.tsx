'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function RedirectUrlForm({ initialUrl }: { initialUrl: string }) {
  const router = useRouter()
  const [url, setUrl] = useState(initialUrl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ redirectUrl: url }),
    })

    if (!response.ok) {
      setError(await response.text())
      setLoading(false)
      return
    }

    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        placeholder="https://pelda.hu"
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer select-none bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 active:scale-95 active:bg-blue-800 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {loading ? 'Mentés...' : 'Mentés'}
      </button>
      {error && <p className="text-sm text-red-600 sm:self-center">{error}</p>}
    </form>
  )
}
