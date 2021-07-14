const config = require('../../config.json');
const fs = require('fs');

module.exports = (Discord, client, message) => {
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

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);
}