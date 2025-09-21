import { useState } from 'react';
import FileUpload from './components/FileUpload';
import CharacterDisplay from './components/CharacterDisplay';
import { createCharacteristicsParser } from './modules/parser/characteristics-parser';
import { LanguageManager } from './modules/langs/language-manager';
import './styles/App.css';
import { LanguageCode } from './model/langs/language-types';

function Root() {
    const [characterData, setCharacterData] = useState<any>(null);
    const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(LanguageCode.RUSSIAN);

    const languageManager = new LanguageManager();
    languageManager.setLanguage(currentLanguage);
    const characteristicsParser = createCharacteristicsParser(languageManager);

    const handleFileLoad = (data: any) => {
        setCharacterData(data);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value as LanguageCode;
        setCurrentLanguage(newLanguage);
        languageManager.setLanguage(newLanguage);
    };

    return (
        <div className="app-container">
            <div className="app-header">
                <h1>D&D Character Sheet Viewer</h1>
                <div className="language-selector">
                    <label htmlFor="language-select">Язык:</label>
                    <select
                        id="language-select"
                        value={currentLanguage}
                        onChange={handleLanguageChange}
                    >
                        <option value={LanguageCode.RUSSIAN}>Русский</option>
                        <option value={LanguageCode.ENGLISH}>English</option>
                    </select>
                </div>
            </div>

            <div className="main-content">
                {!characterData && <FileUpload onFileLoad={handleFileLoad} />}

                {characterData && (
                    <CharacterDisplay
                        characterData={characterData}
                        characteristicsParser={characteristicsParser}
                    />
                )}
            </div>

            <div className="app-footer">
                <p>© 2024 D&D Character Sheet Viewer | Created with ❤️ for RPG enthusiasts</p>
            </div>
        </div>
    );
}

export default Root;