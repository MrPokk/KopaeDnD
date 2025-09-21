import type { CharacterIdentity } from "./character-identity-model";
import type { CombatStats } from "./combat-model";
import type { CharacterDescription } from "./description-model";
import type { Features } from "./features-model";
import type { Inventory } from "./inventory-model";
import type { Specifications } from "./specifications-model";
import type { Spellcasting } from "./spellcasting-model";

export interface Character {
    identity?: CharacterIdentity;
    specifications?: Specifications;
    combat?: CombatStats;
    inventory?: Inventory;
    spells?: Spellcasting;
    features?: Features;
    description?: CharacterDescription;
}