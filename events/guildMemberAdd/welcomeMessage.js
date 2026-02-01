const { Events, GuildMember, EmbedBuilder } = require('discord.js');
const { roles } = require('../../json/config.json');
const colors = require('colors');
const configs = require('../../json/config.json');

module.exports = {
	name: Events.GuildMemberAdd,

	/**
	 * @param {GuildMember} member - The guild member that joined
	 */
	async execute(member) {
		const bot = member.client;
		const { data: text } = bot.text.find((obj) => obj.lang === configs.lang || 'en');
		// fetches the system channel defined in the server settings.
		const systemChannel = await member.guild.channels.fetch(member.guild.systemChannel.id);
		const userRoleId = roles.welcomeRole;

		const welcomeEmbed = new EmbedBuilder()
			.setColor('Random')
			.setAuthor({
				name: member.user.username,
				iconURL: `${member.user.avatarURL({})}`,
			})
			.setThumbnail(member.user.avatarURL({ dynamic: true, size: 512 }))
			.setTitle(text.welcomeMessage.title(member))
			.setDescription(text.welcomeMessage.description(member))
			.setFooter({ text: text.welcomeMessage.footer(member) })
			.setTimestamp();

		try {
			if (userRoleId) {
				const basicUserRole = await member.guild.roles.fetch(userRoleId);
				member.roles.add(basicUserRole);
			}
			systemChannel.send({ embeds: [welcomeEmbed] });
		} catch (error) {
			console.error(colors.red(error));
		}
	},
};
