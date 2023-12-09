// prettier-ignore
module.exports = {
	handlers: {
		langSuccess: (loadedLangsCount) => `➤ Successfully loaded ${loadedLangsCount} languages!`,
		eventSuccess: (loadedEvents) => `➤ Successfully loaded ${loadedEvents} Event${loadedEvents !== 1 ? 's' : ''} !`,
		commandError: (file) => `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`,
		commandSuccess: (loadedCommands) => `➤ Successfully loaded ${loadedCommands} Command${loadedCommands !== 1 ? 's' : ''} !`,
	},
	features: {
		auditLogStart: '➤ Successfully started the Audit log feature!'
	},
	ready: {
		success: (username) => `➤ Ready! Logged in as ${username}(BOT).`
	},
	interactionCreate: {
		commandNotFound: (commandName) => `No command matching ${commandName} was found.`,
		cooldownTimeout: (commandName, timestamp) => `Please wait, you are on a cooldown for \`${commandName}\`. You can use it again <t:${timestamp}:R>.`,
		commandError: (commandName) => `Error executing ${commandName}`
	},
	presence: {
		success: (newStatus) => `Successfully updated bot presence to:\n**${newStatus}** !`
	}
};
