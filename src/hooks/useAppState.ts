import { useState, useCallback } from 'react';
import type { Character } from '../model/json/character-general';
import type { Locale } from '../modules/langs/translation-service';

export function useAppState() {
    const [character, setCharacter] = useState<Character | null>(null);
    const [currentLocale, setCurrentLocale] = useState<Locale>('ru');

    const handleCharacterLoaded = useCallback((newCharacter: Character) => {
        setCharacter(newCharacter);
    }, []);

    const handleCharacterReset = useCallback(() => {
        setCharacter(null);
    }, []);

    const handleLocaleChange = useCallback((newLocale: Locale) => {
        setCurrentLocale(newLocale);
    }, []);

    return {
        character,
        currentLocale,
        handleCharacterLoaded,
        handleCharacterReset,
        handleLocaleChange
    };
}