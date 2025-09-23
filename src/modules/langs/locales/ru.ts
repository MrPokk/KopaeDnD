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
        unknownData: 'Неизвестно',
        loadCharacter: 'Загрузить персонажа',
        specificationsCharacter: 'Характеристики',
        classCharacter: 'Класс',
        abilityCheck: 'Проверка',
        proficiencyBonus: 'Бонус мастерства',
        savingThrow: 'Спасбросок',
        loadCharacterJson: 'Загрузить JSON персонажа',
        uploadCharacterJson: 'Загрузите JSON файл персонажа D&D для отображения характеристик',
        loading: 'Загрузка...',
        invalidFileFormat: 'Неверный формат файла. Убедитесь, что это корректный JSON файл персонажа D&D.',
        fileReadError: 'Ошибка при чтении файла',

        playerRoll: "Игрок",
        playerRollTotal: "Итог",

        language: 'Язык',
    }
} as const;