"use client";

import { use, useMemo, useState, useEffect } from "react";
import Markdown from "@/components/Markdown";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config.mjs";
import Infobox from "@/components/Infobox";
import Navbar from "@/components/Navbar";
import Titlebar from "@/components/Titlebar";
import type { Beacon } from "@/types/Beacon";
import { seedBeacon } from "@/scripts/localStorageUpload";

export default function BeaconPage({
	params,
}: {
	params: Promise<{ beacon: string; location: string }>;
}) {
	const { beacon, location } = use(params);

	useEffect(() => {
		// TEST: upload beaconTest file to 
		seedBeacon(); 

		const load = async () => {
			// Ensure entry and variant are available:;
			if (location !== "local") {
				// remotely,
				const docSnap = await getDoc(doc(db, "beacons", beacon));

				if (docSnap.exists()) {
					setContent(docSnap.data() as Beacon);
					console.log("Document data (remote):", docSnap.data());
				} else {
					console.log("No such document! (remote)");
				}
			} else {
				// or from localStorage.
				const localData = localStorage.getItem(`beacon_${beacon}`);

				if (localData) {
					const parsedData = JSON.parse(localData);
					setContent(parsedData);
					console.log("Document data (localStorage):", parsedData);
				} else {
					console.log("No such document! (localStorage)");
				}
			}
		};

		if (beacon) load();
	}, [beacon, location]);

	const [content, setContent] = useState<Beacon | null>(null);

	return (
		<main className="min-h-screen bg-white text-[#0f1020]">
      {/* ===== Top Navigation Bar ===== */}
      <Navbar></Navbar>

      {/* ===== Title Bar ===== */}
      {/* (not included) */}

      {/* ===== Main Layout ===== */}
      <section className="max-w-[1400px] mx-auto px-10 pt-8 pb-16 md:grbeacon md:grbeacon-cols-[320px_1fr] md:gap-10 items-start">
        {/* ===== Right Content ===== */}
        <div className="flex flex-col gap-8">
          {/* Main content card */}
          <div className="bg-[#f3f3f5] shadow-xl border border-[#d7d7dd] p-8">
						<div className="mdstyle font-serif leading-relaxed max-w-none">
							<Markdown content={"# " + content?.name || ""} />
							<Markdown content={content?.title || ""} />
							<Markdown content={"Reflection: " + content?.reflection || ""} />
							<Markdown content={"Level " + content?.level + " " + content?.ancestry + " " + content?.equippedJob || ""} />
							<Markdown content={"Job Rank " + (content?.jobs?.[content?.equippedJob || ""] || "")} />
							<Markdown content={content?.description || ""} />
						</div>
          </div>
        </div>
      </section>
		</main>
	);
}
