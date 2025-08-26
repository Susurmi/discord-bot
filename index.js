require('dotenv').config();
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const loadCommands = require('./handlers/commandHandler');
const loadEvents = require('./handlers/eventHandler');
const loadLanguages = require('./handlers/languageHandler');
const loadFeatures = require('./handlers/featureHandler');

const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildScheduledEvents,
	],
});

bot.commands = new Collection();
bot.cooldowns = new Collection();
bot.text = [];

(() => {
	// Load all Language Files
	loadLanguages(path.join(__dirname, 'lang'), bot);

	// Load all Event Files
	loadEvents(path.join(__dirname, 'events'), bot);

	// Load all Slash Commands
	loadCommands(path.join(__dirname, 'commands'), bot);

	// Load all Features
	loadFeatures(path.join(__dirname, 'features'), bot);

	// Start Bot
	const token = process.env.BOT_TOKEN;
	if (!token) {
		console.error('BOT_TOKEN is not set in the environment variables. Please check your .env file.');
		process.exit(1);
	}
	
	bot.login(token).catch(error => {
		console.error('Failed to login to Discord:', error);
		process.exit(1);
	});
})();
