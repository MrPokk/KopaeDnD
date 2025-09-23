import { useRolling } from "../../../hooks/useRolling";
import type { Skill, SkillKey } from "../../../model/json/specifications-model";
import { translationService } from "../../../modules/langs/translation-service";

interface Props {
    skill: Skill;
}

export default function SkillItem({ skill }: Props) {
    const { rollDice } = useRolling();

    const handleValueClick = (value: number, label: string) => {
        rollDice(value, label);
    };

    const translationSkillName = (skillType: SkillKey) => {
        return translationService.getSkillName(skillType);
    }

    return (
        <div className="skill-item-compact">
            <div className="skill-info">
                <span className="skill-name">{translationService.getSkillName(skill.type)}</span>
                <div className={`skill-proficiency ${skill.proficiency === 2 ? 'skill-proficiency-full' :
                    skill.proficiency === 1 ? 'skill-proficiency-half' : 'skill-proficiency-none'
                    }`}></div>
            </div>
            <button
                className="skill-value"
                onClick={() => handleValueClick(skill.value, `${translationSkillName(skill.type)}`)}
            >
                {skill.value >= 0 ? '+' : ''}{skill.value}
            </button>
        </div>
    );
}