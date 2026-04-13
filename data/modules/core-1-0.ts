// TODO: Find a better way of storing this stuff. The optimal outcome would be some way of only using 
// the attributes directly rather than having to use the asComponent workarounds, and then
// passing the arguments by combining attributes rather than directly as strings.
// This avoids redundancy.
// Also, in theory, different categories should have different schemas.
export const core10 = {
	ancestries: {},
	ancestryTraits: {},
	classes: {},
	jobs: {},
	talents: {},
	loot: {},
	supplies: {},
	weapons: {},
	supportItems: {},
	techniques: {
		"Shield Bash": {
			attributes: {
				body: "When you Interpose and end the movement next to the attacker, you can **push** them **1 space** after the attack.",
				cornerType: "act",
				action: null, // "3 Volley", for example, 3 or "Volley" might also work, though the first 2 are preferable.
				type: "Skill", // "Ranged Spell Attack", for example. Maybe you could custom-classify this as a "move modifier?" I'm not sure.
				attributes: [], // ["Accurate", "Aetheric", "Indirect"], for example.
				title: "Shield Bash",
				memory: [1, "Memory"],
				range: null, // "Scope", for example.
				cost: null, // [0, "Focus"], for example
			},
			asEntityBox: {
				children: "When you Interpose and end the movement next to the attacker, you can **push** them **1 space** after the attack.",
				type: "act",
				BoxTitle: "**Shield Bash**",
				BoxSubtitle: "Skill · 1 Memory"
			},
			asInfobox: {
				content: `
				### Shield Bash
				
				Skill · 1 Memory

				When you Interpose and end the movement next to the attacker, you can **push** them **1 space** after the attack.
				`
			},
			asMarkdown: `
:::box{type="act"}
::boxTitle[**Shield Bash**]
::boxSubtitle[Skill · 1 Memory]

When you Interpose and end the movement next to the attacker, you can **push** them **1 space** after the attack.

:::
			`}
	},
	npcs: {},
	templates: {},
};
