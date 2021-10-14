const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'unlock',
    usage: `${prefix}unlock {channel}`,
    aliases: ['unl'],
    inProgress: true,
    involvesModeration: false,
    permission: ['MANAGE_CHANNELS'],
    category: 'UTILITY',
    cooldown: 1000 * 5,
    description: 'Unlocks a specific channel.',

    async run(bot, message, args){
        let channel = message.mentions.channels.first()
        let reason = args.join(' ')
        if(channel) reason = args.slice(1).join(' ')
        if(!reason) reason = 'Unspecified'

        const unlockEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Unlocked!', `This channel is now unlocked.`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        if(channel){
            channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: null, ADD_REACTIONS: null })
            channel.send({ embeds: [unlockEmbed] })
            message.react('✅')
        } else {
            message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: null, ADD_REACTIONS: null })
            message.channel.send({ embeds: [unlockEmbed] })
        }
    }
}