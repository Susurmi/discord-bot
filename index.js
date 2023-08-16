require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
bot.commands = new Collection();

const loadCommands = () => {
	const foldersPath = path.join(__dirname, '/commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				bot.commands.set(command.data.name, command);
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
				);
			}
		}
	}
};

const loadEvents = () => {
	const eventsPath = path.join(__dirname, '/events');
	const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(...args));
		} else {
			bot.on(event.name, (...args) => event.execute(...args));
		}
	}
};

(() => {
	// Load all Event Files
	loadEvents();

	// Load all Slashcommands
	loadCommands();

	// Start Bot
	const token = process.env.BOT_TOKEN;
	bot.login(token);
})();
