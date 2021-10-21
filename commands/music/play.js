const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')
const music = require('@koenie06/discord.js-music')

module.exports = {
    name: 'play',
    usage: `${prefix}play [URL/Name]`,
    aliases: [],
    inProgress: true,
    involvesModeration: false,
    bypassAdmin: false,
    permission: [],
    category: 'MUSIC',
    cooldown: 1000 * 5,
    description: 'Play music.',

    async run (bot, message, args){
        const song = args.slice(1).join(' ')
        const channel = message.member.voice.channel

        const notInChannelEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Error!', 'You must be in a voice channel to play music.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        if(channel) return message.channel.send({ embeds: [notInChannelEmbed] })

        music.play({
            interaction: song,
            channel: channel,
            song: song
        })
    }
}