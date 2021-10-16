const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'serverinfo',
    usage: `${prefix}serverinfo`,
    aliases: ['si', 'infoserver'],
    inProgress: true,
    involvesModeration: false,
    bypassAdmin: false,
    permission: [],
    category: 'UTILITY',
    cooldown: 1000 * 5,
    description: 'Displays the server\'s information.',

    async run (bot, message, args){
        message.channel.send('yes')
    }
}