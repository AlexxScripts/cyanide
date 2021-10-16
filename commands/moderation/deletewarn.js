const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')
var num = 0

module.exports = {
    name: 'deletewarn',
    usage: `${prefix}deletewarn [user] [id]`,
    aliases: ['delwarn'],
    inProgress: true,
    involvesModeration: false,
    permission: 'MANAGE_MESSAGES',
    category: 'MODERATION',
    cooldown: 0,
    description: 'Deletes a warning from a user.',

    async run(bot, message, args){
        num++
        message.channel.send(`${num}`)
    }
}