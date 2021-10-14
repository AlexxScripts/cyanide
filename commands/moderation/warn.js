const Discord = require('discord.js')
const db = require('../../models/warningdb')
const currentDate = new Date()
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'warn',
    usage: `${prefix}warn [user] {reason}`,
    aliases: [],
    inProgress: true,
    involvesModeration: true,
    permission: 'MANAGE_MESSAGES',
    category: 'MODERATION',
    cooldown: 0,
    description: 'Gives a warning to a user.',

    async run(bot, message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(' ')
        const date = currentDate.toLocaleDateString()
        if(!reason) reason = 'Unspecified'

        db.findOne({ GuildID: message.guild.id, UserID: target.id, UserTag: target.user.tag }, async (err, data) => {
            if(err) throw err
            if(!data){
                data = new db({
                    GuildID: message.guild.id,
                    UserID: target.id,
                    UserTag: target.user.tag,
                    Content: [
                        {
                            ModeratorID: message.author.id,
                            ModeratorTag: message.author.tag,
                            Reason: reason,
                            Date: date,
                        }
                    ],
                })
            } else {
                const obj = {
                    ModeratorID: message.author.id,
                    ModeratorTag: message.author.tag,
                    Reason: reason,
                    Date: date,
                }
                data.Content.push(obj)
            }
            data.save()
        })

        const warnEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Watch it!', `${target} has been warned!`)
        .addField('Reason', `\`\`\`${reason}\`\`\``)

        message.channel.send({ embeds: [warnEmbed] })
    }
}