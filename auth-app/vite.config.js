import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "authApp",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthComponent": "./src/App.jsx",
      },
      remotes: {
        nurseApp: "https://nurse-app.onrender.com/assets/remoteEntry.js",
      },
      shared: [
        "react",
        "react-dom",
        "@apollo/client",
        "bootswatch",
        "bootstrap",
        "lucide-react",
      ],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 3001,
  },
  preview: {
    port: parseInt(process.env.PORT) || 3001,
    host: "0.0.0.0",
    allowedHosts: ["authenticationapp-mylj.onrender.com"],
  },
  build: {
    modulePreload: false,
    outDir: "dist",
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
