const getFiles = require('../utils/getFiles');
const { Client } = require('discord.js');
const colors = require('colors');

/**
 *
 * @param {Array} foldername
 * @param {Client} bot
 */

module.exports = (folderPath, bot) => {
	const eventFiles = getFiles(folderPath);
	let loadedEvents = 0;

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

	console.log(
		colors.green(`➤ Successfully loaded ${loadedEvents} Event${loadedEvents !== 1 ? 's' : ''} !`),
	);
};
