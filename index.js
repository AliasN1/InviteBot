const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

const config = require('./config.json');
const token = process.env['token']
const mongoose = require('mongoose');
const mongodb_srv = process.env['mongodb_serv']

const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

/*['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(bot, Discord)
})*/

fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split('.').pop() === 'js');
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

//Playing Message
bot.on('ready', async () => {
  console.log(
    `${bot.user.username} is online on ${bot.guilds.cache.size} servers!`
  );

  bot.user.setActivity('Sorting Scams', { type: 'PLAYING' });
});

//Command Manager
bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;

  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //Check for prefix
  if (!cmd.startsWith(prefix)) return;

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
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
bot.login(token);
