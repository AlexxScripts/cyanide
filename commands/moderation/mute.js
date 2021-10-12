const Discord = require('discord.js')
const ms = require('ms')
const duration = require('humanize-duration')
const { version, prefix } = require('../../config.json')
const currentDate = new Date()

module.exports = {
    name: 'mute',
    usage: `${prefix}mute [user] {time} {reason}`,
    aliases: ['silence'],
    inProgress: false,
    involvesModeration: true,
    permission: 'MANAGE_ROLES',
    category: 'MODERATION',
    cooldown: 0,
    description: 'Mutes a user in the server.',

    async run (bot, message, args){

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const logsChannel = message.guild.channels.cache.get('896785243787386881')
        let reason = args.slice(2).join(' ')
        const role = '891959800324296727'
        let timeText = 'indefinitely'
        let time = args[1]

        const cannotMuteMe = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Hey!', 'You can\'t mute me!')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        const userAlreadyMuted = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Hmm?', 'This user is already muted.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FFFF00')

        const logEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle('Mute Log')
        .addField('User Muted', `${target.user.tag}`)
        .addField('Moderator', `${message.author.tag}`)
        .setFooter(`${version}`)
        .setColor('00FF00')

        if(target.id == bot.user.id) return message.channel.send({ embeds: [cannotMuteMe] })
        if(target.roles.cache.has(role)) return message.channel.send({ embeds: [userAlreadyMuted] })

        try {
            if(time && ms(time) != undefined){
                timeText = `for ${ms(ms(time), { long: true })}`
                logEmbed.addField('Duration', `${ms(ms(time), { long: true })}`)
            }
        } catch {
            reason = args.slice(1).join(' ')
        }

        if(!reason) reason = 'Undefined'
        logEmbed.addField('Reason', `${reason}`)

        const muteEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Silence!', `${target} has been muted ${timeText}.`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        message.channel.send({ embeds: [muteEmbed] })
        logEmbed.addField('Date', `${currentDate.toLocaleDateString()}`)
        logsChannel.send({ embeds: [logEmbed] })
        target.roles.add(role)

        try {
            if(time && ms(time) != undefined){
                if(timeText == 'indefinitely') return
                setTimeout(() => {
                    if(!target.roles.cache.has(role)) return
                    target.roles.remove(role)
                }, ms(time))
            }
        } catch {}
    }
}