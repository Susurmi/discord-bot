require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const loadCommands = require('./handlers/commandHandler');
const loadEvents = require('./handlers/eventHandler');
const path = require('path');

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

(() => {
	// Load all Event Files
	loadEvents(path.join(__dirname, 'events'), bot);

	// Load all Slashcommands
	loadCommands(path.join(__dirname, 'commands'), bot);

	// Start Bot
	const token = process.env.BOT_TOKEN;
	if (!token) process.exit();
	bot.login(token);
})();
