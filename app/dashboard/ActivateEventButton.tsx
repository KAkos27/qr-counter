'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ActivateEventButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    await fetch(`/api/events/${id}/activate`, { method: 'POST' })
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="cursor-pointer select-none text-xs bg-gray-100 hover:bg-gray-200 active:scale-95 active:bg-gray-300 text-gray-700 px-3 py-1.5 rounded font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Aktiválás...' : 'Aktiválás'}
    </button>
  )
}
