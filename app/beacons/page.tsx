"use client";

import Navbar from "@/components/Navbar";
import Titlebar from "@/components/Titlebar";

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
      {/* ===== Top Navigation Bar ===== */}
      <Navbar></Navbar>

      {/* ===== Title Bar ===== */}
      <Titlebar>
        <div className="tracking-[0.35em] uppercase font-heading text-xl">
          Beacon Roster
        </div>

        {/* Action icons placeholder */}
        <div className="flex gap-4 text-lg opacity-80 justify-end">
          <span>🗑️</span>
          <span>🔖</span>
          <span>⬇️</span>
          <span>⚙️</span>
        </div>
      </Titlebar>

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