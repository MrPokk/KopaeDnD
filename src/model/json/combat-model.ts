export interface CombatStats {
    hitPoints: {
        current: number;
        maximum: number;
        temporary?: number;
    };
    hitDie: string;
    armorClass: number;
    initiative: number;
    speed: number;
    deathSaves: {
        successes: number;
        failures: number;
    };
}