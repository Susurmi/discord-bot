const { Client, Events, EmbedBuilder } = require('discord.js');
const colors = require('colors');
const configs = require('../json/config.json');

/**
 * @param {Client} client
 */

module.exports = (client) => {
	/**
	 * @param {string} guildId
	 * @param {object} embed
	 * @returns {console}
	 */

	const sendLog = async (guildId, embed) => {
		if (!configs.channels.logChannel) {
			return console.log(
				colors.yellow(
					'Please provide a log channel id in the config.json to use the auditlog feature.',
				),
			);
		}

		try {
			const guild = await client.guilds.fetch(guildId);
			const logChannel = await guild.channels.fetch(configs.channels.logChannel);

			logChannel.send({ embeds: [embed] });
		} catch (error) {
			console.error(error);
		}
	};

	// Member Joined
	client.on(Events.GuildMemberAdd, (member) => {
		const embed = new EmbedBuilder()
			.setTitle('User Joined')
			.setColor('Green')
			.setDescription(`Member: ${member.user} (\`${member.user.id}\`)`)
			.setTimestamp();

		return sendLog(member.guild.id, embed);
	});

	// Member Left
	client.on(Events.GuildMemberRemove, (member) => {
		const embed = new EmbedBuilder()
			.setTitle('User Left')
			.setColor('Red')
			.setDescription(`Member: ${member.user} (\`${member.user.id}\`)`)
			.setTimestamp();

		return sendLog(member.guild.id, embed);
	});
};
