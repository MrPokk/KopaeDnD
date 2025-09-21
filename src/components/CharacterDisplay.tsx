import '../styles/CharacterDisplay.css';
import type { Character } from '../model/json/character-general';

interface Props {
    character: Character;
}

export default function CharacterDisplay({ character }: Props) {
    const { identity, specifications } = character;

    if (!specifications) {
        return <div className="character-display-empty">Данные персонажа не найдены</div>;
    }

    const { abilities, skills, proficiencyBonus } = specifications;

    const skillsByAbility = abilities.map(ability => ({
        ability,
        skills: skills.filter(skill => skill.linkedAbility === ability.type)
    }));

    return (
        <div className="character-display">
            {/* Заголовок с информацией о персонаже */}
            <div className="character-header">
                <h1>{identity?.name || 'Неизвестный персонаж'}</h1>
                {identity && (
                    <div className="character-identity">
                        <div className="identity-row">
                            <span>Уровень {identity.level}</span>
                            <span>{identity.race}</span>
                            <span>{identity.charClass}</span>
                            {identity.charSubclass && <span>{identity.charSubclass}</span>}
                        </div>
                        <div className="identity-row">
                            <span>Игрок: {identity.playerName}</span>
                            <span>{identity.background}</span>
                            <span>{identity.alignment}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Основные характеристики */}
            <div className="abilities-section">
                <h2>Характеристики</h2>
                <div className="abilities-grid">
                    {abilities.map(ability => (
                        <div key={ability.type} className="ability-card">
                            <div className="ability-header">
                                <h3 className="ability-name">{ability.name}</h3>
                                <div className="ability-score">
                                    <span className="score-value">{ability.total}</span>
                                </div>
                            </div>
                            <div className="ability-modifier">
                                <span className="modifier-value">
                                    {ability.modifier >= 0 ? '+' : ''}{ability.modifier}
                                </span>
                            </div>

                            <div className="ability-check">
                                <div className="check-label">ПРОВЕРКА</div>
                                <div className="check-value">
                                    {ability.check >= 0 ? '+' : ''}{ability.check}
                                </div>
                            </div>

                            <div className="ability-save">
                                <div className="save-label">
                                    СПАСБРОСОК
                                    {ability.isSaveProficient && ' ✓'}
                                </div>
                                <div className="save-value">
                                    {ability.save >= 0 ? '+' : ''}{ability.save}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Навыки */}
            <div className="skills-section">
                <h2>Навыки</h2>
                <div className="skills-grid">
                    {skillsByAbility.map(({ ability, skills: abilitySkills }) => (
                        abilitySkills.length > 0 && (
                            <div key={ability.type} className="skill-group">
                                <div className="skill-group-header">
                                    <h3 className="ability-name">{ability.name}</h3>
                                    <div className="ability-modifier-small">
                                        {ability.modifier >= 0 ? '+' : ''}{ability.modifier}
                                    </div>
                                </div>
                                <div className="skills-list">
                                    {abilitySkills.map(skill => (
                                        <div key={skill.name} className="skill-item">
                                            <div className="skill-info">
                                                <span className="skill-name">{skill.name}</span>
                                                <div className="skill-proficiency">
                                                    {skill.proficiency === 2 ? '🟢' :
                                                        skill.proficiency === 1 ? '🔵' : '⚪'}
                                                </div>
                                            </div>
                                            <div className="skill-value">
                                                <span className="skill-bonus">
                                                    {skill.value >= 0 ? '+' : ''}{skill.value}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* Бонус мастерства */}
            <div className="proficiency-section">
                <div className="proficiency-card">
                    <h3>Бонус мастерства</h3>
                    <div className="proficiency-value">
                        {proficiencyBonus >= 0 ? '+' : ''}{proficiencyBonus}
                    </div>
                </div>
            </div>

            {/* Кнопка возврата */}
            <div className="back-section">
                <button
                    className="back-button"
                    onClick={() => window.location.reload()}
                >
                    Загрузить нового персонажа
                </button>
            </div>
        </div>
    );
}