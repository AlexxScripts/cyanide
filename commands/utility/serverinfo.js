module.exports = {
    name: 'serverinfo',
    usage: 'serverinfo',
    aliases: ['si', 'infoserver'],
    inProgress: true,
    involvesModeration: false,
    permission: [],
    category: 'UTILITY',
    cooldown: 1000 * 5,
    description: 'Displays the server\'s information.',

    async run (bot, message, args){
        message.channel.send('yes')
    }
}