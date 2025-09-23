import React from "react";
import { useOwlbearReady } from "../hooks/useOwlbearReady";

export function PluginGate({ children }: { children: React.ReactNode }) {
    const { isAvailable, isReady } = useOwlbearReady()

    if (isReady && isAvailable) {
        return <>{children}</>;
    } else {
        return;
    }
}