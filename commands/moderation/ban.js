const { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const colors = require('colors');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user from this server.')
		.setDescriptionLocalizations({
			de: 'Einen Nutzer vom Server bannen.',
		})
		.addUserOption((option) => option.setName('target-user').setDescription('The user you want to ban').setRequired(true))
		.addStringOption((option) => option.setName('reason').setDescription('The reason you want to ban this user.'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	/**
	 * @param {CommandInteraction} interaction - The command interaction
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
			await interaction.editReply("You cant ban that user because they're the server owner.");
			return;
		}

		const targetUserRolePosition = targetUser.roles.highest.position;
		const requestUserRolePosition = interaction.member.roles.highest.position;

		if (targetUserRolePosition >= requestUserRolePosition) {
			await interaction.editReply("You can't ban this user because the have the same/higher role than you.");
			return;
		}

		if (!targetUser.bannable) {
			await interaction.editReply("This is user can't be banned by the bot.");
			return;
		}

		try {
			await targetUser.ban({ deleteMessageSeconds: 60 * 60 * 24, reason: reason }).catch(console.error);
			await interaction.editReply(`User ${targetUser} was banned\nReason: ${reason}`);
		} catch (error) {
			console.error(colors.red(error));
		}
	},
};
