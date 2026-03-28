// handles beacon formatting and typing. This is the type that the Firestore beacon documents should conform to.
export type Beacon = {
	reflection?: string;
	name?: string;
	pronouns?: string;
	title?: string;
	level?: number;
	ancestry?: string;
	equippedAncestryTrait?: string;
	classes?: Record<string, number>;
	jobs?: Record<string, number>;
	equippedJob?: string;
	talents?: Array<string>;
	loot?: Array<string>;
	supplies?: Record<string, number>;
	weapons?: Record<string, number>;
	supportItems?: Array<string>;
	techniques?: Array<string>;
	description?: string;
};
