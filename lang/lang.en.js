// prettier-ignore
module.exports = {
	handlers: {
		langSuccess: (loadedLangsCount) => `➤ Successfully loaded ${loadedLangsCount} languages!`,
		eventSuccess: (loadedEvents) => `➤ Successfully loaded ${loadedEvents} Event${loadedEvents !== 1 ? 's' : ''} !`,
		commandError: (file) => `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`,
		commandSuccess: (loadedCommands) => `➤ Successfully loaded ${loadedCommands} Command${loadedCommands !== 1 ? 's' : ''} !`,
		featureSuccess: (loadedFeatures) => `➤ Successfully loaded ${loadedFeatures} Feature${loadedFeatures !== 1 ? 's' : ''} !`
	},
	features: {
		auditLogStart: '➤ Successfully started the Audit log feature!',
		dailyMemeStart: (time) =>  `➤ Waiting for ${time} minutes until 8:00 PM (20:00) to start 12 hour cycle of the meme feature.`,
		dailyMemeMissingChannel: 'Please provide a channel id for the memes feature in the configj.json file.'
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
	},
	welcomeMessage: {
		title: (member) => `🎉 Welcome to the ${member.guild.name} Server!`,
		description: (member) => `Hey ${member.user.username} welcome to the **${member.guild.name}** Server! \n Enjoy your stay here and have fun!`,
		footer: (member) => `Latest Member Count: ${member.guild.memberCount}`
	}
};
