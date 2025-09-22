import { translationService } from "../../../modules/langs/translation-service";

interface Props {
    proficiencyBonus: number;
}

export default function ProficiencyBonus({ proficiencyBonus }: Props) {
    return (
        <div className="proficiency-section">
            <div className="proficiency-card">
                <h3>{translationService.getUIText("proficiencyBonus")}</h3>
                <div className="proficiency-value">
                    {proficiencyBonus >= 0 ? '+' : ''}{proficiencyBonus}
                </div>
            </div>
        </div>
    );
}