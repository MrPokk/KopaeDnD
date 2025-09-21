export enum AbilityType {
    STRENGTH = 'str',
    DEXTERITY = 'dex',
    CONSTITUTION = 'con',
    INTELLIGENCE = 'int',
    WISDOM = 'wis',
    CHARISMA = 'cha'
}

export enum SkillKey {
    ACROBATICS = 'acrobatics',
    INVESTIGATION = 'investigation',
    ATHLETICS = 'athletics',
    PERCEPTION = 'perception',
    SURVIVAL = 'survival',
    PERFORMANCE = 'performance',
    INTIMIDATION = 'intimidation',
    HISTORY = 'history',
    SLEIGHT_OF_HAND = 'sleight of hand',
    ARCANA = 'arcana',
    MEDICINE = 'medicine',
    DECEPTION = 'deception',
    NATURE = 'nature',
    INSIGHT = 'insight',
    RELIGION = 'religion',
    STEALTH = 'stealth',
    PERSUASION = 'persuasion',
    ANIMAL_HANDLING = 'animal handling'
}

export interface Ability {
    type: AbilityType;
    name: string;
    total: number;
    modifier: number;
    check: number;
    save: number;
    isSaveProficient: boolean;
}

export interface Skill {
    name: string;
    linkedAbility: AbilityType;
    proficiency: SkillProficiency;
    value: number;
}

export enum SkillProficiency {
    None = 0,
    Proficient = 1,
    Expert = 2
}

export interface SaveProficiency {
    ability: AbilityType;
    isProficient: boolean;
}

export interface Specifications {
    abilities: Ability[];
    skills: Skill[];
    saves: SaveProficiency[];
    proficiencyBonus: number;
}

export const mapBaseStatToAbilityType = (baseStat: string): AbilityType => {
    const mapping: { [key: string]: AbilityType } = {
        'str': AbilityType.STRENGTH,
        'dex': AbilityType.DEXTERITY,
        'con': AbilityType.CONSTITUTION,
        'int': AbilityType.INTELLIGENCE,
        'wis': AbilityType.WISDOM,
        'cha': AbilityType.CHARISMA
    };

    return mapping[baseStat] || AbilityType.INTELLIGENCE;
};