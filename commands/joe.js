const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
  message.channel.send('joe mama');
}

module.exports.help = {
  name:"joe"
}