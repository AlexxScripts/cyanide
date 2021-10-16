const Discord = require('discord.js')
const { version, prefix } = require('../../config.json')

module.exports = {
    name: 'pat',
    usage: `${prefix}pat [user]`,
    aliases: [],
    inProgress: true,
    involvesModeration: false,
    bypassAdmin: false,
    permission: [],
    category: 'EMOTES',
    cooldown: 1000 * 5,
    description: 'Pat your loved one!',

    async run (bot, message, args){
        
    }
}