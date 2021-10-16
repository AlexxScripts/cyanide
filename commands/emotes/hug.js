const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'hug',
    usage: `${prefix}hug [user]`,
    aliases: [],
    inProgress: true,
    involvesModeration: false,
    bypassAdmin: false,
    permission: [],
    category: 'EMOTES',
    cooldown: 1000 * 5,
    description: ['Hug your friends!'],

    async run (bot, message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const gifs = ['https://tenor.com/view/milk-and-mocha-hug-love-heart-couple-gif-17258498', 
                      'https://tenor.com/view/poke-hug-sleep-pokehug-gif-19468780',
                      'https://tenor.com/view/hanakokun-yashiro-hug-anime-gif-16699836',
                      'https://tenor.com/view/toilet-bound-hanakokun-anime-anime-hug-gif-16831471',
                      'https://tenor.com/view/milk-and-mocha-hug-cute-kawaii-love-gif-12535134',
                      'https://tenor.com/view/a-whisker-away-hug-love-anime-embrace-gif-17694740',
                      'https://tenor.com/view/cute-cat-couple-hug-love-gif-14184904']
        const gifRandomized = gifs[Math.floor(Math.random() * gifs.length)]

        const noTargetEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .addField('Incorrect Usage!', `\`\`\`${module.exports.usage}\`\`\``)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('FF0000')

        if(!target) return message.channel.send({ embeds: [noTargetEmbed] })

        const titles = ['So cute!', `${message.author.username} hugged ${target.user.username}!`, 'Kawaii!', 'Feeling comfy?', 'How wholesome!', 'Adorable!']
        const titlesRandomized = titles[Math.floor(Math.random() * titles.length)]

        const hugEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle(`${titlesRandomized}`)
        .setImage(gifRandomized)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('RANDOM')

        message.channel.send({ embeds: [hugEmbed] })
    }
}