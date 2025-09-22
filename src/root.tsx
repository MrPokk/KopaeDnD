import { useState } from 'react';
import { translationService, type Locale } from './modules/langs/translation-service';
import { SpecificationsParser } from './modules/parser/specifications-parser';
import { CharacterIdentityParser } from './modules/parser/character-identity-parser';
import type { Character } from './model/json/character-general';
import FileUploadPage from './pages/load/FileUploadPage';
import SpecificationPage from './pages/specification/SpecificationPage';
import LanguageSelector from './components/LanguageSelector';

import './styles/App.css';
import './styles/extra/variables.css';
import './styles/extra/reset.css';

function Root() {
    const [character, setCharacter] = useState<Character | null>(null);
    const [currentLocale, setCurrentLocale] = useState<Locale>('ru');

    const specificationsParser = new SpecificationsParser();
    const identityParser = new CharacterIdentityParser();

    const handleFileLoad = (data: unknown) => {
        try {
            const characterData: Character = {
                identity: identityParser.parseCharacterIdentity(data),
                specifications: specificationsParser.parseCharacterSpecifications(data)
            };
            setCharacter(characterData);
        } catch (error) {
            console.error('Error creating character:', error);
            alert('Ошибка при создании персонажа');
        }
    };

    const handleLocaleChange = (newLocale: Locale) => {
        setCurrentLocale(newLocale);
        translationService.setLocale(newLocale);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <LanguageSelector
                    currentLocale={currentLocale}
                    onLocaleChange={handleLocaleChange}
                />
            </header>
            <main className="main-content">
                {!character ? (
                    <FileUploadPage onFileLoad={handleFileLoad} />
                ) : (
                    <SpecificationPage character={character} />
                )}
            </main>
        </div>
    );
}

export default Root;