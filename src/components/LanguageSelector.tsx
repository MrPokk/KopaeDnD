import { translationService, type Locale } from '../modules/langs/translation-service';

interface Props {
    currentLocale: Locale;
    onLocaleChange: (locale: Locale) => void;
}

export default function LanguageSelector({ currentLocale, onLocaleChange }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value as Locale;
        onLocaleChange(newLocale);
    };

    return (
        <div className="language-selector">
            <label htmlFor="language-select">{translationService.getUIText("language")}:</label>
            <select
                id="language-select"
                value={currentLocale}
                onChange={handleChange}
            >
                <option value="ru">Русский</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}