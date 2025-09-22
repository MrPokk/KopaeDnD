import type { CharacterIdentity } from '../../model/json/character-identity-model';
import { translationService } from '../langs/translation-service';

const DEFAULTS = {
    LEVEL: 1,
    EXPERIENCE: 0,
    PROFICIENCY_BONUS: 2,
    INSPIRATION: false,
    UNKNOWN_VALUE: translationService.getUIText("unknownData")
} as const;

export class CharacterIdentityParser {
    public parseCharacterIdentity(characterData: unknown): CharacterIdentity {
        try {
            const data = this.normalizeData(characterData);
            return this.buildCharacterIdentity(data);
        } catch (error) {
            console.error('Error parsing character identity:', error);
            throw new Error('Invalid character data format');
        }
    }

    private normalizeData(characterData: unknown): any {
        const data = typeof characterData === 'string'
            ? JSON.parse(characterData)
            : characterData;

        if (data?.data) {
            return typeof data.data === 'string'
                ? JSON.parse(data.data)
                : data.data;
        }

        return data;
    }

    private buildCharacterIdentity(data: any): CharacterIdentity {
        return {
            name: this.extractString(data, ['name.value', 'name', 'info.name.value']),
            playerName: this.extractString(data, ['playerName.value', 'playerName', 'info.playerName.value']),
            level: this.extractNumber(data, ['level.value', 'level', 'info.level.value'], DEFAULTS.LEVEL),
            race: this.extractString(data, ['race.value', 'race', 'info.race.value']),
            charClass: this.extractString(data, [
                'class.value', 'class',
                'info.charClass.value', 'charClass.value', 'charClass'
            ]),
            charSubclass: this.extractString(data, [
                'subclass.value', 'subclass',
                'info.charSubclass.value', 'charSubclass.value', 'charSubclass'
            ]),
            background: this.extractString(data, ['background.value', 'background', 'info.background.value']),
            alignment: this.extractString(data, ['alignment.value', 'alignment', 'info.alignment.value']),
            experience: this.extractNumber(data, [
                'experience.value', 'experience', 'info.experience.value', 'xp', 'exp'
            ], DEFAULTS.EXPERIENCE),
            inspiration: this.extractBoolean(data, ['inspiration', 'hasInspiration'], DEFAULTS.INSPIRATION),
            proficiencyBonus: this.extractNumber(data, [
                'proficiency', 'proficiencyBonus', 'profBonus'
            ], DEFAULTS.PROFICIENCY_BONUS)
        };
    }

    private extractString(data: any, paths: string[]): string {
        for (const path of paths) {
            const value = this.getNestedValue(data, path);
            if (value != null && value !== '') {
                return String(value);
            }
        }
        return DEFAULTS.UNKNOWN_VALUE;
    }

    private extractNumber(data: any, paths: string[], defaultValue: number): number {
        for (const path of paths) {
            const value = this.getNestedValue(data, path);
            if (value != null && value !== '') {
                const num = Number(value);
                return isNaN(num) ? defaultValue : num;
            }
        }
        return defaultValue;
    }

    private extractBoolean(data: any, paths: string[], defaultValue: boolean): boolean {
        for (const path of paths) {
            const value = this.getNestedValue(data, path);
            if (value !== undefined) {
                return Boolean(value);
            }
        }
        return defaultValue;
    }

    private getNestedValue(obj: any, path: string): unknown {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
}