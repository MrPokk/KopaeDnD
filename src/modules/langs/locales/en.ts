import { AbilityType, SkillKey } from '../../../model/json/specifications-model';

export const EN_TRANSLATIONS = {
    abilities: {
        [AbilityType.STRENGTH]: 'Strength',
        [AbilityType.DEXTERITY]: 'Dexterity',
        [AbilityType.CONSTITUTION]: 'Constitution',
        [AbilityType.INTELLIGENCE]: 'Intelligence',
        [AbilityType.WISDOM]: 'Wisdom',
        [AbilityType.CHARISMA]: 'Charisma'
    },
    skills: {
        [SkillKey.ACROBATICS]: 'Acrobatics',
        [SkillKey.INVESTIGATION]: 'Investigation',
        [SkillKey.ATHLETICS]: 'Athletics',
        [SkillKey.PERCEPTION]: 'Perception',
        [SkillKey.SURVIVAL]: 'Survival',
        [SkillKey.PERFORMANCE]: 'Performance',
        [SkillKey.INTIMIDATION]: 'Intimidation',
        [SkillKey.HISTORY]: 'History',
        [SkillKey.SLEIGHT_OF_HAND]: 'Sleight of Hand',
        [SkillKey.ARCANA]: 'Arcana',
        [SkillKey.MEDICINE]: 'Medicine',
        [SkillKey.DECEPTION]: 'Deception',
        [SkillKey.NATURE]: 'Nature',
        [SkillKey.INSIGHT]: 'Insight',
        [SkillKey.RELIGION]: 'Religion',
        [SkillKey.STEALTH]: 'Stealth',
        [SkillKey.PERSUASION]: 'Persuasion',
        [SkillKey.ANIMAL_HANDLING]: 'Animal Handling'
    },
    ui: {
        unknownCharacter: 'Unknown Character',
        unknownData: 'Unknown',
        loadCharacter: 'Load Character',
        specificationsCharacter: 'Character Specifications',
        classCharacter: 'Class',
        abilityCheck: 'Check',
        proficiencyBonus: 'Bonus master',
        savingThrow: 'Saving throw',
        loadCharacterJson: 'Load Character JSON',
        uploadCharacterJson: 'Upload a D&D character JSON file to display specifications',
        loading: 'Loading...',
        invalidFileFormat: 'Invalid file format. Please make sure it is a valid D&D character JSON file.',
        fileReadError: 'Error reading file',

        playerRoll: "Player",
        playerRollTotal: "Total",

        language: 'Language'
    }
} as const;