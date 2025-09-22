

import type { Character } from '../../model/json/character-general';
import { translationService } from '../../modules/langs/translation-service';
import AbilityCard from './components/AbilityCard';
import BackButton from './components/BackButton';
import CharacterHeader from './components/CharacterHeader';
import ProficiencyBonus from './components/ProficiencyBonus';

import '../../styles/SpecificationPage.css';

interface Props {
    character: Character;
}

export default function SpecificationPage({ character }: Props) {
    const { identity, specifications } = character;

    if (!specifications) {
        return <div className="character-display-empty">{translationService.getUIText("unknownCharacter")}</div>;
    }

    const { abilities, skills, proficiencyBonus } = specifications;

    return (
        <div className="character-display">
            <CharacterHeader identity={identity} />

            <div className="abilities-with-skills-section">
                <h2>{translationService.getUIText("specificationsCharacter")}</h2>
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