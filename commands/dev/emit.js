const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction } = require('discord.js');
const colors = require('colors');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emit')
		.setDescription('Trigger a client event.')
		.setDescriptionLocalizations({
			de: 'Simuliert ein Bot Event.',
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption((option) =>
			option
				.setName('event')
				.setDescription('event to emit.')
				.setDescriptionLocalizations({
					de: 'event das simuliert werden soll.',
				})
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
			interaction.editReply(`Emitted the ${option} event.`);
		} catch (error) {
			console.error(colors.red(error));
		}
	},
};
