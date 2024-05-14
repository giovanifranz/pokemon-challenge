import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ['./tests/setup-test.ts'],
    globals: true,
    watch: false,
    coverage: {
      include: ['**/*.{ts,tsx}'],
      provider: 'v8',
      all: true,
    },
    clearMocks: true,
  },
});
