export interface Features {
    racialTraits: Trait[];
    classFeatures: Trait[];
    feats: Trait[];
    backgroundFeatures: Trait[];
    proficiencies: Proficiencies;
}

export interface Trait {
    name: string;
    description: string;
    uses?: {
        current: number;
        maximum: number;
        reset: 'shortRest' | 'longRest' | 'day';
    };
}

export interface Proficiencies {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
}