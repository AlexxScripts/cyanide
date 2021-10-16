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

        db.findOne({ GuildID: message.guild.id, UserID: target.id, UserTag: target.user.tag }, async (err, data) => {
            if(err) throw err
            if(data){
                let number = parseInt(args[1]) - 1
                if(!number) return message.channel.send('what')
                data.Content.splice(number, 1).catch((err) => { message.channel.send('error') })
                data.save()
                message.channel.send(`${args[1]} removed`)
            } else {
                messsage.channel.send('no warnings')
            }
        })
    }
}