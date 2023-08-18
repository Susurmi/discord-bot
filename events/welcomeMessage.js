const { Events, GuildMember, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,

	/**
	 * @param {GuildMember} member
	 */

	async execute(member) {
		const welcomeChannel = member.guild.channels.fetch(process.env.GUILD_ID);

		const welcomeEmbed = new EmbedBuilder()
			.setColor('Random')
			.setAuthor({
				name: member.user.username,
				iconURL: `${member.user.avatarURL({})}`,
			})
			.setThumbnail(member.user.avatarURL({ dynamic: true, size: 512 }))
			.setDescription(
				`Welcome ${member.user.username} to the **${member.guild.name}** Server! \n Latest Member Count: **${member.guild.memberCount}**`,
			)
			.setTimestamp();

		try {
			welcomeChannel.send({ embeds: [welcomeEmbed] });
		} catch (error) {
			console.error(error);
		}
	},
};
