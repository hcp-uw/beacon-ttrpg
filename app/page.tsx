"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-white">
      
      {/* ===== Top Navigation Bar ===== */}
      <Navbar></Navbar>
      
      {/* ===== Welcome Banner ===== */}
      <section className="mx-8 mt-6">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#3b3f7c] via-[#3a3f69] to-[#3a3a3a] px-5 py-3 rounded shadow">
          <span className="text-lg">👤</span>
          <span className="text-sm">Welcome message?</span>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <section className="grid grid-cols-[560px_1fr] gap-16 mt-16 max-w-[1400px] mx-auto px-8 items-start">
        {/* Left: buttons */}
        <div className="flex flex-col gap-10 items-start mt-32 ml-28">
          <Link
            href="/beacons"
            className="
              w-[520px]
              flex items-center gap-5
              bg-gradient-to-r from-[#353a7a] via-[#3f4370] to-[#3b3b3b]
              px-14 py-8
              rounded-2xl
              shadow-lg
              text-4xl font-serif
              text-left
              hover:opacity-95 active:scale-[0.99]
              transition
            "
          >
            <span className="text-4xl">🗺</span>
            <span>Beacon Roster</span>
          </Link>

          <Link
            href="/compendium"
            className="
              w-[520px]
              flex items-center gap-5
              bg-gradient-to-r from-[#353a7a] via-[#3f4370] to-[#3b3b3b]
              px-14 py-8
              rounded-2xl
              shadow-lg
              text-4xl font-serif
              text-left
              hover:opacity-95 active:scale-[0.99]
              transition
            "
          >
            <span className="text-4xl">🧭</span>
            <span>Compendium</span>
          </Link>
        </div>

        {/* Right: image */}
        <div className="flex justify-end">
          <img
            src="/beacon-visual.png"
            alt="Beacon artwork"
            className="w-[480px] h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>
    </main>
  );
}