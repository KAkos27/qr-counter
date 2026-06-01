import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const activeEvent = await prisma.event.findFirst({
    where: { isActive: true },
  });

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

  redirect(process.env.INSTAGRAM_URL!);
}
