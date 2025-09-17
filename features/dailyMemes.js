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
	const { data: text } = client.text.find((obj) => obj.lang === configs.lang || 'en');

	if (!configs.channels.memesChannel) {
		return console.log(colors.yellow(text.features.dailyMemeMissingChannel));
	}

	/**
	 * Fetches a meme from the meme API and sends it to the specified Discord channel.
	 * @async
	 * @returns {Promise<void>} - A Promise that resolves when the meme is sent, or rejects if an error occurs.
	 */
	const sendMeme = async () => {
		try {
			const clientGuild = await client.guilds.fetch(configs.guildid);
			const clientChannel = await clientGuild.channels.fetch(configs.channels.memesChannel);
			const apiUrl = 'https://meme-api.com/gimme';

			const response = await axios.get(apiUrl);
			await clientChannel.send(`${response.data.url}`);
			console.log(colors.green('Meme sent successfully'));
		} catch (error) {
			console.error('Error during meme send:', error.message);
		}
	};

	// Get meme times from config, default to [8, 20] if not specified
	const memeTimes = configs.memes?.times || [8, 20];

	// Sort times to ensure proper ordering
	const sortedMemeTimes = [...memeTimes].sort((a, b) => a - b);

	// Store timeout reference to prevent multiple instances
	let memeTimeout = null;

	// Function to calculate time until next scheduled meme time
	const getNextMemeTime = () => {
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		const currentMinute = currentTime.getMinutes();
		const nextTime = new Date(currentTime);

		// Find the next meme time
		let nextMemeHour = null;

		// Check if there's a meme time later today
		// Use <= to handle the exact hour case properly
		for (const hour of sortedMemeTimes) {
			if (currentHour < hour || (currentHour === hour && currentMinute < 1)) {
				nextMemeHour = hour;
				break;
			}
		}

		if (nextMemeHour !== null) {
			// Next meme time is today
			nextTime.setHours(nextMemeHour, 0, 0, 0);
		} else {
			// Next meme time is tomorrow at the first scheduled hour
			nextTime.setDate(currentTime.getDate() + 1);
			nextTime.setHours(sortedMemeTimes[0], 0, 0, 0);
		}

		return nextTime.getTime() - currentTime.getTime();
	};

	// Function to schedule the next meme
	const scheduleNextMeme = () => {
		// Clear any existing timeout to prevent duplicates
		if (memeTimeout) {
			clearTimeout(memeTimeout);
		}

		const timeDiff = getNextMemeTime();
		console.log(colors.yellow(text.features.dailyMemeStart(Math.floor(timeDiff / 1000 / 60))));

		memeTimeout = setTimeout(() => {
			sendMeme();
			scheduleNextMeme(); // Schedule the next one after sending
		}, timeDiff);
	};

	// Start the scheduling
	scheduleNextMeme();
};
