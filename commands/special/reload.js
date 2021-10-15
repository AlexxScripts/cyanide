const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'reload',
    usage: `${prefix} reload [command]`,
    aliases: ['re'],
    inProgress: false,
    involvesModeration: false,
    permission: 'Ownership',
    category: 'UTILITY',
    cooldown: 0,
    description: 'Reloads a specific command.',

    async run(bot, message ,args){

        const commandName = args[0].toLowerCase()
        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        const commandInvalidEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Invalid Command!', 'Please specify a valid command for me to reload.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        const reloadEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Reloaded!', `The command: \`${commandName.toUpperCase()}\` has been reloaded!`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        const errorEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Error!', 'An error occurred trying to reload this command.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        if(!command) return message.channel.send({ embeds: [commandInvalidEmbed] })
        
        delete require.cache[require.resolve(`../${command.category.toLowerCase()}/${command.name}.js`)]

        try {
            const newCommand = require(`../${command.category.toLowerCase()}/${command.name}.js`)
            bot.commands.set(newCommand, newCommand)
            message.channel.send({ embeds: [reloadEmbed] })
        } catch {
            message.channel.send({ embeds: [errorEmbed] })
        }
    }

}