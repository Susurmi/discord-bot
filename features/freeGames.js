const { Client, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const configs = require('../json/config.json');
const colors = require('colors');

/**
 * @param {Client} client
 */

module.exports = (client) => {
	const sentGames = [];
	/**
	 * @returns {Array}
	 */
	const fetchPosts = async () => {
		try {
			const res = await axios
				.get('https://reddit.com/r/gamedeals/new.json?sort=new&t=week&limit=30')
				.catch((error) => {
					client.logger.error(error);
					return null;
				});
			if (!res.data.data) {
				return null;
			} else if (!res.data.data.children || res.data.data.children <= 0) {
				return null;
			}
			return res.data;
		} catch (err) {
			client.logger.error(err);
		}
	};

	/**
	 *
	 * @param {string} channel
	 * @param {string} guild
	 * @param {Array} post
	 */
	const getCurrentGames = async (channel, guild, post) => {
		const clientGuild = await client.guilds.fetch(guild);
		const clientChannel = await clientGuild.channels.fetch(channel);
		post = post.data.children;
		for (let i = 0; i < 25; i++) {
			if (
				post[i].data.title.includes('free') ||
				post[i].data.title.includes('Free') ||
				post[i].data.title.includes('100%')
			) {
				if (post[i].data.ups > 100) {
					let title = post[i].data.title.toLowerCase();
					if (title.length > 256) {
						title = title.substring(0, 256);
					}

					const embedMsg = new EmbedBuilder()
						.setColor('Random')
						.setTitle(post[i].data.title)
						.setURL(`https://www.reddit.com${post[i].data.permalink}`)
						.setDescription(`Claim **free** game here: \n${post[i].data.url}`);

					if (title.includes('steam')) {
						embedMsg.setThumbnail(
							'https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016',
						);
					} else if (title.includes('epic')) {
						embedMsg.setThumbnail(
							'https://cdn2.unrealengine.com/Epic+Games+Node%2Fxlarge_whitetext_blackback_epiclogo_504x512_1529964470588-503x512-ac795e81c54b27aaa2e196456dd307bfe4ca3ca4.jpg',
						);
					} else if (title.includes('gog')) {
						embedMsg.setThumbnail(
							'https://images.gog-statics.com/844bac20026bcb6faf3d308fe9ad38365b3df6d1b5c4b74d0db309b426c997c5.jpg',
						);
					} else if (title.includes('xbox')) {
						embedMsg.setThumbnail(
							'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Xbox_logo_%282019%29.svg/1280px-Xbox_logo_%282019%29.svg.png',
						);
					} else if (title.includes('playstation')) {
						embedMsg.setThumbnail(
							'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/2560px-PlayStation_logo.svg.png',
						);
					} else if (title.includes('indiegala')) {
						embedMsg.setThumbnail(
							'https://company.indiegala.com/wp-content/uploads/2021/09/indiegala-logo-light-back-rgb.png',
						);
					} else if (title.includes('itch')) {
						embedMsg.setThumbnail(
							'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Itch.io_logo.svg/2560px-Itch.io_logo.svg.png',
						);
					} else if (title.includes('fanatical')) {
						embedMsg.setThumbnail(
							'https://cdn.wccftech.com/wp-content/uploads/2017/11/Fanatical-Logo-768x432.jpg',
						);
					}

					if (sentGames.indexOf(`${post[i].data.permalink}${clientChannel}`) === -1) {
						sentGames.push(`${post[i].data.permalink}${clientChannel}`);
						await clientChannel.send({ embeds: [embedMsg] });
					}
				}
			}
		}
	};

	const fetchGames = async () => {
		try {
			if (!configs.channels.freeGamesChannel) {
				return console.log(
					colors.yellow(
						'Please provide a channel id for the free games feature in the configj.json file.',
					),
				);
			}

			const posts = fetchPosts();
			getCurrentGames(configs.channels.freeGamesChannel, configs.guildid, posts);
		} catch (error) {
			console.log(error);
		}
	};

	setInterval(() => {
		fetchGames();

		if (sentGames.length > 1000000) {
			sentGames.splice(0, sentGames.length - 250000);
		}
	}, 1000 * 60 * 60);
};
