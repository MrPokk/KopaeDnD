export interface CharacterDescription {
    appearance: {
        age?: string;
        height?: string;
        weight?: string;
        eyes?: string;
        skin?: string;
        hair?: string;
        description: string;
    };
    backstory: string;
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
}