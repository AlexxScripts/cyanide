const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'hug',
    usage: `${prefix}hug [user]`,
    aliases: [],
    inProgress: true,
    involvesModeration: false,
    permission: [],
    category: 'EMOTES',
    cooldown: 1000 * 5,
    description: ['Hug your friends!'],

    async run (bot, message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const gifs = ['https://tenor.com/view/mochi-peachcat-mochi-peachcat-hug-pat-gif-19092449', 
                      'https://tenor.com/view/puuung-cute-hug-love-gif-13113601',
                      'https://tenor.com/view/a-lovely-tuji-hug-couple-in-love-heart-gif-17750778',
                      'https://tenor.com/view/milk-and-mocha-hug-love-heart-couple-gif-17258498',
                      'https://tenor.com/view/milk-and-mocha-bear-couple-line-hug-cant-breathe-gif-12687187',
                      'https://tenor.com/view/poke-hug-sleep-pokehug-gif-19468780',
                      'https://tenor.com/view/milk-and-mocha-hug-cute-kawaii-love-gif-12535134']
        const gifRandomized = gifs[Math.floor(Math.random() * gifs.length)]

        const titles = ['So cute!', `${message.author.username} hugged ${target.user.username}!`, 'Kawaii!', 'Feeling comfy?', 'How wholesome!']
        const titlesRandomized = titles[Math.floor(Math.random() * titles.length)]

        const hugEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle(`${titlesRandomized}`)
        .setImage(gifRandomized)
        .setFooter(`${message.author.tag} • ${version}`)
        .setColor('RANDOM')

        // message.channel.send({ embeds: [hugEmbed] })
    }
}