import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: [{ find: /^three$/, replacement: "three/src/Three.js" }] },
  build: {
    rolldownOptions: {
      output: {
        strictExecutionOrder: true,
        codeSplitting: {
          groups: [{ name: "three", test: /node_modules[\\/]three[\\/]/, maxSize: 300000 }],
        },
      },
    },
  },
});
