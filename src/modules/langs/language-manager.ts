import { AbilityType } from '../../model/json/characteristics';
import { LanguageCode, type LanguageSupport } from '../../model/langs/language-types';

export class LanguageManager {
    private currentLanguage: LanguageCode = LanguageCode.ENGLISH;
    private availableLanguages: Map<LanguageCode, LanguageSupport> = new Map();

    constructor() {
        this.initializeDefaultLanguages();
    }

    private initializeDefaultLanguages(): void {
        this.availableLanguages.set(LanguageCode.ENGLISH, {
            abilities: {
                [AbilityType.STRENGTH]: 'Strength',
                [AbilityType.DEXTERITY]: 'Dexterity',
                [AbilityType.CONSTITUTION]: 'Constitution',
                [AbilityType.INTELLIGENCE]: 'Intelligence',
                [AbilityType.WISDOM]: 'Wisdom',
                [AbilityType.CHARISMA]: 'Charisma'
            },
            skills: {
                'acrobatics': 'Acrobatics',
                'investigation': 'Investigation',
                'athletics': 'Athletics',
                'perception': 'Perception',
                'survival': 'Survival',
                'performance': 'Performance',
                'intimidation': 'Intimidation',
                'history': 'History',
                'sleight of hand': 'Sleight of Hand',
                'arcana': 'Arcana',
                'medicine': 'Medicine',
                'deception': 'Deception',
                'nature': 'Nature',
                'insight': 'Insight',
                'religion': 'Religion',
                'stealth': 'Stealth',
                'persuasion': 'Persuasion',
                'animal handling': 'Animal Handling'
            },
            metadata: {
                name: 'English',
                nativeName: 'English',
                code: 'en'
            }
        });

        this.availableLanguages.set(LanguageCode.RUSSIAN, {
            abilities: {
                [AbilityType.STRENGTH]: 'Сила',
                [AbilityType.DEXTERITY]: 'Ловкость',
                [AbilityType.CONSTITUTION]: 'Телосложение',
                [AbilityType.INTELLIGENCE]: 'Интеллект',
                [AbilityType.WISDOM]: 'Мудрость',
                [AbilityType.CHARISMA]: 'Харизма'
            },
            skills: {
                'acrobatics': 'Акробатика',
                'investigation': 'Расследование',
                'athletics': 'Атлетика',
                'perception': 'Восприятие',
                'survival': 'Выживание',
                'performance': 'Выступление',
                'intimidation': 'Запугивание',
                'history': 'История',
                'sleight of hand': 'Ловкость рук',
                'arcana': 'Магия',
                'medicine': 'Медицина',
                'deception': 'Обман',
                'nature': 'Природа',
                'insight': 'Проницательность',
                'religion': 'Религия',
                'stealth': 'Скрытность',
                'persuasion': 'Убеждение',
                'animal handling': 'Уход за животными'
            },
            metadata: {
                name: 'Russian',
                nativeName: 'Русский',
                code: 'ru'
            }
        });
    }

    public setLanguage(language: LanguageCode): void {
        if (this.availableLanguages.has(language)) {
            this.currentLanguage = language;
        } else {
            console.warn(`Language ${language} not found, using English`);
            this.currentLanguage = LanguageCode.ENGLISH;
        }
    }

    public addCustomLanguage(code: LanguageCode, translations: LanguageSupport): void {
        this.availableLanguages.set(code, translations);
    }


    public getAbilityName(abilityType: AbilityType): string {
        const currentTranslations = this.availableLanguages.get(this.currentLanguage);
        const defaultTranslations = this.availableLanguages.get(LanguageCode.ENGLISH);

        return currentTranslations?.abilities[abilityType] ||
            defaultTranslations?.abilities[abilityType] ||
            abilityType.toString();
    }

    public getSkillName(skillKey: string): string {
        const currentTranslations = this.availableLanguages.get(this.currentLanguage);
        const defaultTranslations = this.availableLanguages.get(LanguageCode.ENGLISH);

        return currentTranslations?.skills[skillKey] ||
            defaultTranslations?.skills[skillKey] ||
            this.capitalizeFirstLetter(skillKey);
    }

    public getCurrentLanguage(): LanguageCode {
        return this.currentLanguage;
    }

    public getCurrentLanguageInfo(): { name: string; nativeName: string; code: string } | undefined {
        return this.availableLanguages.get(this.currentLanguage)?.metadata;
    }

    public getAvailableLanguages(): LanguageCode[] {
        return Array.from(this.availableLanguages.keys());
    }

    public isLanguageSupported(language: LanguageCode): boolean {
        return this.availableLanguages.has(language);
    }

    public getTranslationsForLanguage(language: LanguageCode): LanguageSupport | undefined {
        return this.availableLanguages.get(language);
    }

    private capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export function getLanguageName(language: LanguageCode): string {
    const languageNames: Record<LanguageCode, string> = {
        [LanguageCode.ENGLISH]: 'English',
        [LanguageCode.RUSSIAN]: 'Russian',
        [LanguageCode.SPANISH]: 'Spanish',
        [LanguageCode.GERMAN]: 'German',
        [LanguageCode.FRENCH]: 'French',
        [LanguageCode.ITALIAN]: 'Italian',
        [LanguageCode.JAPANESE]: 'Japanese',
        [LanguageCode.CHINESE]: 'Chinese',
        [LanguageCode.KOREAN]: 'Korean'
    };
    return languageNames[language] || language;
}

export function getLanguageNativeName(language: LanguageCode): string {
    const nativeNames: Record<LanguageCode, string> = {
        [LanguageCode.ENGLISH]: 'English',
        [LanguageCode.RUSSIAN]: 'Русский',
        [LanguageCode.SPANISH]: 'Español',
        [LanguageCode.GERMAN]: 'Deutsch',
        [LanguageCode.FRENCH]: 'Français',
        [LanguageCode.ITALIAN]: 'Italiano',
        [LanguageCode.JAPANESE]: '日本語',
        [LanguageCode.CHINESE]: '中文',
        [LanguageCode.KOREAN]: '한국어'
    };
    return nativeNames[language] || language;
}