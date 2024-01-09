const axios = require('axios');
const configs = require('../json/config.json');
const colors = require('colors');
const { Client } = require('discord.js');

/**
 * A module that periodically sends memes to a specified Discord channel.
 * @param {Client} client - The Discord.js client instance.
 * @returns {void} - This function does not return a value.
 */
module.exports = (client) => {
	if (!configs.channels.memesChannel) {
		return console.log(
			colors.yellow('Please provide a channel id for the memes feature in the configj.json file.'),
		);
	}
	/**
	 * Fetches a meme from the meme API and sends it to the specified Discord channel.
	 * @async
	 * @returns {Promise<void>} - A Promise that resolves when the meme is sent, or rejects if an error occurs.
	 */
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
	// Set up an interval to periodically send memes (every 12 hours in this case).
	setInterval(() => {
		sendMeme();
	}, 1000 * 60 * 60 * 12);
};
