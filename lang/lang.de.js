// prettier-ignore
module.exports = {
	handlers: {
		eventSuccess: `➤ Successfully loaded ${loadedEvents} Event${loadedEvents !== 1 ? 's' : ''} !`,
		commandError: `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`,
		commandSuccess: `➤ Successfully loaded ${loadedCommands} Command${loadedCommands !== 1 ? 's' : ''} !`,
	},
};
