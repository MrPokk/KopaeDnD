import { RU_TRANSLATIONS } from './locales/ru';
import { EN_TRANSLATIONS } from './locales/en';
import type { AbilityType, SkillKey } from '../../model/json/specifications-model';

export type Locale = 'ru' | 'en';

export const TRANSLATIONS = {
    ru: RU_TRANSLATIONS,
    en: EN_TRANSLATIONS
};

type UITextKey = keyof typeof EN_TRANSLATIONS.ui;

export class TranslationService {
    private currentLocale: Locale = 'ru';

    setLocale(locale: Locale): void {
        this.currentLocale = locale;
    }

    getLocale(): Locale {
        return this.currentLocale;
    }

    getAbilityName(abilityType: AbilityType): string {
        return TRANSLATIONS[this.currentLocale].abilities[abilityType];
    }

    getSkillName(skillKey: SkillKey): string {
        return TRANSLATIONS[this.currentLocale].skills[skillKey];
    }

    getUIText(key: UITextKey): string {
        return TRANSLATIONS[this.currentLocale].ui[key];
    }

    getTranslations() {
        return TRANSLATIONS[this.currentLocale];
    }
}

export const translationService = new TranslationService();