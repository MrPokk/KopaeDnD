import type { CharacterData } from '../model/character';

export function parseCharacter(json: any): CharacterData {
    // Проверяем, есть ли поле data и является ли оно строкой
    const rawData = typeof json.data === 'string' ? JSON.parse(json.data) : json.data;

    return {
        name: rawData.name?.value || 'Неизвестно',
        class: rawData.info?.charClass?.value || 'Неизвестно',
        subclass: rawData.info?.charSubclass?.value || '',
        level: rawData.info?.level?.value || 1,
        background: rawData.info?.background?.value || '',
        race: rawData.info?.race?.value || '',
        alignment: rawData.info?.alignment?.value || '',
        stats: {
            str: rawData.stats?.str?.score || 10,
            dex: rawData.stats?.dex?.score || 10,
            con: rawData.stats?.con?.score || 10,
            int: rawData.stats?.int?.score || 10,
            wis: rawData.stats?.wis?.score || 10,
            cha: rawData.stats?.cha?.score || 10
        },

    };
}