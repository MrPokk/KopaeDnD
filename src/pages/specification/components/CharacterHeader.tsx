import type { CharacterIdentity } from "../../../model/json/character-identity-model";
import { translationService } from "../../../modules/langs/translation-service";

interface Props {
    identity?: CharacterIdentity;
}

export default function CharacterHeader({ identity }: Props) {
    if (!identity) {
        return <h1>{translationService.getUIText("unknownCharacter")}</h1>;
    }

    return (
        <div className="character-header">
            <h1>{identity.name ||
                translationService.getUIText("unknownCharacter")}</h1>
            <div className="character-identity">
                <div className="identity-row">
                    <span className="highlight-text">{translationService.getUIText("classCharacter")} {identity.level}</span>
                    <span className="highlight-text">{identity.race}</span>
                    <span className="highlight-text">{identity.charClass}</span>
                    {identity.charSubclass && <span className="highlight-text">{identity.charSubclass}</span>}
                </div>
                <div className="identity-row">
                    <span>{identity.background}</span>
                    <span>{identity.alignment}</span>
                </div>
            </div>
        </div>
    );
}