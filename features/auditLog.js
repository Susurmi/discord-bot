const { Client, Events, EmbedBuilder } = require('discord.js');
const colors = require('colors');
const configs = require('../json/config.json');

/**
 * @param {Client} client
 */

module.exports = (client) => {
	const { data: text } = client.text.find((obj) => obj.lang === configs.lang || 'en');
	console.log(colors.green(text.features.auditLogStart));
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

			logChannel.send({ embeds: [embed.setTimestamp()] });
		} catch (error) {
			console.error(error);
		}
	};

	// Member Joined
	client.on(Events.GuildMemberAdd, (member) => {
		const embed = new EmbedBuilder()
			.setTitle('User Joined')
			.setColor('Green')
			.setDescription(`Member: ${member.user.username} (\`${member.user.id}\`)`);

		return sendLog(member.guild.id, embed);
	});

	// Member Left
	client.on(Events.GuildMemberRemove, (member) => {
		const embed = new EmbedBuilder()
			.setTitle('User Left')
			.setColor('Red')
			.setDescription(`Member: ${member.user.username} (\`${member.user.id}\`)`);

		return sendLog(member.guild.id, embed);
	});

	// Message Deleted
	client.on(Events.MessageDelete, (message) => {
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
			);

		return sendLog(message.guild.id, embed);
	});

	// Message Edited/Updated
	client.on(Events.MessageUpdate, (oldContent, newContent) => {
		if (oldContent.author.bot) return;
		if (oldContent.content === newContent.content) return;
		const embed = new EmbedBuilder()
			.setTitle('Message Edited')
			.setColor('Grey')
			.setDescription(
				`Message Edited from \n\`${oldContent}\`\n to \n\`${newContent}\` by ${newContent.author}`,
			);

		return sendLog(newContent.guild.id, embed);
	});

	// Channel Created
	client.on(Events.ChannelCreate, (channel) => {
		const embed = new EmbedBuilder()
			.setTitle('Channel Created')
			.setColor('Green')
			.setDescription(`${channel.name} has been created.`);

		return sendLog(channel.guild.id, embed);
	});

	// Channel Deleted
	client.on(Events.ChannelDelete, (channel) => {
		const embed = new EmbedBuilder()
			.setTitle('Channel Deleted')
			.setColor('Red')
			.setDescription(`${channel.name} has been deleted.`);

		return sendLog(channel.guild.id, embed);
	});
};
