import { useState } from 'react';
import { parseCharacter } from './modules/parser';
import CharacterSheet from './components/CharacterSheet';
import FileUpload from './components/FileUpload';
import './styles/App.css';

function Root() {
    const [character, setCharacter] = useState<any>(null);

    const handleFileLoad = (jsonData: any) => {
        const characterData = parseCharacter(jsonData);
        setCharacter(characterData);
    };

    return (
        <div className="app-container">
            {!character ? (
                <FileUpload onFileLoad={handleFileLoad} />
            ) : (
                <CharacterSheet character={character} />
            )}
        </div>
    );
}

export default Root;