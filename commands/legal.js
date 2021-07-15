module.exports = {
  name: 'legal',
  description: 'no lawsuit allowed',
  async  execute(client, message, args) {
    message.channel.send('This bot is extremely legal');
  }
}