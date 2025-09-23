import type { Character } from '../model/json/character-general';
import FileUploadPage from '../pages/load/FileUploadPage';
import SpecificationPage from '../pages/specification/SpecificationPage';

interface AppMainProps {
    character: Character | null;
    onFileLoad: (data: unknown) => void;
}

function AppMain({ character, onFileLoad }: AppMainProps) {
    return (
        <main className="main-content">
            {!character ? (
                <FileUploadPage onFileLoad={onFileLoad} />
            ) : (
                <SpecificationPage character={character} />
            )}
        </main>
    );
}

export default AppMain;