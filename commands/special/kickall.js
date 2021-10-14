const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'kickall',
    usage: `${prefix}kickall`,
    aliases: ['kickeveryone','ka'],
    inProgress: false,
    involvesModeration: false,
    permission: 'Ownership',
    category: 'SPECIAL',
    cooldown: 0,
    description: ['Kicks all members out of the server.'],

    async run (bot, message, args){

        const optionEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Yes or no?', 'Do you really want to kick everyone out of the server?')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        const cancelEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Stop!', 'Cancelled Operation.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FFFF00')

        const yes = ['yes', 'y']
        const no = ['no', 'n', 'stop']

        const filter = x => {
            return (x.author.id == message.author.id)
        }

        message.channel.send({ embeds: [optionEmbed] })
        const collector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 })

        let allUsers = await message.guild.members.fetch()
        let allUsersFiltered = allUsers.filter(user => !user.user.bot)

        if(!collector.size) return message.channel.send({ embeds: [cancelEmbed] })

        let choice = collector.first().content.toLowerCase()
        if(yes.includes(choice)){
            allUsersFiltered.forEach(async (members) => {
                members.kick().catch(console.error)
            })
        return
        }
        if(no.includes(choice)) return message.channel.send({ embeds: [cancelEmbed] })
        if(!yes.includes(choice) || !no.includes(choice)) return message.channel.send({ embeds: [cancelEmbed] })
        message.react('✅')
    }
}