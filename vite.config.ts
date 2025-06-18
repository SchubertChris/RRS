// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@c": path.resolve(__dirname, "src/Components"),
      "@l": path.resolve(__dirname, "src/Components/Layout"),
      "@p": path.resolve(__dirname, "src/Components/Pages"),
      "@f": path.resolve(__dirname, "src/Components/Forms"),
      "@s": path.resolve(__dirname, "src/Assets/Style/Base"),
      "@t": path.resolve(__dirname, "src/Assets/Style/Base/Themes"),
      "@ft": path.resolve(__dirname, "src/Assets/Style/Base/Themes/Fonts"),
      "@img": path.resolve(__dirname, "src/Assets/Images"),
      "@u": path.resolve(__dirname, "src/Utils"),
      "@r": path.resolve(__dirname, "src/Routes"),
      "@svc": path.resolve(__dirname, "src/Services"),
      "@st": path.resolve(__dirname, "src/Store"),
      "@ty": path.resolve(__dirname, "src/Types"),
      "@pl": path.resolve(__dirname, "src/Plugins"),
    },
  },
});