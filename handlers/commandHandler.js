const getFiles = require('../utils/getFiles');
const { Client } = require('discord.js');
/**
 *
 * @param {Array} foldername
 * @param {Client} bot
 */

module.exports = (folderPath, bot) => {
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
				console.log(
					`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`,
				);
			}
		});
	});

	console.log(`Successfully loaded ${loadedCommands} Command${loadedCommands !== 1 ? 's' : ''} !`);
};
