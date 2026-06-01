'use client'

import { useRouter } from 'next/navigation'

export function DeleteEventButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()

  async function handleClick() {
    if (!confirm(`Törlöd a(z) "${name}" eseményt és az összes szkennelését?`)) return
    await fetch(`/api/events/${id}/delete`, { method: 'POST' })
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded font-medium transition-colors"
    >
      Törlés
    </button>
  )
}
