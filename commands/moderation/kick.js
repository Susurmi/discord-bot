const { PermissionFlagsBits, SlashCommandBuilder, CommandInteraction } = require('discord.js');
const colors = require('colors');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a member from this serever.')
		.setDescriptionLocalizations({
			de: 'Einen Nutzer vom Server kicken.',
		})
		.addUserOption((option) =>
			option.setName('target-user').setDescription('The user you want to kick').setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('The reason you want to kick this user.'),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

	/**
	 *
	 * @param {CommandInteraction} interaction
	 */

	async execute(interaction) {
		const targetUserId = await interaction.options.getUser('target-user');
		const reason = interaction.options.getString('reason') ?? 'No reason was provided.';

		await interaction.deferReply();

		const targetUser = await interaction.guild.members.fetch(targetUserId.id);

		if (!targetUser) {
			await interaction.editReply("That user doesn't exist in this server.");
			return;
		}

		if (targetUser.id === interaction.guild.ownerId) {
			await interaction.editReply("You cant kick that user because they're the server owner.");
			return;
		}

		const targetUserRolePosition = targetUser.roles.highest.position;
		const requestUserRolePosition = interaction.member.roles.highest.position;

		if (targetUserRolePosition >= requestUserRolePosition) {
			await interaction.editReply(
				"You can't kick this user because the have the same/higher role than you.",
			);
			return;
		}

		if (!targetUser.kickable) {
			await interaction.editReply("This user can't be kicked by the bot.");
			return;
		}

		try {
			await targetUser.kick({ reason });
			await interaction.editReply(`User ${targetUser} was kicked\nReason: ${reason}`);
		} catch (error) {
			console.error(colors.red(error));
		}
	},
};
