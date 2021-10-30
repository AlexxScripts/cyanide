const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')
const music = require('@koenie06/discord.js-music')

module.exports = {
    name: 'custom-music',
    usage: `${prefix}custom-music`,
    aliases: ['cm', 'custommusic', 'customsongs'],
    inProgress: true,
    involvesModeration: false,
    bypassAdmin: false,
    permission: [],
    category: 'SPECIAL',
    cooldown: 1000 * 5,
    description: 'Plays customized music for my creator.',

    async run (bot, message, args){
        const song = parseInt(args[1])
        if(!song) return
        let song2
        const channel = message.member.voice.channel

        if(song < 1) return
        if(song == 1) song2 = 'VJFNcHgQ4HM'
        if(song == 2) song2 = 'Y3Xmzu0OtS8'
        if(song == 3)
        if(song == 4)
        if(song == 5)
        if(song > 5) return
        const notInChannelEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Error!', 'You must be in a voice channel to play music.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        if(!channel) return message.channel.send({ embeds: [notInChannelEmbed] })

        await music.play({
            interaction: song2,
            channel: channel,
            song: song2
        })

        await music.repeat({
            interaction: song2,
            value: 'on'
        })
    }
}