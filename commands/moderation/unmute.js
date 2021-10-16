const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'unmute',
    usage: `${prefix}unmute [user]`,
    aliases: ['unsilence', 'unm'],
    inProgress: false,
    involvesModeration: true,
    bypassAdmin: true,
    permission: 'MANAGE_ROLES',
    category: 'MODERATION',
    cooldown: 0,
    description: 'Unmutes a user in the server.',

    async run (bot, message, args){
        
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const role = '891959800324296727'

        const userAlreadyUnmuted = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Hmm?', 'This user is not muted.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FFFF00')

        const unmuteEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Unsilenced!', `${target} has been unmuted.`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        if(!target.roles.cache.has(role)) return message.channel.send({ embeds: [userAlreadyUnmuted] })
        target.roles.remove(role)
        message.channel.send({ embeds: [unmuteEmbed] })
    }
}