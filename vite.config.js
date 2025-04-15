import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/mohnishbangaru.github.io", // super important!,
})
