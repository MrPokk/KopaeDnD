import OBR from "@owlbear-rodeo/sdk";
import { useCallback } from "react";
import { randomRoll } from "../utils/randomRoll";
import { nameMessage, type RollData } from "../model/roll/roll-model";
import { useOwlbearReady } from "./useOwlbearReady";

export function useRolling() {
    const { isAvailable, isReady } = useOwlbearReady();

    const rollDice = useCallback(async (modifier: number, label: string) => {
        try {
            if (!isAvailable || !isReady) return;

            const roll = randomRoll(1, 20);
            const total = roll + modifier;

            const [playerId, playerName] = await Promise.all([
                OBR.player.getId(),
                OBR.player.getName()
            ]);

            const rollResult: RollData = {
                label: label,
                roll: roll,
                modifier: modifier,
                total: total,
                playerId: playerId,
                playerName: playerName,
                timestamp: Date.now()
            };

            try {
                await OBR.broadcast.sendMessage(nameMessage, rollResult, { destination: "ALL" });
            } catch (broadcastError) {
                console.warn("Failed to broadcast roll, but roll was still executed locally:", broadcastError);
            }

            return { roll, total, modifier };
        } catch (error) {
            console.error("Error in rollDice:", error);

            const errorMessage = error instanceof Error
                ? error.message
                : "Failed to roll dice. Please try again.";

            console.error("Dice roll error:", errorMessage);

            throw error;
        }
    }, [isAvailable, isReady]);

    return { rollDice };
}