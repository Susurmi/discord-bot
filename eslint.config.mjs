import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';

export default defineConfig([
	{ files: ['**/*.{js,mjs,cjs}'] },
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
	{ files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },

	jsdoc.configs['flat/recommended'],

	{
		files: ['**/*.js'],

		plugins: {
			jsdoc,
		},

		rules: {
			'no-unused-vars': [
				'warn',
				{
					varsIgnorePattern: '^CommandInteraction|Client|GuildMember|GuildScheduledEvent$', // Ignore Vars used for JSDoc/IntelliSense`
				},
			],
		},
	},
]);
