import { useState } from 'react';
import type { CharacterIdentity } from "../../../model/json/character-identity-model";
import { translationService } from "../../../modules/langs/translation-service";

interface Props {
    identity?: CharacterIdentity;
}

export default function CharacterHeader({ identity }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!identity) {
        return <h1>{translationService.getUIText("unknownCharacter")}</h1>;
    }

    return (
        <div className="character-header">
            <div className="header-main" onClick={() => setIsCollapsed(!isCollapsed)}>
                <h1>{identity.name || translationService.getUIText("unknownCharacter")}</h1>
                <div className={`collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                </div>
            </div>

            <div className={`character-identity ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="identity-row">
                    <span className="highlight-text">
                        {translationService.getUIText("levelCharacter")} {identity.level}
                    </span>
                    <span className="highlight-text">{identity.race}</span>
                    <span className="highlight-text">{identity.charClass}</span>
                    {identity.charSubclass && (
                        <span className="highlight-text">{identity.charSubclass}</span>
                    )}
                </div>
                <div className="identity-row">
                    <span>{identity.background}</span>
                    <span>{identity.alignment}</span>
                </div>
            </div>
        </div>
    );
}