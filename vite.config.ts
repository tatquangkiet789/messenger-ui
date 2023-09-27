import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3000,
        open: true,
    },
    resolve: {
        alias: { 'readable-stream': 'vite-compatible-readable-stream' },
    },
    define: {
        global: 'globalThis',
    },
});
