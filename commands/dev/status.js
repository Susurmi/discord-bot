const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
	CommandInteraction,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Shows client status information!')
		.setDescriptionLocalizations({
			de: 'Zeigt den akuellen Status des Bots an.',
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	/**
	 * @param {CommandInteraction} interaction
	 */

	async execute(interaction) {
		await interaction.deferReply();

		try {
			const reply = await interaction.fetchReply();

			const icon = interaction.client.user.displayAvatarURL();

			const ping = reply.createdTimestamp - interaction.createdTimestamp;

			// Create Bot Uptime String
			const totalSecondsUptime = Math.floor(interaction.client.uptime / 1000);
			const days = Math.floor(totalSecondsUptime / 86400);
			const hours = Math.floor((totalSecondsUptime % 86400) / 3600);
			const minutes = Math.floor((totalSecondsUptime % 3600) / 60);
			const seconds = totalSecondsUptime % 60;
			let uptimeString = '';

			if (days > 0) {
				uptimeString += `${days} day${days !== 1 ? 's' : ''} `;
			}
			if (hours > 0) {
				uptimeString += `${hours} hour${hours !== 1 ? 's' : ''} `;
			}
			if (minutes > 0) {
				uptimeString += `${minutes} minute${minutes !== 1 ? 's' : ''} `;
			}
			if (seconds > 0 || uptimeString === '') {
				uptimeString += `${seconds} second${seconds !== 1 ? 's' : ''} `;
			}

			const statusEmbed = new EmbedBuilder()
				.setAuthor({ name: `${interaction.client.user.username}'s Status`, iconURL: icon })
				.setThumbnail(`${icon}`)
				.setColor('Random')
				.addFields({ name: 'Client Latency', value: `${ping}ms`, inline: true })
				.addFields({
					name: 'WebSocket Latency',
					value: `${interaction.client.ws.ping}ms`,
					inline: true,
				})
				.addFields({ name: 'Uptime', value: `${uptimeString}` })
				.setFooter({ text: `Bot ID: ${interaction.client.application.id}` })
				.setTimestamp();

			interaction.editReply({ embeds: [statusEmbed] });
		} catch (error) {
			console.error(error);
		}
	},
};
