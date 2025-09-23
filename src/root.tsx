import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import { useAppState } from "./hooks/useAppState";
import { useCharacterParser } from "./hooks/useCharacterParser";
import { backgroundPopover } from "./utils/backgroundPopover";
import { translationService } from "./modules/langs/translation-service";

import './styles/App.css';
import './styles/extra/variables.css';
import './styles/extra/reset.css';

function Root() {

    const {
        character,
        currentLocale,
        handleCharacterLoaded,
        handleLocaleChange
    } = useAppState();

    const { handleFileLoad } = useCharacterParser(handleCharacterLoaded);

    translationService.setLocale(currentLocale);
    backgroundPopover();

    return (
        <div className="app-container">
            <AppHeader
                currentLocale={currentLocale}
                onLocaleChange={handleLocaleChange}
            />
            <AppMain
                character={character}
                onFileLoad={handleFileLoad}
            />
        </div>
    );
}

export default Root;