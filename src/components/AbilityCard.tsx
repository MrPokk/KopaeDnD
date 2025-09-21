import type { Ability, Skill } from '../model/json/specifications-model';
import SkillItem from './SkillItem';

interface Props {
    ability: Ability;
    relatedSkills: Skill[];
}

export default function AbilityCard({ ability, relatedSkills }: Props) {
    return (
        <div className="ability-with-skills-card">
            <div className="ability-compact">
                <div className="ability-name-row">
                    <h3 className="ability-name">{ability.name}</h3>
                    <div className="ability-modifier-right">
                        <span className="modifier-value">
                            {ability.modifier >= 0 ? '+' : ''}{ability.modifier}
                        </span>
                    </div>
                </div>

                <div className="ability-details">
                    <div className="ability-score-value">
                        <span className="score-value">{ability.total}</span>
                    </div>

                    <div className="ability-save-compact">
                        <span className="save-label">Спасбросок</span>
                        <span className="save-value">
                            {ability.save >= 0 ? '+' : ''}{ability.save}
                            {ability.isSaveProficient && <span className="save-proficient"></span>}
                        </span>
                    </div>
                </div>
            </div>

            {relatedSkills.length > 0 && (
                <div className="related-skills">
                    <div className="skills-list">
                        {relatedSkills.map(skill => (
                            <SkillItem key={skill.name} skill={skill} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}