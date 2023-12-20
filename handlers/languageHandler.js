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
	const langFiles = getFiles(folderPath);

	langFiles.forEach((file) => {
		const languageCodeMatch = file.match(/lang\.([a-zA-Z]+)\.js/);
		if (languageCodeMatch && languageCodeMatch[1]) {
			const languageCode = languageCodeMatch[1];
			const lang = require(file);
			bot.text.push({
				lang: languageCode,
				data: lang,
			});
		} else {
			return console.error(`Invalid filename format in ${file}`);
		}
	});

	const { data: text } = bot.text.find((obj) => obj.lang === configs.lang || 'en');

	console.log(colors.green(text.handlers.langSuccess(bot.text.length)));
};
