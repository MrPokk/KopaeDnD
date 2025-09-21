import { CharacteristicsParser } from '../modules/parser/characteristics-parser';
import '../styles/CharacterDisplay.css'; // Создадим отдельный CSS файл

interface Props {
    characterData: unknown;
    characteristicsParser: CharacteristicsParser;
}

export default function CharacterDisplay({ characterData, characteristicsParser }: Props) {
    if (!characterData) {
        return <div className="character-display-empty">Загрузите файл персонажа</div>;
    }

    const abilities = characteristicsParser.parseAbilities(characterData);
    const skills = characteristicsParser.parseSkills(characterData);

    // Группируем навыки по характеристикам
    const skillsByAbility = abilities.map(ability => ({
        ability,
        skills: skills.filter(skill => skill.baseStat === ability.type)
    }));

    return (
        <div className="character-display">
            {/* Заголовок */}
            <div className="character-header">
                <h1>Персонаж D&D</h1>
            </div>

            {/* Основные характеристики */}
            <div className="abilities-section">
                <h2>Основные характеристики</h2>
                <div className="abilities-grid">
                    {abilities.map(ability => (
                        <div key={ability.type} className="ability-card">
                            <div className="ability-header">
                                <h3 className="ability-name">{ability.name}</h3>
                                <div className="ability-score">
                                    <span className="score-value">{ability.value}</span>
                                </div>
                            </div>
                            <div className="ability-modifier">
                                <span className="modifier-value">
                                    {ability.modifiers.total >= 0 ? '+' : ''}{ability.modifiers.total}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Навыки с группировкой по характеристикам */}
            <div className="skills-section">
                <h2>Навыки</h2>
                <div className="skills-grid">
                    {skillsByAbility.map(({ ability, skills: abilitySkills }) => (
                        <div key={ability.type} className="skill-group">
                            <div className="skill-group-header">
                                <h3 className="ability-name">{ability.name}</h3>
                                <div className="ability-modifier-small">
                                    {ability.modifiers.total >= 0 ? '+' : ''}{ability.modifiers.total}
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
                                            {skill.value !== undefined && (
                                                <span className="skill-bonus">
                                                    {skill.value >= 0 ? '+' : ''}{skill.value}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Бонус мастерства */}
            <div className="proficiency-section">
                <div className="proficiency-card">
                    <h3>Бонус мастерства</h3>
                    <div className="proficiency-value">+2</div>
                </div>
            </div>
        </div>
    );
}