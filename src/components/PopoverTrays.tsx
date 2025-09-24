import OBR from "@owlbear-rodeo/sdk";
import { useRollListener } from "../hooks/useRollListener";
import { useOwlbearReady } from "../hooks/useOwlbearReady";
import { getPluginId } from "../utils/getPluginId";
import { useCallback, useState, useRef, useEffect } from "react";
import type { RollData } from "../model/roll/roll-model";
import "../styles/components/PopoverTrays.css";
import { translationService } from "../modules/langs/translation-service";

const POPOVER_SETTINGS = {
    OPEN: { WIDTH: 340, HEIGHT: 170 },
    CLOSE: { WIDTH: 0, HEIGHT: 0 },
    AUTO_CLOSE_DELAY: 5 * 1000
};

function setPopover(width: number, height: number) {
    if (!OBR.isAvailable) return;

    try {
        OBR.popover.setWidth(getPluginId("popover"), width);
        OBR.popover.setHeight(getPluginId("popover"), height);
    } catch (error) {
        console.warn("Failed to set popover size:", error);
    }
}

export default function PopoverTrays() {
    const [rollData, setRollData] = useState<RollData | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const { isAvailable, isReady } = useOwlbearReady();

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleRoll = useCallback((rollData: RollData) => {
        if (!isAvailable || !isReady) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setRollData(rollData);
        setPopover(POPOVER_SETTINGS.OPEN.WIDTH, POPOVER_SETTINGS.OPEN.HEIGHT);

        timeoutRef.current = window.setTimeout(() => {
            setPopover(POPOVER_SETTINGS.CLOSE.WIDTH, POPOVER_SETTINGS.CLOSE.HEIGHT);
            setRollData(null);
        }, POPOVER_SETTINGS.AUTO_CLOSE_DELAY);
    }, [isAvailable, isReady]);

    useRollListener(handleRoll);

    return (
        <div className="popover-trays">
            {rollData ? (
                <div className="roll-result-card">
                    <div className="roll-result-header">
                        <span className="roll-result-title">{rollData.label.toUpperCase()}</span>
                        <div className={`roll-result-badge ${rollData.roll === 1 ? 'critical-fail' : ''}`}>
                            {rollData.total}
                        </div>
                    </div>

                    <div className="roll-result-content">
                        <div className="roll-result-item">
                            <span className="roll-result-label">{translationService.getUIText("playerRoll")}:</span>
                            <span className="roll-result-value">{rollData.playerName}</span>
                        </div>
                        <div className="roll-result-item">
                            <span className="roll-result-label">{translationService.getUIText("playerRollTotal")}:</span>
                            <span className="roll-result-value">({rollData.roll}) + {rollData.modifier}</span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}