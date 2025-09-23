import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PluginGate } from './components/PluginGate'
import PopoverTrays from './components/PopoverTrays'
import PopoverContent from './components/PopoverContent'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PluginGate>
            <PopoverContent >
                <PopoverTrays />
            </PopoverContent>
        </PluginGate>
    </StrictMode>,
)
