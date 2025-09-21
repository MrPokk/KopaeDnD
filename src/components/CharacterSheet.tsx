import type { CharacterData } from '../model/character';
import '../styles/CharacterSheet.css';

interface Props {
    character: CharacterData;
}

export default function CharacterSheet({ character }: Props) {
    return (
        <div className="character-sheet">
            <div className="header">
                <h1>{character.name}</h1>
                <div className="basic-info">
                    <span>{character.race} {character.class}</span>
                    {character.subclass && <span>({character.subclass})</span>}
                    <span>Уровень {character.level}</span>
                    {character.background && <span>{character.background}</span>}
                    {character.alignment && <span>{character.alignment}</span>}
                </div>
            </div>

            <div className="stats-section">
                <h2>Характеристики</h2>
                <div className="stats-grid">
                    {Object.entries(character.stats).map(([key, value]) => (
                        <div key={key} className="stat">
                            <div className="stat-value">{value}</div>
                            <div className="stat-name">{key.toUpperCase()}</div>
                            <div className="stat-modifier">
                                {Math.floor((value - 10) / 2) >= 0 ? '+' : ''}
                                {Math.floor((value - 10) / 2)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Добавьте другие секции по аналогии */}

            <button
                onClick={() => window.location.reload()}
                className="reset-button"
            >
                Загрузить другого персонажа
            </button>
        </div>
    );
}