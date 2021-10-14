const Discord = require('discord.js')
const db = require('../../models/warningdb')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'warnings',
    usage: `${prefix}warnings {user}`,
    aliases: ['warns'],
    inProgress: true,
    involvesModeration: false,
    permission: [],
    category: 'UTILITY',
    cooldown: 0,
    description: 'Gives a warning to a user.',

    async run(bot, message, args){

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let target2
        let target3
        let thisuserhas
        if(!target){
            target = message.author
            target2 = target
            target3 = `Your`
            thisuserhas = `You have`
        } else {
            if(target.id == message.author.id){
                thisuserhas = `You have`
                target2 = message.author
                target3 = `Your`
            } else {
                target2 = target.user
                target3 = `${target2.tag}'s`
                thisuserhas = `${target.user.tag} has`
            }
        }

        db.findOne({ GuildID: message.guild.id, UserID: target.id, UserTag: target2.tag }, async (err, data) => {
            if(err) throw err
            if(data){

                const warningsEmbed = new Discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                .setTitle(`${target3} Warnings`)
                .setDescription(`\`\`\`${data.Content.map(
                    (w, i) => `Warn ID: ${i + 1}\nModerator: ${w.ModeratorTag}\nReason: ${w.Reason}\nDate: ${w.Date}\n\n`
                ).join(' ')}\`\`\``)
                .setFooter(`${message.author.tag} • ${version}`)
                .setColor('RANDOM')


                message.channel.send({ embeds: [warningsEmbed] })
            } else {

                const warningsEmbed2 = new Discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                .setTitle(`${thisuserhas} no warnings.`)
                .setFooter(`${message.author.tag} • ${version}`)
                .setColor('RANDOM')
                message.channel.send({ embeds: [warningsEmbed2] })
            }
        })
    }
}