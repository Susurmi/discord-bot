const { Events, Client } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,

	/**
	 * @param {Client} client
	 */

	execute(client) {
		client.user.setUsername(process.env.BOT_NAME);
		client.user.setPresence({ activities: [{ name: 'SlashCommands!' }], status: 'online' });
		console.log(`Ready! Logged in as ${client.user.username}.`);
	},
};
