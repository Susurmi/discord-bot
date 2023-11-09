const { Events, GuildScheduledEvent } = require('discord.js');
const config = require('../json/config.json');

module.exports = {
	name: Events.GuildScheduledEventCreate,

	/**
	 * @param {GuildScheduledEvent} event
	 */

	async execute(event) {
		if (!config.channels.eventChannel) return;
		const eventLink = event.url;
		const eventChannel = await event.guild.channels.fetch(config.channels.eventChannel);

		eventChannel.send({ content: `${eventLink}` });
	},
};
