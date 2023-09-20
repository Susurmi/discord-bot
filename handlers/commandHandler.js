const path = require('path');
const fs = require('fs');

module.exports = (foldername, bot) => {
	const foldersPath = path.join(__dirname, '/..', foldername);
	const commandFolders = fs.readdirSync(foldersPath);
	let loadedCommands = 0;

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				bot.commands.set(command.data.name, command);
				loadedCommands++;
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
				);
			}
		}
	}

	console.log(`Successfully loaded ${loadedCommands} Command${loadedCommands !== 1 ? 's' : ''} !`);
};
