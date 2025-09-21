import type { CharacterIdentity } from '../../model/json/character-identity-model';
import { translationService } from '../langs/translation-service';

const DEFAULT_LEVEL = 1;
const DEFAULT_EXPERIENCE = 0;
const DEFAULT_PROFICIENCY_BONUS = 2;
const DEFAULT_INSPIRATION = false;

export class CharacterIdentityParser {
    public parseCharacterIdentity(characterData: any): CharacterIdentity | undefined {
        try {
            const data = typeof characterData === 'string'
                ? JSON.parse(characterData)
                : characterData;

            const actualData = data.data ? (typeof data.data === 'string' ? JSON.parse(data.data) : data.data) : data;

            if (!actualData) return undefined;

            return {
                name: this.parseName(actualData),
                playerName: this.parsePlayerName(actualData),
                level: this.parseLevel(actualData),
                race: this.parseRace(actualData),
                charClass: this.parseClass(actualData),
                charSubclass: this.parseSubclass(actualData),
                background: this.parseBackground(actualData),
                alignment: this.parseAlignment(actualData),
                experience: this.parseExperience(actualData),
                inspiration: this.parseInspiration(actualData),
                proficiencyBonus: this.parseProficiencyBonus(actualData)
            };
        } catch (error) {
            console.error('Error parsing character identity:', error);
            return undefined;
        }
    }

    private parseName(data: any): string {
        if (data.name?.value) return data.name.value;
        if (data.name) return data.name;
        if (data.info?.name?.value) return data.info.name.value;
        return translationService.getUIText("unknownCharacter");
    }

    private parsePlayerName(data: any): string {
        if (data.playerName?.value) return data.playerName.value;
        if (data.playerName) return data.playerName;
        if (data.info?.playerName?.value) return data.info.playerName.value;
        return translationService.getUIText("unknownPlayer");
    }

    private parseLevel(data: any): number {
        if (data.level?.value) return Number(data.level.value);
        if (data.level) return Number(data.level);
        if (data.info?.level?.value) return Number(data.info.level.value);
        return DEFAULT_LEVEL;
    }

    private parseRace(data: any): string {
        if (data.race?.value) return data.race.value;
        if (data.race) return data.race;
        if (data.info?.race?.value) return data.info.race.value;
        return translationService.getUIText("unknownRace");
    }

    private parseClass(data: any): string {
        if (data.class?.value) return data.class.value;
        if (data.class) return data.class;
        if (data.info?.charClass?.value) return data.info.charClass.value;
        if (data.charClass?.value) return data.charClass.value;
        if (data.charClass) return data.charClass;
        return translationService.getUIText("unknownRace");
    }

    private parseSubclass(data: any): string | undefined {
        if (data.subclass?.value) return data.subclass.value;
        if (data.subclass) return data.subclass;
        if (data.info?.charSubclass?.value) return data.info.charSubclass.value;
        if (data.charSubclass?.value) return data.charSubclass.value;
        if (data.charSubclass) return data.charSubclass;
        return undefined;
    }

    private parseBackground(data: any): string {
        if (data.background?.value) return data.background.value;
        if (data.background) return data.background;
        if (data.info?.background?.value) return data.info.background.value;
        return 'Неизвестное происхождение';
    }

    private parseAlignment(data: any): string {
        if (data.alignment?.value) return data.alignment.value;
        if (data.alignment) return data.alignment;
        if (data.info?.alignment?.value) return data.info.alignment.value;
        return translationService.getUIText("unknownAlignment");
    }

    private parseExperience(data: any): number {
        if (data.experience?.value) return Number(data.experience.value);
        if (data.experience) return Number(data.experience);
        if (data.info?.experience?.value) return Number(data.info.experience.value);
        if (data.xp) return Number(data.xp);
        if (data.exp) return Number(data.exp);
        return DEFAULT_EXPERIENCE;
    }

    private parseInspiration(data: any): boolean {
        if (data.inspiration !== undefined) return Boolean(data.inspiration);
        if (data.hasInspiration !== undefined) return Boolean(data.hasInspiration);
        return DEFAULT_INSPIRATION;
    }

    private parseProficiencyBonus(data: any): number {
        if (data.proficiency !== undefined) return Number(data.proficiency);
        if (data.proficiencyBonus !== undefined) return Number(data.proficiencyBonus);
        if (data.profBonus !== undefined) return Number(data.profBonus);
        return DEFAULT_PROFICIENCY_BONUS;
    }
}