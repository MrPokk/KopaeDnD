import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useRef } from "react";
import { nameMessage, type RollData } from "../model/roll/roll-model";
import { useOwlbearReady } from "./useOwlbearReady";

export function useRollListener(onRoll?: (rollData: RollData) => void) {
    const { isAvailable, isReady } = useOwlbearReady();
    const unsubscribeRef = useRef<(() => void) | null>(null);
    const onRollRef = useRef(onRoll);

    useEffect(() => {
        onRollRef.current = onRoll;
    }, [onRoll]);

    useEffect(() => {
        if (!isAvailable || !isReady) return;

        const handleDiceRoll = (event: {
            data: unknown;
            connectionId: string;
        }) => {
            const rollData = event.data as RollData;
            if (onRollRef.current) {
                onRollRef.current(rollData);
            }
        };

        if (unsubscribeRef.current) {
            unsubscribeRef.current();
        }

        unsubscribeRef.current = OBR.broadcast.onMessage(nameMessage, handleDiceRoll);

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
            }
        };
    }, [isAvailable, isReady]);
}