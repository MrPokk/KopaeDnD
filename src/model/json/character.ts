export interface CharacterData {
    stats: {
        [key: string]: {
            name: string;
            score: number;
            modifier: number;
        };
    };
    skills: {
        [key: string]: {
            baseStat: string;
            name: string;
            isProf?: number;
        };
    };
    proficiency: number;
}
