// prettier-ignore
module.exports = {
	handlers: {
		langSuccess: (loadedLangsCount) => `➤ Successfully loaded ${loadedLangsCount} languages!`,
		eventSuccess: (loadedEvents) => `➤ Successfully loaded ${loadedEvents} Event${loadedEvents !== 1 ? 's' : ''} !`,
		commandError: (file) => `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`,
		commandSuccess: (loadedCommands) => `➤ Successfully loaded ${loadedCommands} Command${loadedCommands !== 1 ? 's' : ''} !`,
	},
	ready: {
		success: (username) => `➤ Ready! Logged in as ${username}(BOT).`
	}
};
