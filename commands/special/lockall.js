const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'lockall',
    usage: `${prefix}lockall`,
    aliases: ['la','lockchannels'],
    inProgress: false,
    involvesModeration: false,
    bypassAdmin: false,
    permission: 'Ownership',
    category: 'SPECIAL',
    cooldown: 0,
    description: ['Locks all the channels in the server.'],

    async run(bot, message, args){

        let reason = args.join(' ')
        let allChannels = await message.guild.channels.fetch()
        let announcementChannel = message.guild.channels.cache.get('897748134011232326')
        let channelCategories = allChannels.filter(channel => channel.type != 'GUILD_CATEGORY' && channel.parentId != '890823762474319892' && channel.parentId != '896784760423211018')

        if(!reason) reason = 'Unspecified'

        const optionEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Yes or no?', 'Do you really want to lock every channel?')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        const cancelEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Stop!', 'Cancelled Operation.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FFFF00')

        const lockAllEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Success!', `I've locked every channel including voice channels in this server.`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        const lockAllEmbed2 = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Announcement', `All channels have been locked!`)
        .addField('Reason', `\`\`\`${reason}\`\`\``)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('RANDOM')

        const yes = ['yes', 'y']
        const no = ['no', 'n', 'stop']

        const filter = x => {
            return (x.author.id == message.author.id)
        }

        message.channel.send({ embeds: [optionEmbed] })
        const collector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 })

        if(!collector.size) return message.channel.send({ embeds: [cancelEmbed] })

        let choice = collector.first().content.toLowerCase()

        if(yes.includes(choice)){
            channelCategories.forEach((channel) => {
                if(channel.type == 'GUILD_VOICE'){
                    channel.permissionOverwrites.edit(message.guild.id, { CONNECT: false })
                } else {
                    channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false, ADD_REACTIONS: false })
                }
            })
            message.channel.send({ embeds: [lockAllEmbed] })
            announcementChannel.send({ embeds: [lockAllEmbed2] })
            return
        }
        if(no.includes(choice)) return message.channel.send({ embeds: [cancelEmbed] })
        if(!yes.includes(choice) || !no.includes(choice)) return message.channel.send({ embeds: [cancelEmbed] })
    }
}