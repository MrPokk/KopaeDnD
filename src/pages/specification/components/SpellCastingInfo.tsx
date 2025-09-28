import { useRolling } from "../../../hooks/useRolling";
import { translationService } from "../../../modules/langs/translation-service";

interface Props {
    spellCasting?: {
        ability: string;
        saveDC: number;
        attackBonus: number;
    };
}

export default function SpellCastingInfo({ spellCasting }: Props) {
    const { rollDice } = useRolling();

    if (!spellCasting) {
        return null;
    }

    const handleValueClick = (value: number, label: string) => {
        rollDice(value, label);
    };

    return (
        <div className="spell-casting-section">
            <div className="spell-casting-card">
                <h3>{translationService.getUIText("spellCasting")}</h3>

                <div className="spell-casting-item">
                    <span className="skill-name">{translationService.getUIText("spellSaveDC")}</span>
                    <span className="value">{spellCasting.saveDC}</span>
                </div>

                <div className="spell-casting-item">
                    <span className="skill-name">{translationService.getUIText("spellAttackBonus")}</span>
                    <button
                        className="value-button spell-attack-value"
                        onClick={() => handleValueClick(spellCasting.attackBonus, translationService.getUIText("spellAttackBonus"))}
                    >
                        {spellCasting.attackBonus >= 0 ? '+' : ''}{spellCasting.attackBonus}
                    </button>
                </div>
            </div>
        </div>
    );
}