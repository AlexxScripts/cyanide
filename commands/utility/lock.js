const Discord = require('discord.js')
const ms = require('ms')
const { prefix, version } = require('../../config.json')

module.exports = {
    name: 'lock',
    usage: `${prefix}lock {channel} {reason}`,
    aliases: [],
    inProgress: true,
    involvesModeration: false,
    permission: ['MANAGE_CHANNELS'],
    category: 'UTILITY',
    cooldown: 1000 * 5,
    description: 'Locks a certain channel.',

    async run(bot, message, args){

        let channel = message.mentions.channels.first()
        let reason = args.join(' ')

        if(channel) reason = args.slice(1).join(' ')

        if(!reason) reason = 'Unspecified'

        const lockEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Locked!', `This channel has been locked.`)
        .addField('Reason', `\`\`\`${reason}\`\`\``)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        const lockEmbed2 = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Locked!', `${channel} has been locked.`)
        .addField('Reason', `\`\`\`${reason}\`\`\``)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        if(channel){
            if(channel.type == 'GUILD_VOICE'){
                channel.permissionOverwrites.edit(message.guild.id, { CONNECT: false })
                message.channel.send({ embeds: [lockEmbed2] })
            } else {
                channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false, ADD_REACTIONS: false })
                channel.send({ embeds: [lockEmbed] })
                message.react('✅')
            }
        } else {
            message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false, ADD_REACTIONS: false })
            message.channel.send({ embeds: [lockEmbed] })
        }
    }
}