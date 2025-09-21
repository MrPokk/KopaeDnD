export interface CharacterData {
    name: string;
    class: string;
    subclass: string;
    level: number;
    background: string;
    race: string;
    alignment: string;
    stats: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
    };

}