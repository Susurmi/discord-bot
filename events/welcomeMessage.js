const { Events, GuildMember, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,

	/**
	 * @param {GuildMember} member
	 */

	async execute(member) {
		// fetches the system channel defined in the server settings.
		const systemChannel = await member.guild.channels.fetch(member.guild.systemChannel.id);
		const basicUserRole = await member.guild.roles.fetch(process.env.BASIC_USER_ROLE);

		const welcomeEmbed = new EmbedBuilder()
			.setColor('Random')
			.setAuthor({
				name: member.user.username,
				iconURL: `${member.user.avatarURL({})}`,
			})
			.setThumbnail(member.user.avatarURL({ dynamic: true, size: 512 }))
			.setTitle(`🎉 Welcome to the ${member.guild.name} Server!`)
			.setDescription(
				`Hey ${member.user.username} welcome to the **${member.guild.name}** Server! \n Enjoy your stay here and have fun!`,
			)
			.setFooter({ text: `Latest Member Count: ${member.guild.memberCount}` })
			.setTimestamp();

		try {
			member.roles.add(basicUserRole);
			systemChannel.send({ embeds: [welcomeEmbed] });
		} catch (error) {
			console.error(error);
		}
	},
};
