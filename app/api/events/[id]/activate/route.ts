import { type NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  await prisma.$transaction([
    prisma.event.updateMany({ data: { isActive: false } }),
    prisma.event.update({ where: { id }, data: { isActive: true } }),
  ])

  revalidatePath('/dashboard')
  return new Response(null, { status: 204 })
}
