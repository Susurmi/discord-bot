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

  // Calculating difference between current time and the desired time,
  // if the desired time has already passed sets start to tomorrow
  const currentTime = new Date();
  const targetTime = new Date(currentTime);
  targetTime.setHours(20, 0, 0, 0);
  if (currentTime.getHours() >= targetTime.getHours()) {
    targetTime.setDate(currentTime.getDate() + 1);
  }
  const timeDiff = targetTime.getTime() - currentTime.getTime();

  console.log(colors.yellow(text.features.dailyMemeStart(Math.floor(timeDiff / 1000 / 60))));

  // starting 12h loop
  setTimeout(() => {
    sendMeme();
    setInterval(() => {
      sendMeme();
    }, 1000 * 60 * 60 * 12);
  }, timeDiff);
};
