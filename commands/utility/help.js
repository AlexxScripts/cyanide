const Discord = require('discord.js')
const fs = require('fs')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'help',
    usage: 'help',
    aliases: [],
    inProgress: false,
    involvesModeration: false,
    bypassAdmin: false,
    permission: [],
    category: 'UTILITY',
    cooldown: 1000 * 5,
    description: 'Displays all the commands.',

    async run (bot, message, args) {

        const moderationFiles = bot.commands.filter((cmd) => cmd.category == 'MODERATION')
        const utilityFiles = bot.commands.filter((cmd) => cmd.category == 'UTILITY')
        const emotesFiles = bot.commands.filter((cmd) => cmd.category == 'EMOTES')

        const moderationFiles2 = moderationFiles.map((e) => e.name)
        const utilityFiles2 = utilityFiles.map((e) => e.name)
        const emotesFiles2 = emotesFiles.map((e) => e.name)

        const utilityFiles3 = utilityFiles2.sort().join('\n')
        const moderationFiles3 = moderationFiles2.sort().join('\n')
        const emotesFiles3 = emotesFiles2.sort().join('\n')

        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle('At your service!')
        .setDescription(`Here\'s a list of all the available commands! to check further details, you can use \n \`\`\`${prefix}help {command}\`\`\``)
        .addField(`Moderation (${moderationFiles.size})`, `\`\`\`\n${moderationFiles3}\`\`\``)
        .addField(`Utility (${utilityFiles.size})`, `\`\`\`\n${utilityFiles3}\`\`\``)
        .addField(`Emotes (${emotesFiles.size})`, `\`\`\`\n${emotesFiles3}\`\`\``)
        .setFooter(`${message.author.tag} • ${version} • Total Commands: ${bot.commands.size}`)
        .setColor('FFFF00')


        if(args[0]){
            if(bot.commands.has(args[0])){
                
                command = bot.commands.get(args[0])

                const first = `${command.name.toUpperCase().charAt()}`
                const rest = `${command.name.slice(1)}`

                const commandName = `${first}${rest}`

                const commandEmbed = new Discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                .setTitle(`${commandName} Command`)
                .addField('Usage', `\`\`\`${command.usage != undefined ? command.usage : 'None'}\`\`\``)
                .addField('Aliases', `\`\`\`${command.aliases.join(', ') != '' ? command.aliases.join(', ') : 'None'}\`\`\``)
                .addField('Description', `\`\`\`${command.description != undefined ? command.description : 'None'}\`\`\``)
                .addField('Permission Required', `\`\`\`${command.permission != '' ? command.permission : 'None'}\`\`\``)
                .addField('Category', `\`\`\`${command.category != undefined ? command.category : 'None'}\`\`\``)
                .addField('State', `\`\`\`${command.inProgress == false || undefined ? 'Finished' : 'In Progress'}\`\`\``)
                .setFooter(`${message.author.tag} • ${version}`)
                .setColor('RANDOM')
                message.channel.send({ embeds: [commandEmbed] })
            } else message.channel.send({ embeds: [helpEmbed] })
        } else message.channel.send({ embeds: [helpEmbed] })
    }
}