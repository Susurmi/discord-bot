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

	// Message Deleted
	client.on('messageDelete', (message) => {
		if (message.author.bot) return;

		const embed = new EmbedBuilder()
			.setTitle('Message Deleted')
			.setColor('Red')
			.setDescription(
				`
			**Author : ** <@${message.author.id}> - *${message.author.tag}*
			**Date : ** ${message.createdAt}
			**Channel : ** <#${message.channel.id}> - *${message.channel.name}*
			**Deleted Message : **\`${message.content.replace(/`/g, "'")}\``,
			)
			.setTimestamp();

		return sendLog(message.guild.id, embed);
	});

	// Message Pinned
	client.on('messagePinned', (message) => {
		const embed = new EmbedBuilder()
			.setTitle('Message Pinned')
			.setColor('Grey')
			.setDescription(`${message} has been pinned by ${message.author}`)
			.setTimestamp();

		return sendLog(message.guild.id, embed);
	});

	// Message Edited
	client.on('messageContentEdited', (message, oldContent, newContent) => {
		const embed = new EmbedBuilder()
			.setTitle('Message Edited')
			.setColor('Grey')
			.setDescription(
				`Message Edited from \`${oldContent}\` to \`${newContent}\` by ${message.author}`,
			)
			.setTimestamp();

		return sendLog(message.guild.id, embed);
	});

	// Channel Created
	client.on('channelCreate', (channel) => {
		const embed = new EmbedBuilder()
			.setTitle('Channel Created')
			.setColor('Green')
			.setDescription(`${channel.name} has been created.`)
			.setTimestamp();

		return sendLog(channel.guild.id, embed);
	});

	// Channel Deleted
	client.on('channelDelete', (channel) => {
		const embed = new EmbedBuilder()
			.setTitle('Channel Deleted')
			.setColor('Red')
			.setDescription(`${channel.name} has been deleted.`)
			.setTimestamp();

		return sendLog(channel.guild.id, embed);
	});
};
