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

const DEFAULT_ABILITY_SCORE = 10;
const ABILITY_MODIFIER_DIVISOR = 2;
const DEFAULT_PROFICIENCY_BONUS = 2;
const NO_PROFICIENCY_BONUS = 0;
const PROFICIENCY_LEVEL_NONE = 0;
const PROFICIENCY_LEVEL_PROFICIENT = 1;
const PROFICIENCY_LEVEL_EXPERT = 2;
const DEFAULT_BASE_STAT = 'int';

export class SpecificationsParser {
    public parseCharacterSpecifications(characterData: any): Specifications {
        try {
            const data = typeof characterData.data === 'string'
                ? JSON.parse(characterData.data)
                : characterData.data;

            const proficiencyBonus = data.proficiency || DEFAULT_PROFICIENCY_BONUS;

            return {
                abilities: this.parseAbilities(data, proficiencyBonus),
                skills: this.parseSkills(data, proficiencyBonus),
                saves: this.parseSaves(data),
                proficiencyBonus: proficiencyBonus
            };
        } catch (error) {
            console.error('Error parsing character specifications:', error);
            throw new Error('Invalid character data format');
        }
    }

    private parseAbilities(data: any, proficiencyBonus: number): Ability[] {
        const abilities: Ability[] = [];
        const stats = data.stats;
        const saves = data.saves || {};

        if (!stats) return abilities;

        for (const abilityType of Object.values(AbilityType)) {
            if (!stats[abilityType]) continue;

            const abilityData = stats[abilityType];
            const saveData = saves[abilityType] || {};

            const score = abilityData.score || DEFAULT_ABILITY_SCORE;
            const baseModifier = Math.floor((score - DEFAULT_ABILITY_SCORE) / ABILITY_MODIFIER_DIVISOR);
            const isSaveProficient = saveData.isProf || false;
            const saveBonus = baseModifier + (isSaveProficient ? proficiencyBonus : NO_PROFICIENCY_BONUS);

            abilities.push({
                type: abilityType,
                name: translationService.getAbilityName(abilityType),
                total: score,
                modifier: baseModifier,
                check: baseModifier,
                save: saveBonus,
                isSaveProficient: isSaveProficient
            });
        }

        return abilities;
    }

    private parseSkills(data: any, proficiencyBonus: number): Skill[] {
        const skills: Skill[] = [];
        const skillsData = data.skills;
        const stats = data.stats;

        if (!skillsData || !stats) return skills;

        for (const skillKey of Object.values(SkillKey)) {
            if (!skillsData[skillKey]) continue;

            const skillData = skillsData[skillKey];
            const proficiencyLevel = skillData.isProf || PROFICIENCY_LEVEL_NONE;
            const baseStat = skillData.baseStat || DEFAULT_BASE_STAT;
            const linkedAbility = mapBaseStatToAbilityType(baseStat);

            const proficiency = this.determineProficiency(proficiencyLevel);
            const abilityScore = stats[linkedAbility]?.score || DEFAULT_ABILITY_SCORE;
            const abilityModifier = Math.floor((abilityScore - DEFAULT_ABILITY_SCORE) / ABILITY_MODIFIER_DIVISOR);
            const skillBonus = this.calculateSkillBonus(proficiency, proficiencyBonus);
            const totalValue = abilityModifier + skillBonus;

            skills.push({
                name: translationService.getSkillName(skillKey),
                linkedAbility: linkedAbility,
                proficiency: proficiency,
                value: totalValue
            });
        }

        return skills;
    }

    private determineProficiency(proficiencyLevel: number): SkillProficiency {
        switch (proficiencyLevel) {
            case PROFICIENCY_LEVEL_PROFICIENT: return SkillProficiency.Proficient;
            case PROFICIENCY_LEVEL_EXPERT: return SkillProficiency.Expert;
            default: return SkillProficiency.None;
        }
    }

    private calculateSkillBonus(proficiency: SkillProficiency, proficiencyBonus: number): number {
        switch (proficiency) {
            case SkillProficiency.Proficient: return proficiencyBonus;
            case SkillProficiency.Expert: return proficiencyBonus * 2;
            default: return NO_PROFICIENCY_BONUS;
        }
    }

    private parseSaves(data: any): SaveProficiency[] {
        const saves: SaveProficiency[] = [];
        const savesData = data.saves;

        if (!savesData) return saves;

        for (const abilityType of Object.values(AbilityType)) {
            if (!savesData[abilityType]) continue;

            const saveData = savesData[abilityType];

            saves.push({
                ability: abilityType,
                isProficient: saveData.isProf || false
            });
        }

        return saves;
    }
}