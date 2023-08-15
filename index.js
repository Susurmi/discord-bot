require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { Client, GatewayIntentBits, Events } = require('discord.js');

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

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
	loadEvents();

	const token = process.env.BOT_TOKEN;
	bot.login(token);
})();
