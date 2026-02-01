const { PermissionFlagsBits, SlashCommandBuilder, CommandInteraction } = require('discord.js');
const colors = require('colors');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a member on this server.')
		.setDescriptionLocalizations({
			de: 'Einen Nutzer vom Server muten.',
		})
		.addUserOption((option) => option.setName('target-user').setDescription('The user you want to timeout ').setRequired(true))
		.addStringOption((option) => option.setName('reason').setDescription('The reason you want to timeout this user.'))
		.addIntegerOption((option) => option.setName('time').setDescription('The amount of time you want to mute the user for.'))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

	/**
	 * @param {CommandInteraction} interaction - The command interaction
	 */
	async execute(interaction) {
		const targetUserId = await interaction.options.getUser('target-user');
		const reason = interaction.options.getString('reason') ?? 'No reason was provided.';
		const time = interaction.options.getInteger('time') ?? 60;

		await interaction.deferReply();

		const targetUser = await interaction.guild.members.fetch(targetUserId.id);

		if (!targetUser) {
			await interaction.editReply("That user doesn't exist in this server.");
			return;
		}

		if (targetUser.id === interaction.guild.ownerId) {
			await interaction.editReply("You cant mute that user because they're the server owner.");
			return;
		}

		try {
			await targetUser.timeout(time * 60 * 1000, reason).catch(console.error);
			await interaction.editReply(`User ${targetUser} was timed out\nReason: ${reason}`);
		} catch (error) {
			console.error(colors.red(error));
		}
	},
};
