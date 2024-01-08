const axios = require('axios');
const configs = require('../json/config.json');
const colors = require('colors');

module.exports = (client) => {
	if (!configs.channels.memesChannel) {
		return console.log(
			colors.yellow('Please provide a channel id for the memes feature in the configj.json file.'),
		);
	}
	const sendMeme = async () => {
		const clientGuild = await client.guilds.fetch(configs.guildid);
		const clientChannel = await clientGuild.channels.fetch(configs.channels.memesChannel);
		const apiUrl = 'https://meme-api.com/gimme';

		axios
			.get(apiUrl)
			.then((res) => {
				clientChannel.send(`${res.data.url}`);
			})
			.catch((error) => {
				console.error('Error during GET request:', error.message);
			});
	};

	setInterval(() => {
		sendMeme();
	}, 1000 * 60);
};
