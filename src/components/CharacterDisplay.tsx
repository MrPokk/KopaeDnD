import type { Character } from '../model/json/character-general';
import '../styles/CharacterDisplay.css';
import AbilityCard from './AbilityCard';
import BackButton from './BackButton';
import CharacterHeader from './CharacterHeader';
import ProficiencyBonus from './ProficiencyBonus';

interface Props {
    character: Character;
}

export default function CharacterDisplay({ character }: Props) {
    const { identity, specifications } = character;

    if (!specifications) {
        return <div className="character-display-empty">Данные персонажа не найдены</div>;
    }

    const { abilities, skills, proficiencyBonus } = specifications;

    return (
        <div className="character-display">
            <CharacterHeader identity={identity} />

            <div className="abilities-with-skills-section">
                <h2>Характеристики</h2>
                <div className="abilities-with-skills-grid">
                    {abilities.map(ability => {
                        const relatedSkills = skills.filter(skill => skill.linkedAbility === ability.type);
                        return (
                            <AbilityCard
                                key={ability.type}
                                ability={ability}
                                relatedSkills={relatedSkills}
                            />
                        );
                    })}
                </div>
            </div>

            <ProficiencyBonus proficiencyBonus={proficiencyBonus} />
            <BackButton />
        </div>
    );
}