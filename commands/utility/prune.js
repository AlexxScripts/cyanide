const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'prune',
    usage: `${prefix}prune {user} [amount]`,
    aliases: ['purge', 'clear', 'delete'],
    inProgress: true,
    involvesModeration: false,
    permission: 'MANAGE_MESSAGES',
    category: 'UTILITY',
    cooldown: 1000 * 3,
    description: 'Deletes a value of messages in the channel.',

    async run (bot, message, args){

        let amount = parseInt(message.content.split(' ')[1])
        const messages = message.channel.messages.fetch({ limit: amount + 1 })

        const noAmountEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('No Amount!', 'Please input a value of messages for me to delete.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        if(!amount) return message.channel.send({ embeds: [noAmountEmbed] })
        if(amount > 100) amount = 100
        if(!messages) return
        
        message.delete()

        const deletedEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Cleared!', `I deleted ${amount} message${amount != 1 ? 's': ''} in this channel.`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        messages.then(filteredMessages => {
            const messagesToPrune = filteredMessages.filter(msg => !msg.pinned)
            return message.channel.bulkDelete(messagesToPrune, true).catch(console.error)
        })
        message.channel.send({ embeds: [deletedEmbed] }).then((msg) => setTimeout(() => msg.delete(), 3000))

    }
}