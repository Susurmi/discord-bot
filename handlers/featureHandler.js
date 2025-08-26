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
	const { data: text } = bot.text.find((obj) => obj.lang === configs.lang) || bot.text.find((obj) => obj.lang === 'en') || { data: { handlers: { featureSuccess: () => 'Features loaded' } } };
	const featureFolders = getFiles(folderPath, false);
	let loadedFeatures = 0;

	featureFolders.forEach((file) => {
		const feature = require(file);

		try {
			feature(bot);
		} catch (error) {
			console.error(error);
		}

		loadedFeatures++;
	});

	console.log(colors.green(text.handlers.featureSuccess(loadedFeatures)));
};
