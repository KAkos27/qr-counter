import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  const [activeEvent, settings] = await Promise.all([
    prisma.event.findFirst({ where: { isActive: true } }),
    prisma.redirectSettings.findUnique({ where: { id: 1 } }),
  ]);

  if (!settings) {
    return new Response("A QR átirányítási URL még nincs beállítva.", {
      status: 503,
    });
  }

  if (activeEvent) {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") ?? null;
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
      headersList.get("x-real-ip") ??
      null;

    await prisma.scan.create({
      data: {
        eventId: activeEvent.id,
        userAgent,
        ip,
      },
    });
  }

  redirect(settings.redirectUrl);
}
