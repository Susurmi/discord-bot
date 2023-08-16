const { SlashCommandBuilder, Interaction, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Shows client and websocket ping!')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	/**
	 * @param {Interaction} interaction
	 */

	async execute(interaction, client) {
		await interaction.deferReply();

		try {
			const reply = await interaction.fetchReply();

			const ping = reply.createdTimestamp - interaction.createdTimestamp;

			interaction.editReply(`Pong! Client ${ping}ms || Websocket: ${interaction.client.ws.ping}ms`);
		} catch (error) {
			console.error(error);
		}
	},
};
