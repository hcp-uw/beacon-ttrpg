export const koronil14 = {
    ancestries: {},
    jobs: {
        "Aegis": {
			asMarkdown: `
Note: Koronil doesn't actually have this.

### AEGIS 

DEFENDER

Defense-oriented spellcasters adept with protective magic. Aegises put up barriers and shields to protect friends and block out foes.

A egises are defensive spellcasters that specialize in creating barriers and mitigating damage. Aegises rely on efficient use of mana to keep their barriers up for prolonged periods of time, and a group of them can maintain a city-spanning barrier for the duration of a siege.

While the primary purpose of an aegis's barriers is protection, they can also be used offensively. A well-placed wall can split a group of enemies or cut off an avenue of attack. For these reasons, aegises find themselves in high demand, especially in militaristic organizations and cities. They are at their strongest when there are people to protect, so they are seldom alone.

Aegises use many methods to extend their mana capacity and lessen the cost of spells: magical tattoos that act as miniature ley lines, mana batteries and potions, and arcane familiars are just some of the tools used by different schools of aegises.

- Ø What are your barriers made of, and what do they look like?
- Ø When did you fail to protect someone or something?
- Ø What does it feel like when one of your barriers breaks?
- Ø What is the longest one of your barriers has lasted for?

### BASE ATTRIBUTES

| SCOPE:      | 10 | SAVE TARGET: | 10 |
|-------------|----|--------------|----|
| BULK        |    | MIND         |    |
| HP:         | 6  | STRESS CAP:  | 7  |
| RECOVERIES: | 3  | MEMORY:      | 7  |
| AGILITY     |    | MAGIC        |    |
| DODGE:      | 6  | A-DEF:       | 10 |
| SPEED:      | 4  | MP:          | 5  |
|             |    |              |    |

### TRAITS

| Mana Transferal                       | Trait |
|---------------------------------------|-------|
| You can spend MP as if it were Focus. |       |

#### **Abjurer's Ward** Trait

You gain the Ward spell, which is equipped for free.

| Ward                           | Reaction |
|--------------------------------|----------|
| Spell  Innate, Mana 1, Unique |          |

**Trigger:** An ally within Scope would take any Physical, Astral, Lunar, or Force damage, before Armor and **resistance**.

**Effect:** You reduce the damage by **1d6**. You can reroll this dice as many times as you want, at a cost of 1 MP/reroll.

WEAPON SLOTS LIGHT MAIN

#### LIMIT BREAK

### **Perfect Shield** Special

Limit Break Range = Scope

At any time during a combat scene, you may choose an ally within Range. Until the end of this phase in the next round, all damage and Stress they receive is reduced to 0.

*The pinnacle of barrier magic is a shield that grows stronger the more force is used against it. Such a perfect shield is unbreakable, but hard to master and incredibly draining.*

Aegises are fragile, backline defenders. Mana Transferal allows them to protect allies without needing to generate Focus first, meaning as long as they have MP, they can use defensive abilities. Aegises can't use Ward on themselves, so they are incentivized to pick abilities that will keep them away from enemies.

## RANK 1

#### **Ablative Armor** Minor Action

Spell 2 Memory Focus X Range = Scope

One ally within Range gains Armor equal to the Focus spent. They cannot have more than 4 Armor. Whenever they take damage, they lose 1 Armor down to their usual maximum.

*Layers of magical armor provide temporary protection, before themselves being torn asunder.*

**Warding Wall** Phase Bolster

Spell 2 Memory Mana 1 Range = Scope, Line 1-3

This AOE is a zone and can face any direction. The zone counts as **difficult terrain**, and attacks that enter it, pass through it, or are made from within it receive **+1** . Characters that enter the zone take 2 Stress 1/ turn per character.

This zone lasts for the rest of the scene, or until you dismiss it as a **free action** or use this ability again.

*Coalesce raw aether into a physical form, hard enough to provide cover and protection.*

## RANK 2

**Barrier** Phase Bolster Spell 2 Memory Mana 2 Range = Scope

Place one of the following protective barriers on a character within Range. It lasts until the start of this phase next round:

- Ø **Protect:** The target gains **resistance to Physical, Astral, Lunar, and Force**.
- Ø **Shell:** The target gains **resistance to Stress and Discord** caused by other characters.

*Specialized barriers that can reduce damage from physical attacks or spells.*

**Offensive Shielding** Volley Ranged Spell Attack 1 Memory Aetheric, Indirect, Mana 2 Range = Scope 2 Stress

**On Hit:** Choose one of the following:

- Ø **Shield Crush:** The target is Sundered until the end of their next turn.
- Ø **Stasis Field:** The target must make a Magic save. **Failure:** They are Immobilized and Slowed until the end of their next turn. **Success:** They are Slowed until the end of their next turn.

*An aegis's shielding can be used offensively, just as any shield can. Being surrounded by shields is akin to being trapped in a room.*

## RANK 3

**Dome Barrier** Channel Spell 2 Memory Arcing, Mana 3, Summon Range = Scope

**Dome Barrier** (Size 4, HP 20, Dodge/A-Def 5, Speed 0)

**On Release:** Create a dome barrier within Range. Other characters can share spaces with this barrier. **1/turn** when a character or object fully within the barrier is targeted by an attack from outside the barrier, you may roll a d6: on 4+, the attack instead targets the barrier. This barrier can't perform any actions (including reactions) even if another ability would allow it to do so.

*Only the most skilled aegises can create these one-way barriers that block incoming attacks but allow outgoing attacks to pass freely.*

#### **Force Shield**

Support Item Light

Whenever you take damage and you aren't Stunned, you may treat your Armor as equal to half your current MP. After doing so, spend 1 MP.

You gain the Shield Block reaction. If you meet this reaction's trigger condition while using Interpose, you can automatically use its effect as part of that Interpose reaction.

*Force shields are defensive artifacts, crafted as small talismans or tattoos that rest upon the hand. When aether is funneled into the shield, it manifests an aetheric barrier.*

**Shield Block** Reaction (1/round)

**Trigger:** You would take Physical, Astral, Lunar, or Force damage.

**Effect:** You take 2 Stress and gain **resistance to that damage**.
			`}
    }
};