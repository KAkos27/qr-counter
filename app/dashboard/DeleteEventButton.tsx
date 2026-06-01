'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteEventButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!confirm(`Törlöd a(z) "${name}" eseményt és az összes szkennelését?`)) return
    setLoading(true)
    await fetch(`/api/events/${id}/delete`, { method: 'POST' })
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="cursor-pointer select-none text-xs bg-red-50 hover:bg-red-100 active:scale-95 active:bg-red-200 text-red-600 px-3 py-1.5 rounded font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Törlés...' : 'Törlés'}
    </button>
  )
}
