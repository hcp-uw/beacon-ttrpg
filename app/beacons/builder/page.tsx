"use client"; 
// Required for Next.js App Router to enable client-side features like useState/useEffect

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HelpButton from "@/components/HelpButton";

/**
 * Character type definition
 * This defines the full structure of the builder data.
 * Keeping this strongly typed ensures consistency across UI, storage, and export.
 */
type Character = {
  profile: {
    name: string;
    title: string;
    pronouns: string;
    description: string;
    appearance: string;
    photo: string | null; // stored as object URL (not file)
  };
  ancestry: {
    primary: string;
    secondary: string;
    reflection: string;
    traits: string[];
  };
  class: {
    name: string;
    rank: number;
  };
  talents: string[];
  equipment: {
    weapons: string[];
    supportItems: string[];
    skills: string[];
    spells: string[];
  };
};

/**
 * Initial empty state for a new character
 * Used both for first render and resetting after export
 */
const emptyCharacter: Character = {
  profile: {
    name: "",
    title: "",
    pronouns: "",
    description: "",
    appearance: "",
    photo: null,
  },
  ancestry: {
    primary: "",
    secondary: "",
    reflection: "",
    traits: [],
  },
  class: { name: "", rank: 1 },
  talents: [],
  equipment: {
    weapons: [],
    supportItems: [],
    skills: [],
    spells: [],
  },
};

