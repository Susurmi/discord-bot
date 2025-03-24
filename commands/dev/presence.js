const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActivityType, CommandInteraction } = require('discord.js');

const colors = require('colors');
const fs = require('fs');
const path = require('path');

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
		const { data: text } = interaction.client.text.find((obj) => obj.lang === interaction.locale);
		const { options } = interaction;

		const stringOption = options.getString('text');

		const configPath = path.join(__dirname, '../../json/config.json');
		const config = require(configPath);
		if (stringOption !== config.bot.status) {
			config.bot.status = stringOption;
			fs.writeFile(configPath, JSON.stringify(config, null, 2), function writeJSON(err) {
				if (err) return console.log(err);
			});
		}

		try {
			interaction.client.user.setActivity({
				type: ActivityType.Custom,
				name: 'bot-status',
				state: stringOption,
			});

			const reply = new EmbedBuilder();

			return interaction.reply({
				embeds: [reply.setDescription(text.presence.success(stringOption))],
				ephemeral: true,
			});
		} catch (error) {
			console.error(colors.red(error));
		}
	},
};
