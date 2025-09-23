import { useCallback, useMemo } from 'react';
import { SpecificationsParser } from '../modules/parser/specifications-parser';
import { CharacterIdentityParser } from '../modules/parser/character-identity-parser';
import type { Character } from '../model/json/character-general';

export function useCharacterParser(onCharacterLoaded: (character: Character) => void) {
    const specificationsParser = useMemo(() => new SpecificationsParser(), []);
    const identityParser = useMemo(() => new CharacterIdentityParser(), []);

    const handleFileLoad = useCallback((data: unknown) => {
        try {
            const characterData: Character = {
                identity: identityParser.parseCharacterIdentity(data),
                specifications: specificationsParser.parseCharacterSpecifications(data)
            };
            onCharacterLoaded(characterData);
        } catch (error) {
            alert(error);
        }
    }, [onCharacterLoaded, specificationsParser, identityParser]);

    return { handleFileLoad };
}