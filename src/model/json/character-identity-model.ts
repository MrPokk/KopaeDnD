export interface CharacterIdentity {
    name: string;
    playerName: string;
    level: number;
    race: string;
    charClass: string;
    charSubclass?: string;
    background: string;
    alignment: string;
    experience: number;
    inspiration: boolean;
    proficiencyBonus: number;
}