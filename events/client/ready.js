module.exports = (Discord, client) => {
  console.log(
    `${client.user.username} is online on ${client.guilds.cache.size} servers!`
  );

  client.user.setActivity('Sorting Scams', { type: 'PLAYING' });
}