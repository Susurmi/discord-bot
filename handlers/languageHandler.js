const getFiles = require('../utils/getFiles');
const { Client } = require('discord.js');
const colors = require('colors');
const configs = require('../json/config.json');

/**
 *
 * @param {Array} foldername
 * @param {Client} bot
 */

module.exports = (folderPath, bot) => {
	const eventFiles = getFiles(folderPath);

	eventFiles.forEach((file) => {
		const languageCodeMatch = file.match(/lang\.([a-zA-Z]+)\.js/);
		if (languageCodeMatch && languageCodeMatch[1]) {
			const languageCode = languageCodeMatch[1];
			const event = require(file);
			bot.text.push({
				lang: languageCode,
				data: event,
			});
		} else {
			console.error(`Invalid filename format in ${file}`);
		}
	});

	const text = bot.text.find((obj) => obj.lang === configs.lang || 'en');

	console.log(colors.green(text.data.handlers.langSuccess(bot.text.length)));
};
