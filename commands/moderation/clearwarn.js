const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'clearwarn',
    usage: `${prefix}clearwarn [user]`,
    aliases: ['cw'],
    inProgress: true,
    involvesModeration: false,
    bypassAdmin: true,
    permission: 'MANAGE_MESSAGES',
    category: 'MODERATION',
    cooldown: 0,
    description: 'Clears all the user\'s warnings.',

    async run(bot, message, args){

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        db.findOne({ guildID: message.guild.id, userID: target.id, userTag: target.user.tag }, async (err, data) => {

        })

        const noTargetEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('No User!', 'Please specify a valid user.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        const benefitYourself = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('That\'s Illegal!', 'You can\'t delete your own warnings.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        if(!target) return message.channel.send({ embeds: [noTargetEmbed] })
        if(target.id == message.author.id) return message.channel.send({ embeds: [benefitYourself] })

        message.channel.send('done')
    }
}