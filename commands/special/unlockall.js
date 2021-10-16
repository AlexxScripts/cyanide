const Discord = require('discord.js')
const { prefix, version } = require('../../config.json')

module.exports = {
    name: 'unlockall',
    usage: `${prefix}unlockall`,
    aliases: ['ua','unlockchannels'],
    inProgress: false,
    involvesModeration: false,
    bypassAdmin: false,
    permission: 'Ownership',
    category: 'SPECIAL',
    cooldown: 0,
    description: ['Unlocks all the channels in the server.'],

    async run(bot, message, args){

        const unlockAllEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Success!', `I've unlocked every channels in this server.`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        let allChannels = await message.guild.channels.fetch()
        let channelCategories = allChannels.filter(channel => channel.type != 'GUILD_CATEGORY' && channel.parentId != '890823762474319892' && channel.parentId != '896784760423211018')

        channelCategories.forEach((channel) => {
            if(channel.type == 'GUILD_VOICE'){
                channel.permissionOverwrites.edit(message.guild.id, { CONNECT: null })
            } else {
                channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: null, ADD_REACTIONS: null })
            }
        })
        
        message.channel.send({ embeds: [unlockAllEmbed] })
    }
}