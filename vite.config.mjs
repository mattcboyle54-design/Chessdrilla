import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"
import errorOverlay from "@visulima/vite-overlay"


export default defineConfig({
    plugins: [
        react(),
        checker({ typescript: true }),
        errorOverlay()
    ],
    server: {
        port: 3000,
        open: true,
    }
})
