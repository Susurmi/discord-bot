const { Events, CommandInteraction, Collection } = require('discord.js');
const colors = require('colors');

module.exports = {
	name: Events.InteractionCreate,

	/**
	 * @param {CommandInteraction} interaction
	 */

	async execute(interaction) {
		const { client, locale } = interaction;
		const { data: text } = client.text.find((obj) => obj.lang === locale.substring(0, 2) || 'en');
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(colors.red(text.interactionCreate.commandNotFound(interaction.commandName)));
			return;
		}

		const { cooldowns } = client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 5;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				return interaction.reply({
					content: text.interactionCreate.cooldownTimeout(command.data.name, expiredTimestamp),
					ephemeral: true,
				});
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(colors.red(text.interactionCreate.commandError(interaction.commandName)));
			console.error(error);
		}
	},
};
