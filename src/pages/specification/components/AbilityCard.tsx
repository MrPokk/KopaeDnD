import { useRolling } from '../../../hooks/useRolling';
import type { Ability, AbilityType, Skill, SkillKey } from '../../../model/json/specifications-model';
import { translationService } from '../../../modules/langs/translation-service';
import SkillItem from './SkillItem';

interface Props {
    ability: Ability;
    relatedSkills: Skill[];
}

export default function AbilityCard({ ability, relatedSkills }: Props) {
    const { rollDice } = useRolling();

    const handleValueClick = (value: number, label: string) => {
        rollDice(value, label);
    };

    const translationAbilityName = (abilityType: AbilityType) => {
        return translationService.getAbilityName(abilityType);
    }

    const translationSkillName = (skillType: SkillKey) => {
        return translationService.getSkillName(skillType);
    }

    return (
        <div className="ability-with-skills-card">
            <div className="ability-header">
                <h3 className="ability-name">{translationAbilityName(ability.type)}</h3>
                <span className="ability-base-value">{ability.total}</span>
            </div>

            <div className="ability-checks">
                <div className="ability-check">
                    <span className="check-label">{translationService.getUIText("abilityCheck")}</span>
                    <button
                        className="value-button check-value"
                        onClick={() => handleValueClick(ability.modifier, `${translationAbilityName(ability.type)}`)}
                    >
                        {ability.modifier >= 0 ? '+' : ''}{ability.modifier}
                    </button>
                </div>
                <div className="ability-check">
                    {ability.isSaveProficient ? <div className={"skill-proficiency skill-proficiency-half"}></div> : null}
                    <span className="check-label">{translationService.getUIText("savingThrow")}</span>
                    <button
                        className="value-button check-value"
                        onClick={() => handleValueClick(ability.save, `${translationAbilityName(ability.type)}`)}
                    >
                        {ability.save >= 0 ? '+' : ''}{ability.save}

                    </button>
                </div>
            </div>

            {relatedSkills.length > 0 && (
                <div className="related-skills">
                    <div className="skills-list">
                        {relatedSkills.map(skill => (
                            <SkillItem key={translationSkillName(skill.type)} skill={skill} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}