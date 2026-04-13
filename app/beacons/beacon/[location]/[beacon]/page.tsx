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
import { EngineProvider } from "@/lib/context/EngineContext";
import { ModularWrapper } from "@/components/ModularWrapper";
import EntityBox from "@/components/EntityBox";

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
					setBeaconData(docSnap.data() as Beacon);
					console.log("Document data (remote):", docSnap.data());
				} else {
					console.log("No such document! (remote)");
				}
			} else {
				// or from localStorage.
				const localData = localStorage.getItem(`beacon_${beacon}`);

				if (localData) {
					const parsedData = JSON.parse(localData);
					setBeaconData(parsedData);
					console.log("Document data (localStorage):", parsedData);
				} else {
					console.log("No such document! (localStorage)");
				}
			}
		};

		if (beacon) load();
	}, [beacon, location]);
	const [beaconData, setBeaconData] = useState<Beacon | null>(null);
	// beaconData includes things like the name of their ancestry or job, but NOT the actual data
	// associated with those names.
	// Consequently we need the EngineProvider to actually load the correct data, as the actual data
	// will vary due to each Beacon existing in a different environment- a different environment,
	// conceptualized as a stack of Modules with content.
	// For the test the reflection is Koronil 1.4, a stack of the Koronil 1.4 and Core 1.0 modules.
	// The reflection Koronil 1.4 is distinct from the module Koronil 1.4: see registry.ts for the
	// definition of the former, and kornil-1-4.ts for the definition of the latter.

	return (
		<EngineProvider reflection={beaconData?.reflection || ""}>
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
								<Markdown
									content={"# " + beaconData?.name || ""}
								/>
								<Markdown content={beaconData?.title || ""} />
								<Markdown
									content={
										"Reflection: " + beaconData?.reflection ||
										""
									}
								/>
								<Markdown
									content={
										"Level " +
											beaconData?.level +
											" " +
											beaconData?.ancestry +
											" " +
											beaconData?.equippedJob || ""
									}
								/>
								<Markdown
									content={
										"Job Rank " +
										(beaconData?.jobs?.[
											beaconData?.equippedJob || ""
										] || "")
									}
								/>
								<Markdown
									content={beaconData?.description || ""}
								/>
								<h1>
									You should see two EntityBoxes under this.
								</h1>
								<p>
									The first EntityBox is rendered with Markdown. The second is an example for how to directly 
									pass properties to the EntityBox without using Markdown.
								</p>
								<ModularWrapper 
									category="techniques"
									id={ beaconData?.techniques?.[0] || "" } />
								<EntityBox children="Dummy Children" type="act" title="Dummy Box" subtitle="Dummy Subtitle"/>

								<h1>
									If you implement the EntityBox rendering correctly, you should see an EntityBox
									under this, too.
								</h1>
								<ModularWrapper 
									category="techniques"
									id={ beaconData?.techniques?.[0] || "" } 
									component="EntityBox"/>

								<h1>
									You should see a sample Infobox under this.
								</h1>
								<Infobox content="Some stuff, *Markdown-formatted*."/>

								<h1>
									If you implement the Infobox rendering correctly, you should see an Infobox under
									this header.
								</h1>
								<ModularWrapper
									category="techniques"
									id={ beaconData?.techniques?.[0] || "" }
									component="Infobox"/>
	
								{/* Not good at all - I need to build another
								custom Box component for jobs. */}
								<h1>
									You should see a lot of Markdown text under this. It renders from the Koronil, not core, module!
								</h1>
								<ModularWrapper 
									category="jobs"
									id={ beaconData?.equippedJob || "" } />
								
								
							</div>
						</div>
					</div>
				</section>
			</main>
		</EngineProvider>
	);
}
