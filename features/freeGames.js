const { Client, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const configs = require('../json/config.json');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

/**
 * @param {Client} client
 * @returns {void}
 */

module.exports = (client) => {
	const sentGamesList = path.join(__dirname, '../json/freeGames.json');
	let gamesList = [];
	if (fs.existsSync(sentGamesList)) gamesList = JSON.parse(fs.readFileSync(sentGamesList, 'utf8'));

	const isObjectEqual = (obj1, obj2) => {
		return obj1.id === obj2.id;
	};

	/**
	 * @param {string} channel
	 * @param {string} guild
	 */

	const getCurrentGames = async (channel, guild) => {
		const clientGuild = await client.guilds.fetch(guild);
		const clientChannel = await clientGuild.channels.fetch(channel);
		const apiUrl = 'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions';

		axios
			.get(apiUrl, {
				params: { country: 'DE', locale: 'de' },
				headers: { 'Access-Control-Allow-Origin': '*' },
			})
			.then((res) => {
				const { elements: Games } = res.data.data.Catalog.searchStore;
				Games.forEach((element) => {
					const releaseDate = new Date(element.effectiveDate);
					const currentDate = new Date();
					if (element.status !== 'ACTIVE' || releaseDate > currentDate) return;
					if (!gamesList.some((obj) => isObjectEqual(obj, element))) {
						gamesList.push(element);

						if (gamesList.length > 10) {
							gamesList.splice(0, gamesList.length - 10);
						}

						fs.writeFile(sentGamesList, JSON.stringify(gamesList, null, 2), (err) => {
							if (err) {
								console.error('Error writing JSON file:', err);
							}
						});

						const embed = new EmbedBuilder()
							.setTitle(element.title)
							.setURL(`https://store.epicgames.com/de/p/${element.offerMappings[0].pageSlug}`)
							.setThumbnail(
								'https://logodownload.org/wp-content/uploads/2020/10/epic-games-logo-0.png',
							)
							.setDescription(
								`Claim ${element.title} for **free** in the [EPIC Games Store](https://store.epicgames.com/de/p/${element.offerMappings[0].pageSlug}).`,
							)
							.setImage(element.keyImages[0].url);

						clientChannel.send({ embeds: [embed] });
					}
				});
			})
			.catch((error) => {
				console.error('Error during GET request:', error.message);
			});
	};

	const currentTime = new Date();
	const targetTime = new Date(currentTime);
	targetTime.setHours(19, 0, 0, 0);
	const timeDiff = targetTime.getTime() - currentTime.getTime();

	console.log(
		colors.yellow(
			`➤ Waiting for ${Math.floor(
				timeDiff / 1000 / 60,
			)} minutes until 7:00 PM (17:00) to start 24 hour cycle of the meme feature.`,
		),
	);

	setTimeout(() => {
		if (!configs.channels.freeGamesChannel) {
			return console.log(
				colors.yellow(
					'Please provide a channel id for the free games feature in the configj.json file.',
				),
			);
		}
		setInterval(() => {
			getCurrentGames(configs.channels.freeGamesChannel, configs.guildid);
		}, 1000 * 60 * 60 * 24);
	}, timeDiff);
};
