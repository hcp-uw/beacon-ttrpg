"use client";

import { use, useMemo, useState, useEffect } from "react";
import Markdown from "@/components/Markdown";
import { doc, getDoc } from "firebase/firestore";
import {db} from '@/firebase-config.mjs';
import type { CompendiumEntry } from "@/types/CompendiumEntry";
import Infobox from "@/components/Infobox";
import Navbar from "@/components/Navbar";
import Titlebar from "@/components/Titlebar";
import CompendiumNavMenu from "@/components/CompendiumNavMenu";

export default function CompendiumPage({ params }: { params: Promise<{ entry: string }> }) {
  const { entry } = use(params);

  useEffect(() => {
    const load = async () => {
      // Ensure entry and is available
      if (!entry) return;

      const docSnap = await getDoc(doc(db, "compendium_entries", entry));

      if (docSnap.exists()) {
        setContent(docSnap.data());
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    load();
  }, [entry]);

  const [content, setContent] = useState<CompendiumEntry | null>(null);

  return (
    <main className="min-h-screen bg-white text-[#0f1020]">
      {/* ===== Top Navigation Bar ===== */}
      <Navbar></Navbar>

      {/* ===== Title Bar ===== */}
      <Titlebar>
        <div className="text-white font-heading tracking-[0.45em] text-2xl uppercase">
          COMPENDIUM
        </div>
        {/* TODO: Need to replace with modules system: we aren't using a versions system anymore. */}
        <select name="version" className="absolute right-12 bg-transparent text-white text-center font-heading tracking-[0.2em] uppercase hover:opacity-80 transition">
          <option value="newest" className="font-serif text-[#2c2f5e]">newest</option>
          <option value="0" className="font-serif text-[#2c2f5e]">prior</option>
          <option value="1" className="font-serif text-[#2c2f5e]">next-prior</option>
        </select>
      </Titlebar>

      {/* ===== Main Layout ===== */}
      <section className="max-w-[1400px] mx-auto px-10 pt-8 pb-16 md:grid md:grid-cols-[320px_1fr] md:gap-10 items-start">
        {/* ===== Left Sidebar ===== */}
        <aside className="bg-[#efeff2] rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.18)] border border-[#d7d7dd] overflow-hidden hidden md:block">
          <div className="py-6 px-6">
            <div className="text-3xl font-serif font-semibold text-[#2c2f5e] -mt-2">
              Navigation
            </div>
              <CompendiumNavMenu></CompendiumNavMenu>            
          </div>
        </aside>

        {/* ===== Right Content ===== */}
        <div className="flex flex-col gap-8">       
          {/* Main content card */}
          <div className="bg-[#f3f3f5] shadow-xl border border-[#d7d7dd] p-8">
            <div className="mdstyle font-serif leading-relaxed max-w-none">
              {/* Formatting proof of concept stuff, ignore at your leisure. */}
              {/* <Markdown content={"[[actions/channel: 3 Channel]]"} />
              <Markdown content={"[[items/object: Object]]"} />
              <Markdown content={"[[conditions/hidden: Hidden]]"} />
              <Markdown content={"[[spells/improvised_spell_attack: Improvised Spell Attack]]"} />
              <Markdown content={"[[article: Article]]"} /> */}
              {/* The actual content below. Note how the entire content is wrapped in Markdown */}
              {/* as I implement a lot of logic in the Markdown component */}
              <Markdown content={content?.body || ""}/>
            </div>
          </div>

          {/* Infoboxes */}
          {(content?.infoboxes ?? [""]).map((text, index) => (
            <Infobox key={index} content={text} />
          ))}
        </div>
      </section>
    </main>
  );
}