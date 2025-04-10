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
        "./AuthAppComponent": "./src/App.jsx",
      },
      remotes: {},
      shared: [
        "react",
        "react-dom",
        "@apollo/client",
        "bootstrap",
        "lucide-react",
      ],
      builder: "vite",
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
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
