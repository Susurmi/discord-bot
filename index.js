require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

bot.login(process.env.BOT_TOKEN);
