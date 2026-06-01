import { prisma } from "@/lib/prisma";
import { DeleteEventButton } from "./DeleteEventButton";
import { CreateEventForm } from "./CreateEventForm";
import { ActivateEventButton } from "./ActivateEventButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { scans: true } },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
          QR Szkennelés Irányítópult
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          QR kód URL:{" "}
          <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-800">
            /scan
          </code>
        </p>

        {/* Esemény létrehozása */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Új esemény létrehozása
          </h2>
          <CreateEventForm />
        </div>

        {/* Események — kártya mobilon, tábla desktopon */}
        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-12 text-center text-gray-400 text-sm">
            Még nincs esemény. Hozz létre egyet fent.
          </div>
        ) : (
          <>
            {/* Mobil: kártyák */}
            <div className="flex flex-col gap-3 md:hidden">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-medium text-gray-900">{event.name}</span>
                    {event.isActive && (
                      <span className="shrink-0 inline-flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        Aktív
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mb-3 flex gap-4">
                    <span>
                      {event.createdAt.toLocaleDateString("hu-HU", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="font-mono">{event._count.scans} szkennelés</span>
                  </div>
                  <div className="flex gap-2">
                    {!event.isActive && <ActivateEventButton id={event.id} />}
                    <DeleteEventButton id={event.id} name={event.name} />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: tábla */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Esemény neve</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Létrehozva</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Szkennelések</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Állapot</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-4 font-medium text-gray-900">{event.name}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {event.createdAt.toLocaleDateString("hu-HU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-mono">{event._count.scans}</td>
                      <td className="px-6 py-4">
                        {event.isActive && (
                          <span className="inline-flex items-center bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            Aktív
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {!event.isActive && <ActivateEventButton id={event.id} />}
                          <DeleteEventButton id={event.id} name={event.name} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
