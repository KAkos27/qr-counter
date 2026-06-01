'use client'

import { useRouter } from 'next/navigation'

export function ActivateEventButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleClick() {
    await fetch(`/api/events/${id}/activate`, { method: 'POST' })
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-medium transition-colors"
    >
      Aktiválás
    </button>
  )
}
