"use client";

import { use, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Markdown from 'react-markdown';
import { doc, getDoc } from "firebase/firestore";
import {db} from '@/firebase-config.mjs';
import type { CompendiumEntry } from "@/types/compendium-entry";
import Infobox from "@/components/Infobox";

export default function CompendiumPage({ params }: { params: Promise<{ entry: string; variant: string }> }) {
  const { entry, variant } = use(params);

  useEffect(() => {
    const load = async () => {
      // Ensure entry and variant are available
      if (!entry || !variant) return;

      const docSnap = await getDoc(doc(db, "compendium_entries", entry, "variants", variant));

      if (docSnap.exists()) {
        setContent(docSnap.data());
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    load();
  }, [entry, variant]);

  // 默认选中 Job（跟你现在一样）
  // Translated: Job is current default (temporary)
  // I am working on slugs, however: it should be possible to grab any document. However, Job is
  // the only one that has content right now, so it is the default for testing purposes.
  const [activeLabel, setActiveLabel] = useState<string>("Job");
  const [content, setContent] = useState<CompendiumEntry | null>(null);

  const navItems = useMemo(
    () => [
      { label: "Beacon", icon: "▸" },
      { label: "Name", icon: "✎" },
      { label: "Title", icon: "♛" },
      { label: "Background Skills", icon: "🔗" },
      { label: "Ability Scores", icon: "✦" },
      { label: "Talents", icon: "♔" },
      { label: "Ancestry", icon: "🧬" },
      { label: "Class", icon: "⚔︎" },
      { label: "Job", icon: "☾" },
      { label: "Basic Equipment &…", icon: "🛠" },
      { label: "Appearance", icon: "☺︎" },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-white text-[#0f1020]">
      {/* ===== Top Nav (SOURCE + MENU) ===== */}
      <header className="h-16 bg-gradient-to-r from-[#3b3f7c] via-[#3a3f69] to-[#3a3a3a] flex items-center justify-between px-10 text-white shadow-[0_2px_0_rgba(255,255,255,0.35)]">
        <Link
          href="/"
          className="text-3xl font-heading tracking-wide hover:opacity-80 transition"
        >
          SOURCE
        </Link>

        <Link
          href="/"
          className="text-xl font-heading tracking-[0.35em] uppercase hover:opacity-80 transition"
        >
          MENU
        </Link>
      </header>

      {/* ===== Big Compendium Title Bar ===== */}
      <section className="px-10 pt-8">
        <div className="bg-gradient-to-r from-[#353a7a] via-[#3f4370] to-[#3b3b3b] h-14 rounded-sm shadow-lg border border-[#cfcfd6] flex items-center justify-center">
          <div className="text-white font-heading tracking-[0.45em] text-2xl uppercase">
            COMPENDIUM
          </div>
        </div>
      </section>

      {/* ===== Main Layout ===== */}
      <section className="max-w-[1400px] mx-auto px-10 pt-8 pb-16 grid grid-cols-[320px_1fr] gap-10 items-start">
        {/* ===== Left Sidebar ===== */}
        <aside className="bg-[#efeff2] rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.18)] border border-[#d7d7dd] overflow-hidden">
          <div className="py-6 px-6">
            <div className="text-3xl font-serif font-semibold text-[#2c2f5e] -mt-2">
              Navigation
            </div>

            <nav className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = item.label === activeLabel;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveLabel(item.label)}
                    className={[
                      "w-full text-left flex items-center gap-3 px-3 py-2",
                      "transition-colors duration-200",
                      // hover：保留你现在的颜色逻辑
                      !isActive && "hover:bg-[#B5E3FF] text-[#000000]",
                      // active：保留你现在的渐变
                      isActive &&
                        "bg-gradient-to-r from-[#7c83c7] via-[#c7cbe6] to-[#efeff2] text-[#23244a]",
                      isActive && "hover:ring-2 hover:ring-[#292F5E] hover:ring-inset",
                    ].join(" ")}
                  >
                    <span className="w-7 text-center">{item.icon}</span>

                    <span
                      className={[
                        "text-xl font-serif font-semibold",
                        isActive
                          ? "no-underline text-[#292F5E]"
                          : "underline underline-offset-4 text-[#41AFF3]",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ===== Right Content ===== */}
        <div className="flex flex-col gap-8">
          {/* Example callout card */}
          {(content?.infoboxes ?? [""]).map((text, index) => (
            <Infobox key={index} content={text} />
          ))}
          
          {/* Main content card */}
          <div className="bg-[#f3f3f5] rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.18)] border border-[#d7d7dd] p-8">
            <h1 className="text-5xl font-serif text-[#2c2f5e] mb-4 underline underline-offset-8">
              {content?.title || ""}
            </h1>

            <div className="font-serif text-xl text-[#2c2f5e] leading-relaxed">
              <Markdown>
                {content?.body || ""}
              </Markdown>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}