export default function BuilderPage() {
  /**
   * Main state for the entire character
   * Single source of truth for all builder inputs
   */
  const [character, setCharacter] = useState<Character>(emptyCharacter);

  /**
   * Load saved data from localStorage on first mount
   * This enables persistence across page refresh
   */
  useEffect(() => {
    const saved = localStorage.getItem("beaconCharacter");
    if (saved) setCharacter(JSON.parse(saved));
  }, []);

  /**
   * Auto-save whenever character state changes
   * This ensures user progress is never lost
   */
  useEffect(() => {
    localStorage.setItem("beaconCharacter", JSON.stringify(character));
  }, [character]);

  /**
   * Update profile fields dynamically
   * Uses computed property name to update only one field
   */
  const updateProfile = (field: keyof Character["profile"], value: any) => {
    setCharacter((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  /**
   * Update ancestry fields dynamically
   */
  const updateAncestry = (field: keyof Character["ancestry"], value: any) => {
    setCharacter((prev) => ({
      ...prev,
      ancestry: { ...prev.ancestry, [field]: value },
    }));
  };

  /**
   * Export character as downloadable JSON file
   * - Wraps data with version for future compatibility
   * - Uses Blob + object URL to trigger download
   * - Clears localStorage after export (fresh start UX)
   */
  const exportCharacter = () => {
    const blob = new Blob(
      [JSON.stringify({ version: 1, character }, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${character.profile.name || "character"}.json`;
    a.click();

    // Clean up memory
    URL.revokeObjectURL(url);

    // Reset builder
    localStorage.removeItem("beaconCharacter");
    setCharacter(emptyCharacter);
  };

  /**
   * Import JSON file and load into state
   * Includes basic validation + error handling
   */
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);

        // Basic structure check
        if (data.character) setCharacter(data.character);
      } catch {
        alert("Invalid file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-[#f3f3f5] text-[#2c2f5e]">
      {/* Global navigation */}
      <Navbar />

      {/* Floating help modal trigger */}
      <HelpButton />

      <section className="px-10 pt-10 space-y-6">

        {/* ================= PROFILE ================= */}
        <div className="card grid grid-cols-[220px_1fr_200px] gap-6">

          {/* Photo upload */}
          <div>
            <label className="label">Photo</label>

            {/* Custom styled file input */}
            <label className="photo">
              +
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  // Store as object URL for preview (not persistent across reloads)
                  if (file) updateProfile("photo", URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          {/* Text inputs */}
          <div className="flex flex-col gap-4">
            <input
              className="input"
              placeholder="Full Name"
              value={character.profile.name}
              onChange={(e) => updateProfile("name", e.target.value)}
            />

            <input
              className="input"
              placeholder="Title"
              value={character.profile.title}
              onChange={(e) => updateProfile("title", e.target.value)}
            />

            {/* Two-column layout for compact fields */}
            <div className="grid grid-cols-2 gap-4">
              <input
                className="input"
                placeholder="Description"
                value={character.profile.description}
                onChange={(e) =>
                  updateProfile("description", e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Appearance"
                value={character.profile.appearance}
                onChange={(e) =>
                  updateProfile("appearance", e.target.value)
                }
              />
            </div>
          </div>

          {/* Pronouns (separate column for layout balance) */}
          <input
            className="input"
            placeholder="Pronouns"
            value={character.profile.pronouns}
            onChange={(e) => updateProfile("pronouns", e.target.value)}
          />
        </div>

        {/* ================= ANCESTRY ================= */}
        <div className="card">
          <h2 className="section">Ancestry</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Primary Ancestry"
              value={character.ancestry.primary}
              onChange={(e) => updateAncestry("primary", e.target.value)}
            />

            <input
              className="input"
              placeholder="Secondary Ancestry"
              value={character.ancestry.secondary}
              onChange={(e) => updateAncestry("secondary", e.target.value)}
            />

            {/* Full-width field */}
            <input
              className="input col-span-2"
              placeholder="Reflection"
              value={character.ancestry.reflection}
              onChange={(e) => updateAncestry("reflection", e.target.value)}
            />
          </div>
        </div>

        {/* ================= CLASS ================= */}
        <div className="card">
          <h2 className="section">Class</h2>

          {/* Inline update since structure is shallow */}
          <input
            className="input"
            placeholder="Class (e.g. Aegis)"
            value={character.class.name}
            onChange={(e) =>
              setCharacter((prev) => ({
                ...prev,
                class: { ...prev.class, name: e.target.value },
              }))
            }
          />
        </div>

        {/* ================= TALENTS ================= */}
        <div className="card">
          <h2 className="section">Talents</h2>

          {/* Fixed 3-slot design (game rule constraint) */}
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                className="input"
                placeholder={`Talent ${i + 1}`}
                value={character.talents[i] || ""}
                onChange={(e) => {
                  const arr = [...character.talents];
                  arr[i] = e.target.value;

                  setCharacter((prev) => ({
                    ...prev,
                    talents: arr,
                  }));
                }}
              />
            ))}
          </div>
        </div>

        {/* ================= EQUIPMENT ================= */}
        <div className="card">
          <h2 className="section">Equipment</h2>

          {/* Pattern: copy array → update index → replace */}
          {/* Ensures immutability for React state */}

          {/* Weapons */}
          <div className="mb-4">
            <label className="label">Weapons</label>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1].map((i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Weapon ${i + 1}`}
                  value={character.equipment.weapons[i] || ""}
                  onChange={(e) => {
                    const arr = [...character.equipment.weapons];
                    arr[i] = e.target.value;

                    setCharacter((prev) => ({
                      ...prev,
                      equipment: { ...prev.equipment, weapons: arr },
                    }));
                  }}
                />
              ))}
            </div>
          </div>

          {/* Support Items */}
          <div className="mb-4">
            <label className="label">Support Items</label>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1].map((i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Item ${i + 1}`}
                  value={character.equipment.supportItems[i] || ""}
                  onChange={(e) => {
                    const arr = [...character.equipment.supportItems];
                    arr[i] = e.target.value;

                    setCharacter((prev) => ({
                      ...prev,
                      equipment: {
                        ...prev.equipment,
                        supportItems: arr,
                      },
                    }));
                  }}
                />
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="label">Skills</label>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Skill ${i + 1}`}
                  value={character.equipment.skills[i] || ""}
                  onChange={(e) => {
                    const arr = [...character.equipment.skills];
                    arr[i] = e.target.value;

                    setCharacter((prev) => ({
                      ...prev,
                      equipment: { ...prev.equipment, skills: arr },
                    }));
                  }}
                />
              ))}
            </div>
          </div>

          {/* Spells */}
          <div>
            <label className="label">Spells</label>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Spell ${i + 1}`}
                  value={character.equipment.spells[i] || ""}
                  onChange={(e) => {
                    const arr = [...character.equipment.spells];
                    arr[i] = e.target.value;

                    setCharacter((prev) => ({
                      ...prev,
                      equipment: { ...prev.equipment, spells: arr },
                    }));
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex gap-4 justify-end">
          {/* Export button */}
          <button onClick={exportCharacter} className="btn">
            Export JSON
          </button>

          {/* Import file input */}
          <input type="file" accept=".json" onChange={handleImport} />
        </div>
      </section>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .card {
          background: #efeff2;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #d7d7dd;
        }
        .input {
          height: 40px;
          padding: 0 10px;
          border: 1px solid #cfcfd6;
          background: white;
        }
        .btn {
          padding: 8px 16px;
          background: #23244a;
          color: white;
        }
        .section {
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .label {
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .photo {
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          background: white;
          font-size: 40px;
        }
      `}</style>
    </main>
  );
}