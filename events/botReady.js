const { Events, Client, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,

	/**
	 * @param {Client} client
	 */

	execute(client) {
		client.user.setUsername(process.env.BOT_NAME);

		client.user.setActivity({
			type: ActivityType.Custom,
			name: 'bot-status',
			state: process.env.CUSTOM_STATUS,
		});

		console.log(`Ready! Logged in as ${client.user.username}.`);
	},
};
