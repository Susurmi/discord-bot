const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
	ActivityType,
	CommandInteraction,
} = require('discord.js');
const colors = require('colors');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('presence')
		.setNameLocalizations({
			de: 'präsenz',
		})
		.setDescription('Update the bot presence.')
		.setDescriptionLocalizations({
			de: 'Passe die Präsenz des Bots. ',
		})
		.addStringOption((option) =>
			option
				.setName('text')
				.setNameLocalizations({
					de: 'text',
				})
				.setDescription('the text underneath the bot name.')
				.setDescriptionLocalizations({
					de: 'der text unter dem bot namen.',
				})
				.setRequired(true),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	/**
	 * @param {CommandInteraction} interaction
	 */

	async execute(interaction) {
		const { options } = interaction;

		const stringOption = options.getString('text');

		try {
			interaction.client.user.setActivity({
				type: ActivityType.Custom,
				name: 'bot-status',
				state: stringOption,
			});

			const reply = new EmbedBuilder();

			return interaction.reply({
				embeds: [
					reply.setDescription(`Successfully updated bot presence to:\n**${stringOption}** !`),
				],
				ephemeral: true,
			});
		} catch (error) {
			console.error(colors.red(error));
		}
	},
};
