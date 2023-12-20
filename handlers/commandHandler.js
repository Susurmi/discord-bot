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
	const { data: text } = bot.text.find((obj) => obj.lang === configs.lang || 'en');
	const commandFolders = getFiles(folderPath, true);
	let loadedCommands = 0;

	commandFolders.forEach((folder) => {
		const commandFiles = getFiles(folder);

		commandFiles.forEach((file) => {
			const command = require(file);
			if ('data' in command && 'execute' in command) {
				bot.commands.set(command.data.name, command);
				loadedCommands++;
			} else {
				console.log(colors.red(text.handlers.commandError(file)));
			}
		});
	});

	console.log(colors.green(text.handlers.commandSuccess(loadedCommands)));
};
