"use client";

import Link from "next/link";

export default function RosterPage() {
  // Mock data for roster cards (replace with real data later)
  const characters = [
    { name: "Mini's Mascot", img: "/beacon-visual.png", tag: "WA", level: 1 },
    { name: "S. Bellamy-Rao", img: "/beacon-visual.png", tag: "SK", level: 3 },
    { name: "Cressida", img: "/beacon-visual.png", tag: "CH", level: 2 },
    { name: "Esteri", img: "/beacon-visual.png", tag: "PA", level: 1 },
    { name: "Yellow Scarf", img: "/beacon-visual.png", tag: "GU", level: 1 },
  ];

  return (
    <main className="min-h-screen bg-[#f3f3f5]">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-gradient-to-r from-[#3b3f7c] via-[#3a3f69] to-[#3a3a3a] flex items-center justify-between px-8 text-white">
        <Link href="/" className="text-2xl tracking-wide font-heading">
          SOURCE
        </Link>

        <nav className="flex items-center gap-12 text-xl tracking-[0.4em] uppercase font-heading">
        <Link href="/beacons">Beacons</Link>
        <Link href="/compendium">Compendium</Link>
        <Link href="/beacons/builder">Builder</Link>
        <Link href="/">Menu</Link>
        </nav>
      </header>

      {/* Title Bar */}
      <section className="px-10 pt-6">
        <div className="bg-gradient-to-r from-[#353a7a] via-[#3f4370] to-[#3b3b3b] text-white px-6 py-3 shadow-lg flex justify-between items-center">
          <div className="tracking-[0.35em] uppercase font-heading text-xl">
            Beacon Roster
          </div>

          {/* Action icons placeholder */}
          <div className="flex gap-4 text-lg opacity-80">
            <span>🗑️</span>
            <span>🔖</span>
            <span>⬇️</span>
            <span>⚙️</span>
          </div>
        </div>
      </section>

      {/* Grid Container */}
      <section className="px-10 pt-4">
        <div className="bg-white rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.2)] p-6 max-h-[600px] overflow-y-auto">
          {/* Character Grid */}
          <div className="grid grid-cols-5 gap-6">
            {characters.map((c, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition"
              >
                {/* Character image */}
                <img
                  src={c.img}
                  className="w-full h-[180px] object-cover"
                />

                {/* Top-left tag badge */}
                <div className="absolute top-0 left-0 bg-[#3b3f7c] text-white px-2 py-1 text-xs">
                  {c.tag} {c.level}
                </div>

                {/* Name label */}
                <div className="bg-[#3b3f7c] text-white text-lg px-3 py-1 font-serif">
                  {c.name}
                </div>
              </div>
            ))}

            {/* Add New Card Placeholder */}
            <div className="flex items-center justify-center border-2 border-dashed rounded-xl h-[220px] text-4xl text-gray-400">
              +
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}