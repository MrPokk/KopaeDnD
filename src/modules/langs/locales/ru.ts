import { AbilityType, SkillKey } from '../../../model/json/specifications-model';

export const RU_TRANSLATIONS = {
    abilities: {
        [AbilityType.STRENGTH]: 'Сила',
        [AbilityType.DEXTERITY]: 'Ловкость',
        [AbilityType.CONSTITUTION]: 'Телосложение',
        [AbilityType.INTELLIGENCE]: 'Интеллект',
        [AbilityType.WISDOM]: 'Мудрость',
        [AbilityType.CHARISMA]: 'Харизма'
    },
    skills: {
        [SkillKey.ACROBATICS]: 'Акробатика',
        [SkillKey.INVESTIGATION]: 'Анализ',
        [SkillKey.ATHLETICS]: 'Атлетика',
        [SkillKey.PERCEPTION]: 'Внимательность',
        [SkillKey.SURVIVAL]: 'Выживание',
        [SkillKey.PERFORMANCE]: 'Выступление',
        [SkillKey.INTIMIDATION]: 'Запугивание',
        [SkillKey.HISTORY]: 'История',
        [SkillKey.SLEIGHT_OF_HAND]: 'Ловкость рук',
        [SkillKey.ARCANA]: 'Магия',
        [SkillKey.MEDICINE]: 'Медицина',
        [SkillKey.DECEPTION]: 'Обман',
        [SkillKey.NATURE]: 'Природа',
        [SkillKey.INSIGHT]: 'Проницательность',
        [SkillKey.RELIGION]: 'Религия',
        [SkillKey.STEALTH]: 'Скрытность',
        [SkillKey.PERSUASION]: 'Убеждение',
        [SkillKey.ANIMAL_HANDLING]: 'Уход за животными'
    },
    ui: {
        unknownCharacter: 'Неизвестный персонаж',
        unknownPlayer: 'Неизвестный игрок',
        unknownRace: 'Неизвестная раса',
        unknownClass: 'Неизвестный класс',
        unknownBackground: 'Неизвестное происхождение',
        unknownAlignment: 'Неизвестное мировоззрение'
    }
} as const;