const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emit')
		.setDescription('Trigger a client event.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption((option) =>
			option
				.setName('event')
				.setDescription('event to emit.')
				.setRequired(true)
				.addChoices(
					{ name: 'guildMemberAdd', value: 'guildMemberAdd' },
					{ name: 'guildMemberRemove', value: 'guildMemberRemove' },
				),
		),

	/**
	 * @param {CommandInteraction} interaction
	 */

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const option = interaction.options.getString('event');
		try {
			interaction.client.emit(option, interaction.member);
			interaction.editReply(`emitted the ${option} event.`);
		} catch (error) {
			console.error(error);
		}
	},
};
