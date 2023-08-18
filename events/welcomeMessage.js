const { Events, GuildMember, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,

	/**
	 * @param {GuildMember} member
	 */

	async execute(member) {
		// fetches the system channel defined in the server settings.
		const systemChannel = await member.guild.channels.fetch(member.guild.systemChannel.id);

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
			systemChannel.send({ embeds: [welcomeEmbed] });
		} catch (error) {
			console.error(error);
		}
	},
};
