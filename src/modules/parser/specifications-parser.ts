import {
    AbilityType,
    mapBaseStatToAbilityType,
    SkillKey,
    SkillProficiency,
    type Ability,
    type SaveProficiency,
    type Skill,
    type Specifications
} from '../../model/json/specifications-model';
import { translationService } from '../langs/translation-service';

const CONSTANTS = {
    DEFAULT_ABILITY_SCORE: 10,
    ABILITY_MODIFIER_DIVISOR: 2,
    DEFAULT_PROFICIENCY_BONUS: 2,
    NO_PROFICIENCY_BONUS: 0,
    PROFICIENCY_LEVELS: {
        NONE: 0,
        PROFICIENT: 1,
        EXPERT: 2
    },
    DEFAULT_BASE_STAT: 'int'
} as const;

export class SpecificationsParser {
    public parseCharacterSpecifications(characterData: any): Specifications {
        try {
            const data = this.extractCharacterData(characterData);
            const proficiencyBonus = data.proficiency ?? CONSTANTS.DEFAULT_PROFICIENCY_BONUS;

            return {
                abilities: this.parseAbilities(data, proficiencyBonus),
                skills: this.parseSkills(data, proficiencyBonus),
                saves: this.parseSaves(data),
                proficiencyBonus
            };
        } catch (error) {
            console.error('Error parsing character specifications:', error);
            throw new Error('Invalid character data format');
        }
    }

    private extractCharacterData(characterData: any): any {
        return typeof characterData.data === 'string'
            ? JSON.parse(characterData.data)
            : characterData.data;
    }

    private parseAbilities(data: any, proficiencyBonus: number): Ability[] {
        const { stats, saves = {} } = data;
        if (!stats) return [];

        return Object.values(AbilityType)
            .filter(abilityType => stats[abilityType])
            .map(abilityType => this.buildAbility(abilityType, stats[abilityType], saves[abilityType], proficiencyBonus));
    }

    private buildAbility(
        abilityType: AbilityType,
        abilityData: any,
        saveData: any,
        proficiencyBonus: number
    ): Ability {
        const score = abilityData.score ?? CONSTANTS.DEFAULT_ABILITY_SCORE;
        const baseModifier = this.calculateAbilityModifier(score);
        const isSaveProficient = saveData?.isProf ?? false;
        const saveBonus = baseModifier + (isSaveProficient ? proficiencyBonus : CONSTANTS.NO_PROFICIENCY_BONUS);

        return {
            type: abilityType,
            name: translationService.getAbilityName(abilityType),
            total: score,
            modifier: baseModifier,
            check: baseModifier,
            save: saveBonus,
            isSaveProficient
        };
    }

    private parseSkills(data: any, proficiencyBonus: number): Skill[] {
        const { skills: skillsData, stats } = data;
        if (!skillsData || !stats) return [];

        return Object.values(SkillKey)
            .filter(skillKey => skillsData[skillKey])
            .map(skillKey => this.buildSkill(skillKey, skillsData[skillKey], stats, proficiencyBonus));
    }

    private buildSkill(skillKey: SkillKey, skillData: any, stats: any, proficiencyBonus: number): Skill {
        const proficiencyLevel = skillData.isProf ?? CONSTANTS.PROFICIENCY_LEVELS.NONE;
        const baseStat = skillData.baseStat ?? CONSTANTS.DEFAULT_BASE_STAT;
        const linkedAbility = mapBaseStatToAbilityType(baseStat);

        const proficiency = this.determineProficiency(proficiencyLevel);
        const abilityScore = stats[linkedAbility]?.score ?? CONSTANTS.DEFAULT_ABILITY_SCORE;
        const abilityModifier = this.calculateAbilityModifier(abilityScore);
        const skillBonus = this.calculateSkillBonus(proficiency, proficiencyBonus);

        return {
            name: translationService.getSkillName(skillKey),
            linkedAbility,
            proficiency,
            value: abilityModifier + skillBonus
        };
    }

    private parseSaves(data: any): SaveProficiency[] {
        const savesData = data.saves;
        if (!savesData) return [];

        return Object.values(AbilityType)
            .filter(abilityType => savesData[abilityType])
            .map(abilityType => ({
                ability: abilityType,
                isProficient: savesData[abilityType].isProf ?? false
            }));
    }

    private calculateAbilityModifier(score: number): number {
        return Math.floor((score - CONSTANTS.DEFAULT_ABILITY_SCORE) / CONSTANTS.ABILITY_MODIFIER_DIVISOR);
    }

    private determineProficiency(proficiencyLevel: number): SkillProficiency {
        switch (proficiencyLevel) {
            case CONSTANTS.PROFICIENCY_LEVELS.PROFICIENT:
                return SkillProficiency.Proficient;
            case CONSTANTS.PROFICIENCY_LEVELS.EXPERT:
                return SkillProficiency.Expert;
            default:
                return SkillProficiency.None;
        }
    }

    private calculateSkillBonus(proficiency: SkillProficiency, proficiencyBonus: number): number {
        switch (proficiency) {
            case SkillProficiency.Proficient:
                return proficiencyBonus;
            case SkillProficiency.Expert:
                return proficiencyBonus * 2;
            default:
                return CONSTANTS.NO_PROFICIENCY_BONUS;
        }
    }
}