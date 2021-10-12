const Discord = require('discord.js')
const duration = require('humanize-duration')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'ping',
    usage: 'ping',
    aliases: [],
    inProgress: false,
    involvesModeration: false,
    permission: [],
    category: 'UTILITY',
    cooldown: 1000 * 5,
    description: 'Displays the latency, api and uptime.',


    async run (bot, message, args) {
        const loadingMessages = ['Fetching API..', 'Loading..', 'Processing..', 'Pinging..', 'Decoding..', 'Gathering Information..', 'Calculating Uptime..']
        const loadingMessagesRandom = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]

        const loadingEmbed = new Discord.MessageEmbed()
        .setDescription(`${loadingMessagesRandom}`)
        .setColor('RANDOM')

        message.channel.send({ embeds: [loadingEmbed] }).then(msg => {

            const latency = `${Date.now() - message.createdTimestamp}`
            const apiLatency = `${Math.round(bot.ws.ping)}`
            const uptime = `${duration(bot.uptime, { round: true, conjunction: ' and ', serialComma: false })}`

            setTimeout(() => {
                const pingEmbed = new Discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                .addField('Latency', latency + 'ms')
                .addField('API Latency', apiLatency + 'ms')
                .addField('Bot Uptime', uptime)
                .setFooter(`${message.author.tag} • ${version}`)

                if(latency > 1000) pingEmbed.setColor('FF0000')
                if(latency > 500 && latency < 1000) pingEmbed.setColor('FFFF00')
                if(latency < 500) pingEmbed.setColor('00FF00')

                msg.edit({ embeds: [pingEmbed] })
            }, 500)
        })
    }
}