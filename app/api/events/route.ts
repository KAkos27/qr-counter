import { type NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const { name } = await request.json()
  const trimmed = (name as string | undefined)?.trim()

  if (!trimmed) {
    return new Response('Event name is required', { status: 400 })
  }

  await prisma.event.create({ data: { name: trimmed } })

  revalidatePath('/dashboard')
  return new Response(null, { status: 204 })
}
