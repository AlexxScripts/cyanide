const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')
const music = require('@koenie06/discord.js-music')

module.exports = {
    name: 'queue',
    usage: `${prefix}queue`,
    aliases: [],
    inProgress: true,
    involvesModeration: false,
    bypassAdmin: false,
    permission: [],
    category: 'MUSIC',
    cooldown: 1000 * 5,
    description: 'Displays the queue.',

    async run(bot, message, args){
        console.log(await(music.getQueue({ interaction: args })))
    }
}