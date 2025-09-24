import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 80,
        cors: {
            origin: "https://www.owlbear.rodeo",
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                popover: './popover.html'
            }
        },
        outDir: 'dist',
        assetsDir: 'assets'
    },
    base: './'
})