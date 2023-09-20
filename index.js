require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const loadCommands = require('./handlers/commandHandler');
const loadEvents = require('./handlers/eventHandler');

const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
	],
});

bot.commands = new Collection();

(() => {
	// Load all Event Files
	loadEvents('/events', bot);

	// Load all Slashcommands
	loadCommands('/commands', bot);

	// Start Bot
	const token = process.env.BOT_TOKEN;
	bot.login(token);
})();
