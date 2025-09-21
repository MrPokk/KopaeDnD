import type { AbilityType } from "../../model/json/characteristics";

export enum LanguageCode {
    ENGLISH = 'english',
    RUSSIAN = 'russian',
    SPANISH = 'spanish',
    GERMAN = 'german',
    FRENCH = 'french',
    ITALIAN = 'italian',
    JAPANESE = 'japanese',
    CHINESE = 'chinese',
    KOREAN = 'korean'
}

export type SupportedLanguage = LanguageCode | string;

export interface LanguageSupport {
    abilities: Record<AbilityType, string>;
    skills: Record<string, string>;
    metadata?: {
        name: string;
        nativeName: string;
        code: string;
    };
}