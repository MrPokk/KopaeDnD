import { type CharacterData } from '../../model/json/character';
import { type Ability, AbilityType, type Skill, SkillProficiency } from '../../model/json/characteristics';
import { LanguageManager } from '../langs/language-manager';

export class CharacteristicsParser {
    private readonly abilityKeyMap: Record<string, AbilityType> = {
        'str': AbilityType.STRENGTH,
        'dex': AbilityType.DEXTERITY,
        'con': AbilityType.CONSTITUTION,
        'int': AbilityType.INTELLIGENCE,
        'wis': AbilityType.WISDOM,
        'cha': AbilityType.CHARISMA
    };

    constructor(private languageManager: LanguageManager) { }

    public parseAbilities(jsonData: any): Ability[] {
        try {
            const characterData: CharacterData = JSON.parse(jsonData.data);
            const abilities: Ability[] = [];

            for (const [key, stat] of Object.entries(characterData.stats)) {
                const abilityType = this.abilityKeyMap[key];
                if (abilityType) {
                    abilities.push({
                        type: abilityType,
                        name: this.languageManager.getAbilityName(abilityType),
                        value: stat.score,
                        modifiers: {
                            base: stat.modifier,
                            total: stat.modifier
                        }
                    });
                }
            }

            return abilities.sort((a, b) => a.type.localeCompare(b.type));
        } catch (error) {
            console.error('Failed to parse abilities:', error);
            return [];
        }
    }

    public parseSkills(jsonData: any): Skill[] {
        try {
            const characterData: CharacterData = JSON.parse(jsonData.data);
            const skills: Skill[] = [];
            const proficiencyBonus = characterData.proficiency || 0;

            for (const [key, skillData] of Object.entries(characterData.skills)) {
                const baseStat = this.abilityKeyMap[skillData.baseStat];
                if (baseStat) {
                    const proficiency = skillData.isProf
                        ? (skillData.isProf === 2 ? SkillProficiency.Expert : SkillProficiency.Proficient)
                        : SkillProficiency.None;

                    const abilityModifier = characterData.stats[skillData.baseStat]?.modifier || 0;
                    const skillBonus = proficiency === SkillProficiency.Expert
                        ? abilityModifier + (proficiencyBonus * 2)
                        : proficiency === SkillProficiency.Proficient
                            ? abilityModifier + proficiencyBonus
                            : abilityModifier;

                    skills.push({
                        name: this.languageManager.getSkillName(key),
                        baseStat,
                        proficiency,
                        value: skillBonus
                    });
                }
            }

            return skills.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error('Failed to parse skills:', error);
            return [];
        }
    }
}

export function createCharacteristicsParser(languageManager: LanguageManager): CharacteristicsParser {
    return new CharacteristicsParser(languageManager);
}