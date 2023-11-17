// prettier-ignore
module.exports = {
	handlers: {
		langSuccess: (loadedLangsCount) => `➤ Erfolgreich ${loadedLangsCount} Sprachen geladen!`,
		eventSuccess: (loadedEvents) => `➤ Erfolgreich ${loadedEvents} Event${loadedEvents !== 1 ? 's' : ''} geladen!`,
		commandError: (file) => `[WARNUNG] Dem Befehl ${file} fehlen die gebrauchten "data" oder "execute" anhänge.`,
		commandSuccess: (loadedCommands) => `➤ Erfolgreich ${loadedCommands} Befehl${loadedCommands !== 1 ? 'e' : ''} geladen!`,
	},
};
