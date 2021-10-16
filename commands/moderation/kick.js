const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'kick',
    usage: `${prefix}kick [user] {reason}`,
    aliases: [],
    inProgress: true,
    involvesModeration: true,
    bypassAdmin: true,
    permission: 'KICK_MEMBERS',
    category: 'MODERATION',
    cooldown: 0,
    description: 'Kicks a user from the server.',

    async run (bot, message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        target.kick()

        const kickEmbed = new Discord.MessageEmbed()
        
    }
}