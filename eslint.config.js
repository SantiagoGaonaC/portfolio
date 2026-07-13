import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: [
			".astro/**",
			".vercel/**",
			"dist/**",
			"node_modules/**",
			"src/env.d.ts",
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		files: ["**/*.cjs"],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			"@typescript-eslint/no-require-imports": "off",
		},
	},
];
