// is D&D Characteristics
export interface Ability {
    type: AbilityType
    name: string
    value: number
    modifiers: AbilityModifiers
}

export interface AbilityModifiers {
    base: number;
    racial?: number;
    feat?: number;
    item?: number;
    temporary?: number;
    total: number;
}

export interface Skill {
    name: string;
    baseStat: AbilityType;
    proficiency: SkillProficiency;
    value?: number;
}

export enum SkillProficiency {
    None = 0,
    Proficient = 1,
    Expert = 2
}

export enum AbilityType {
    STRENGTH = 'strength',
    DEXTERITY = 'dexterity',
    CONSTITUTION = 'constitution',
    INTELLIGENCE = 'intelligence',
    WISDOM = 'wisdom',
    CHARISMA = 'charisma'
}