import { useState } from 'react';
import { translationService, type Locale } from './modules/langs/translation-service';
import { SpecificationsParser } from './modules/parser/specifications-parser';
import { CharacterIdentityParser } from './modules/parser/character-identity-parser';
import FileUpload from './components/FileUpload';
import CharacterDisplay from './components/CharacterDisplay';
import './styles/App.css';
import type { Character } from './model/json/character-general';

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

    const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value as Locale;
        setCurrentLocale(newLocale);
        translationService.setLocale(newLocale);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>D&D Character Viewer</h1>
                <div className="language-selector">
                    <label htmlFor="language-select">Язык:</label>
                    <select
                        id="language-select"
                        value={currentLocale}
                        onChange={handleLocaleChange}
                    >
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </header>
            <main className="main-content">
                {!character ? (
                    <FileUpload onFileLoad={handleFileLoad} />
                ) : (
                    <CharacterDisplay character={character} />
                )}
            </main>

            <footer className="app-footer">
                <p>D&D Character Viewer © 2024</p>
            </footer>
        </div>
    );
}

export default Root;