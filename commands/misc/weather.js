require('dotenv').config({ path: '../../.env' });
const { SlashCommandBuilder, EmbedBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const colors = require('colors');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setNameLocalizations({
			de: 'wetter',
		})
		.setDescription('posts current weather information of the provided city.')
		.setDescriptionLocalizations({
			de: 'Erstellt einen aktuellen Wetterbericht für die angegebene Stadt.',
		})
		.addStringOption((option) =>
			option
				.setName('city')
				.setNameLocalizations({
					de: 'stadt',
				})
				.setDescription('provid a city name, that you want to know the weather of.')
				.setDescriptionLocalizations({
					de: 'Einen Städte Namen eingeben von der du den Wetterbericht sehen möchtest.',
				})
				.setRequired(true),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),

	cooldown: 30,

	/**
	 * @param {CommandInteraction} interaction - The command interaction
	 */
	async execute(interaction) {
		const degToText = (degree) => {
			if (degree > 337.5) return 'Northerly ⬆';
			if (degree > 292.5) return 'North Westerly ↖';
			if (degree > 247.5) return 'Westerly ⬅';
			if (degree > 202.5) return 'South Westerly ↙';
			if (degree > 157.5) return 'Southerly ⬇';
			if (degree > 122.5) return 'South Easterly ↘';
			if (degree > 67.5) return 'Easterly ➡';
			if (degree > 22.5) {
				return 'North Easterly ↗';
			}
			return 'Northerly ⬆';
		};
		const deUmlaut = (word) => {
			word = word.replace(/ä/g, 'ae');
			word = word.replace(/ö/g, 'oe');
			word = word.replace(/ü/g, 'ue');
			word = word.replace(/ß/g, 'ss');
			return word;
		};

		const city = deUmlaut(interaction.options.getString('city'));
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
		axios({
			method: 'get',
			url: apiUrl,
		})
			.then(async (response) => {
				const embed = new EmbedBuilder()
					.setTitle(`Weather in **${response.data.name}**`)
					.setColor('Default')
					.setThumbnail(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
					.addFields(
						{
							name: 'Degrees',
							value: `${Math.floor(response.data.main.temp)}°C`,
							inline: true,
						},
						{
							name: 'Weather',
							value: `${response.data.weather[0].main}`,
							inline: true,
						},
						{
							name: 'Humidity',
							value: `${response.data.main.humidity}%`,
							inline: true,
						},
					)
					.addFields(
						{
							name: 'Wind Speed',
							value: `${response.data.wind.speed} meter/sec`,
							inline: true,
						},
						{
							name: 'Wind Direction',
							value: `${degToText(response.data.wind.deg)}`,
							inline: true,
						},
						{
							name: 'Measured',
							value: `<t:${response.data.dt}:F>`,
							inline: true,
						},
					);
				await interaction.reply({ embeds: [embed] });
			})
			.catch((error) => {
				console.error(colors.red(error));
			});
	},
};
