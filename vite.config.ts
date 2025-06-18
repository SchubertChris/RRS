// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Hauptalias für src
      "@components": path.resolve(__dirname, "src/Components"),
      "@layouts": path.resolve(__dirname, "src/Components/Layout"),
      "@pages": path.resolve(__dirname, "src/Components/Pages"),
      "@forms": path.resolve(__dirname, "src/Components/Forms"),
      "@styles": path.resolve(__dirname, "src/Assets/Style/Base"),
      "@themes": path.resolve(__dirname, "src/Assets/Style/Base/Themes"),
      "@fonts": path.resolve(__dirname, "src/Assets/Style/Base/Themes/Fonts"),
      "@images": path.resolve(__dirname, "src/Assets/Images"),
      "@utils": path.resolve(__dirname, "src/Utils"),
      "@routes": path.resolve(__dirname, "src/Routes"),
      "@services": path.resolve(__dirname, "src/Services"),
      "@store": path.resolve(__dirname, "src/Store"),
      "@types": path.resolve(__dirname, "src/Types"),
      "@plugins": path.resolve(__dirname, "src/Plugins"),
    },
  },
});
