export interface Inventory {
    armor?: Armor;
    shields?: Shield[];
    weapons: Weapon[];
    equipment: EquipmentItem[];
    coins: CoinPurse;
    attunements: AttunementSlot[];
}

export interface Armor {
    name: string;
    type: 'light' | 'medium' | 'heavy';
    armorClass: number;
}

export interface Shield {
    name: string;
    armorClassBonus: number;
}

export interface Weapon {
    name: string;
    attackBonus: string;
    damage: string;
    damageType: string;
    properties?: string[];
}

export interface EquipmentItem {
    name: string;
    quantity: number;
    description?: string;
}

export interface CoinPurse {
    copper?: number;
    silver?: number;
    gold: number;
    platinum?: number;
}

export interface AttunementSlot {
    id: string;
    itemName: string;
    attuned: boolean;
}