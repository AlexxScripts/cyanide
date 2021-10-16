const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'ban',
    usage: `${prefix}ban [user] {time} {reason}`,
    aliases: [],
    inProgress: true,
    involvesModeration: true,
    bypassAdmin: true,
    permission: 'BAN_MEMBERS',
    category: 'MODERATION',
    cooldown: 0,
    description: 'Bans a user from the server.',

    async run (bot, message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        target.ban()
        message.channel.send('banned!')
    }
}