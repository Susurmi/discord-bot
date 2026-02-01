import globals from 'globals';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
	{
		files: ['**/*.{js,mjs,cjs}'],
		ignores: ['node_modules/**', 'dist/**', 'build/**'],
	},

	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'commonjs',
			globals: globals.node,
		},
	},

	js.configs.recommended,
	jsdoc.configs['flat/recommended'],

	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: {
			jsdoc,
		},
		rules: {
			// Code quality
			'no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^(CommandInteraction|Client|GuildMember|GuildScheduledEvent)$',
				},
			],
			'no-console': 'off', // Console logging is expected for bot output
			'prefer-const': 'warn',
			'no-var': 'error',

			// JSDoc rules
			'jsdoc/require-jsdoc': 'off', // Commands/events use module.exports pattern
			'jsdoc/require-param': 'off',
			'jsdoc/require-param-description': 'off',
			'jsdoc/require-returns': 'off',
			'jsdoc/check-types': 'warn',
			'jsdoc/check-param-names': 'warn',
			'jsdoc/valid-types': 'warn',
			'jsdoc/no-undefined-types': 'off', // Discord.js types may not be defined
			'jsdoc/require-param-type': 'off', // Allow simplified JSDoc without types
		},
	},
];
