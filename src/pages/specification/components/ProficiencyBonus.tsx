import { translationService } from "../../../modules/langs/translation-service";

interface Props {
    proficiencyBonus: number;
}

export default function ProficiencyBonus({ proficiencyBonus }: Props) {
    const handleValueClick = (value: number, label: string) => {
        console.log(`${label}: ${value}`);
    };

    return (
        <div className="proficiency-section">
            <div className="proficiency-card">
                <h3>{translationService.getUIText("proficiencyBonus")}</h3>
                <button
                    className="value-button proficiency-value"
                    onClick={() => handleValueClick(proficiencyBonus, "Proficiency Bonus")}
                >
                    {proficiencyBonus >= 0 ? '+' : ''}{proficiencyBonus}
                </button>
            </div>
        </div>
    );
}