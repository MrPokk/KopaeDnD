import { useEffect, useState } from 'react';
import OBR from '@owlbear-rodeo/sdk';

export function useOwlbearReady() {
    const [isAvailable, setIsAvailable] = useState(OBR.isAvailable);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!OBR.isAvailable) {
            setIsAvailable(false);
            return;
        }

        if (OBR.isReady) {
            setIsReady(true);
        } else {
            const readyHandler = () => setIsReady(true);
            OBR.onReady(readyHandler);

            return () => {
                OBR.onReady(() => { });
            };
        }
    }, []);

    return { isAvailable, isReady };
}