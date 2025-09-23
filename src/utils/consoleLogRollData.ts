import type { RollData } from "../model/roll/roll-model";

export function consoleLogRollData(rollData: RollData) {
    console.log(`🎲 ${rollData.playerName} rolled: ${rollData.label}`, {
        d20: rollData.roll,
        modifier: rollData.modifier,
        total: rollData.total,
    });
}
