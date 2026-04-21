"use client"; // This component runs on the client side (Next.js App Router requirement for useState)

import { useState } from "react";

export default function HelpModal() {
  // State to control whether the modal is open or closed
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== HELP BUTTON (Floating) ===== */}
      {/* Positioned at top-right corner of the screen */}
      <div className="fixed top-4 right-6 z-50">
        <button
          onClick={() => setOpen(true)} // Open modal when clicked
          className="w-10 h-10 rounded-full bg-white text-[#23244a] font-bold shadow border border-[#d7d7dd] hover:bg-gray-100 transition"
        >
          ? {/* Simple help icon */}
        </button>
      </div>

      {/* ===== MODAL OVERLAY ===== */}
      {/* Only render modal when `open` is true */}
      {open && (
        // Full-screen dark overlay background
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          
          {/* ===== MODAL CONTENT BOX ===== */}
          <div className="bg-white w-[650px] max-h-[80vh] overflow-y-auto p-6 rounded-xl relative shadow-lg">
            
            {/* Close button (top-right inside modal) */}
            <button
              onClick={() => setOpen(false)} // Close modal when clicked
              className="absolute top-4 right-4 text-xl"
            >
              ×
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-bold mb-4 text-[#23244a]">
              Beacon Creation Requirements
            </h2>

            {/* Main content section */}
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">

              {/* Section 1: Profile */}
              <div>
                <b>1. Profile</b><br />
                - Name is required<br />
                - Title, pronouns, description optional<br />
                - Appearance
              </div>

              {/* Section 2: Ancestry */}
              <div>
                <b>2. Ancestry</b><br />
                - 1–2 ancestries allowed<br />
                - Must share the same Reflection<br />
                - Determines traits and size
              </div>

              {/* Section 3: Dual Ancestry */}
              <div>
                <b>3. Dual Ancestry</b><br />
                - Choose 2 traits from each ancestry<br />
                - Total pool of 4 traits
              </div>

              {/* Section 4: Class */}
              <div>
                <b>4. Class</b><br />
                - Choose exactly 1 job<br />
                - Defines playstyle
              </div>

              {/* Section 5: Talents */}
              <div>
                <b>5. Talents</b><br />
                - Exactly 3 talents required<br />
                - Start at Rank 1
              </div>

              {/* Section 6: Equipment */}
              <div>
                <b>6. Equipment</b><br />
                - Weapons/items use slots<br />
                - Skills/spells use memory
              </div>

              {/* Developer note / hint */}
              <div className="text-xs text-gray-500">
                Tip: change info at components/HelpButton
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}