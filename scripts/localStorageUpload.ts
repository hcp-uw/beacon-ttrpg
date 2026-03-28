import { beaconTest } from "@/scripts/data/beaconTest";

// seeds the user's LocalStorage with the beaconTest seed beacon
export const seedBeacon = () => {
	try {
		const beaconData = beaconTest;

		// key
		localStorage.setItem("beacon_1", JSON.stringify(beaconData));
		console.log("Beacon seeded to localStorage!");
	} catch {
		console.error;
	}
};
