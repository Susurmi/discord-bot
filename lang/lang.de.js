// prettier-ignore
module.exports = {
	handlers: {
		langSuccess: (loadedLangsCount) => `➤ Erfolgreich ${loadedLangsCount} Sprachen geladen!`,
		eventSuccess: (loadedEvents) => `➤ Erfolgreich ${loadedEvents} Event${loadedEvents !== 1 ? 's' : ''} geladen!`,
		commandError: (file) => `[WARNUNG] Dem Befehl ${file} fehlen die gebrauchten "data" oder "execute" anhänge.`,
		commandSuccess: (loadedCommands) => `➤ Erfolgreich ${loadedCommands} Befehl${loadedCommands !== 1 ? 'e' : ''} geladen!`,
	},
	ready: {
		success: (username) => `➤ Fertig! Eingeloggt als ${username}(BOT).`
	},
	interactionCreate: {
		commandNotFound: (commandName) => `Command ${commandName} wurde nicht gefunden.`,
		cooldownTimeout: (commandName, timestamp) => `Bitte warte noch <t:${timestamp}:R> bis du ${commandName} wieder nutzen kannst!`,
		commandError: (commandName) => `Error beim ausführen von ${commandName}`
	},
	presence: {
		success: (newStatus) => `Bot Status erfolgreich aktualisiert zu :\n**${newStatus}** !`
	}
};
