import { translationService } from "../../../modules/langs/translation-service";

export default function BackButton() {
    return (
        <div className="back-section">
            <button
                className="back-button"
                onClick={() => window.location.reload()}
            >
                {translationService.getUIText("loadCharacter")}
            </button>
        </div>
    );
}