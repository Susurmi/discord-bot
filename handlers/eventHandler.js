const path = require('path');
const fs = require('fs');

module.exports = (foldername, bot) => {
	const eventsPath = path.join(__dirname, '/..', foldername);
	const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
	let loadedEvents = 0;

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(...args));
			loadedEvents++;
		} else {
			bot.on(event.name, (...args) => event.execute(...args));
			loadedEvents++;
		}
	}

	console.log(`Successfully loaded ${loadedEvents} Event${loadedEvents !== 1 ? 's' : ''} !`);
};
