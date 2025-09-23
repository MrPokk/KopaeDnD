import type { Locale } from '../modules/langs/translation-service';
import LanguageSelector from './LanguageSelector';

interface AppHeaderProps {
    currentLocale: Locale;
    onLocaleChange: (newLocale: Locale) => void;
}

function AppHeader({ currentLocale, onLocaleChange }: AppHeaderProps) {
    return (
        <header className="app-header">
            <LanguageSelector
                currentLocale={currentLocale}
                onLocaleChange={onLocaleChange}
            />
        </header>
    );
}

export default AppHeader;