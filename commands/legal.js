const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
  message.channel.send('This bot is extremely legal');
}

module.exports.help = {
  name:"legal"
}