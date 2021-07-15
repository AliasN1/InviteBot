const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env['TOKEN']
const prefix = '-';
const fs = require('fs');
const mongoose = require('mongoose');
const mongodb_srv = process.env['mongodb_serv']


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})
//Playing Message
client.on('ready', async () => {
  console.log(
    `${client.user.username} is online on ${client.guilds.cache.size} servers!`
  );

  client.user.setActivity('Sorting Scams', { type: 'PLAYING' });
});

//Token need in token.json
mongoose.connect(mongodb_srv, {
  useNewUrlParser: true,
  useUnifedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to database!');
}).catch((err) => {
  console.log(err);
})
client.login(token);