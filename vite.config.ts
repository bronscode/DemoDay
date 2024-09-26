import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
	],
	root: "src",
	publicDir: "./public",
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
	},
	build: {
		outDir: "../build/frontend/files",
		emptyOutDir: true,
	},
});
