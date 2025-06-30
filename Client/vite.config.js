import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig(
    {
        plugins: [react(), tailwindcss()],
        server: { host: true, proxy: "https://custom-inline-edit-and-drag-drop.vercel.app/" }
    })
