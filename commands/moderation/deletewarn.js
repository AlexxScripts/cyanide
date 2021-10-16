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
                console.log(data.Content.length)
                let number = parseInt(args[1]) - 1
                if(!parseInt(args[1])) return message.channel.send('what')
                if(parseInt(args[1] > data.Content.length)) return message.channel.send('id does not exist')

                data.Content.splice(number, 1)
                data.save()
                message.channel.send(`${args[1]} removed`)
            } else {
                messsage.channel.send('no warnings')
            }
        })
    }
}