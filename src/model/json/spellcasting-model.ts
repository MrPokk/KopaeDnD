import { AbilityType } from './specifications-model';

export interface Spellcasting {
    ability: AbilityType;
    saveDC: number;
    attackBonus: number;
    spellSlots: SpellSlots;
    spells: Spell[];
    availableClasses: string[];
}

export interface SpellSlots {
    0?: { available: number; used: number };
    1: { available: number; used: number };
    2: { available: number; used: number };
    3: { available: number; used: number };
}

export interface Spell {
    id: string;
    name: string;
    level: number;
    prepared: boolean;
    school: string;
}