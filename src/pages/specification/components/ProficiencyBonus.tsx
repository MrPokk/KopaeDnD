import { useRolling } from "../../../hooks/useRolling";
import { translationService } from "../../../modules/langs/translation-service";

interface Props {
    proficiencyBonus: number;
}

export default function ProficiencyBonus({ proficiencyBonus }: Props) {
    const { rollDice } = useRolling();

    const handleValueClick = (value: number, label: string) => {
        rollDice(value, label);
    };

    return (
        <div className="proficiency-section">
            <div className="proficiency-card">
                <h3>{translationService.getUIText("proficiencyBonus")}</h3>
                <button
                    className="value-button proficiency-value"
                    onClick={() => handleValueClick(proficiencyBonus, translationService.getUIText("proficiencyBonus"))}
                >
                    {proficiencyBonus >= 0 ? '+' : ''}{proficiencyBonus}
                </button>
            </div>
        </div>
    );
}