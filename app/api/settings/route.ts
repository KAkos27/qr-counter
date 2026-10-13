import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const { redirectUrl } = await request.json()

  try {
    const url = new URL(redirectUrl)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return new Response('Csak HTTP vagy HTTPS URL adható meg.', { status: 400 })
    }

    await prisma.redirectSettings.upsert({
      where: { id: 1 },
      create: { id: 1, redirectUrl: url.toString() },
      update: { redirectUrl: url.toString() },
    })
  } catch {
    return new Response('Érvényes URL-t adj meg.', { status: 400 })
  }

  revalidatePath('/dashboard')
  return new Response(null, { status: 204 })
}
