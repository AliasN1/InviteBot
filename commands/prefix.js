const fs = require('fs');

module.exports = {
  name: 'prefix',
  description: 'set prefix',
  async  execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Not Enough power");
    if (!args[0] || args[0 == "help"]) return message.reply("Usage: !prefix <desired prefix here>");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
      prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.log(err)
    })

    message.channel.send("Prefix Set!");
  }
}