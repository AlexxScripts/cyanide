const Discord = require('discord.js')
const glob = require('glob')
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

        // const commandName = args[0].toLowerCase()
        // const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        const errorEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Error!', 'An error occurred trying to reload commands.')
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if(err) return message.channel.send({ embeds: [errorEmbed] })
            bot.commands.sweep(() => true)
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)]
                const pull = require(file)

                if(pull.name){
                    console.log(`Reloaded ${pull.name}`)
                    bot.commands.set(pull.name, pull)
                }
                
                if(pull.aliases && Array.isArray(pull.aliases)){
                    pull.aliases.forEach((alias) => {
                        bot.aliases.set(alias, pull.name)
                    })
                }
            })
        })

        const reloadEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Reloaded!', `All commands have been reloaded!`)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('00FF00')

        message.channel.send({ embeds: [reloadEmbed] })
    }
}