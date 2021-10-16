const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')
const db = require('../../models/warningdb')

module.exports = {
    name: 'deletewarn',
    usage: `${prefix}deletewarn [user] [id]`,
    aliases: ['delwarn'],
    inProgress: true,
    involvesModeration: false,
    permission: 'MANAGE_MESSAGES',
    category: 'MODERATION',
    cooldown: 0,
    description: 'Deletes a warning from a user.',

    async run(bot, message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const noTargetEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('No User!', 'Please specify a valid user.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        const noWarningsEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Hmm?', `No warnings to delete.`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        const invalidIdEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Invalid!', 'That ID does not exist!')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        if(!target) return message.channel.send({ embeds: [noTargetEmbed] })

        db.findOne({ GuildID: message.guild.id, UserID: target.id, UserTag: target.user.tag }, async (err, data) => {
            if(err) throw err
            if(data){
                if(data.Content.length == 0){
                    message.channel.send({ embeds: [noWarningsEmbed] })
                    return
                }
                let number = parseInt(args[1]) - 1
                if(!parseInt(args[1])) return message.channel.send({ embeds: [invalidIdEmbed] })
                if(parseInt(args[1]) > data.Content.length) return message.channel.send({ embeds: [invalidIdEmbed] })

                const deletedWarnEmbed = new Discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                .addField('Success!', `I deleted the warning of ${target.user.tag} with the ID: ${args[1]}`)
                .setFooter(`${message.author.tag} • ${version}`)
                .setColor('00FF00')

                data.Content.splice(number, 1)
                data.save()
                message.channel.send({ embeds: [deletedWarnEmbed] })
            } else {
                message.channel.send({ embeds: [noWarningsEmbed] })
            }
        })
    }
}