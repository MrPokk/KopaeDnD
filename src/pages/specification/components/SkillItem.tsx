import type { Skill } from "../../../model/json/specifications-model";

interface Props {
    skill: Skill;
}

export default function SkillItem({ skill }: Props) {
    const handleValueClick = (value: number, label: string) => {
        console.log(`${label}: ${value}`);
    };

    return (
        <div className="skill-item-compact">
            <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <div className={`skill-proficiency ${skill.proficiency === 2 ? 'skill-proficiency-full' :
                    skill.proficiency === 1 ? 'skill-proficiency-half' : 'skill-proficiency-none'
                    }`}></div>
            </div>
            <button
                className="skill-value"
                onClick={() => handleValueClick(skill.value, `${skill.name} Skill`)}
            >
                {skill.value >= 0 ? '+' : ''}{skill.value}
            </button>
        </div>
    );
}