const getFiles = require('../utils/getFiles');
const { Client } = require('discord.js');
const colors = require('colors');
const configs = require('../json/config.json');

/**
 *
 * @param {string} folderPath
 * @param {Client} bot
 */

module.exports = (folderPath, bot) => {
	const { data: text } = bot.text.find((obj) => obj.lang === configs.lang) ||
		bot.text.find((obj) => obj.lang === 'en') || { data: { handlers: { eventSuccess: () => 'Events loaded' } } };
	const eventFolders = getFiles(folderPath, true);
	let loadedEvents = 0;

	eventFolders.forEach((folder) => {
		const eventFiles = getFiles(folder);

		eventFiles.forEach((file) => {
			const event = require(file);
			if (event.once) {
				bot.once(event.name, (...args) => event.execute(...args));
				loadedEvents++;
			} else {
				bot.on(event.name, (...args) => event.execute(...args));
				loadedEvents++;
			}
		});
	});

	console.log(colors.green(text.handlers.eventSuccess(loadedEvents)));
};
