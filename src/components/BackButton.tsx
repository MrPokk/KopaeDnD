export default function BackButton() {
    return (
        <div className="back-section">
            <button
                className="back-button"
                onClick={() => window.location.reload()}
            >
                Загрузить нового персонажа
            </button>
        </div>
    );
}