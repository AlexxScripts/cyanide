const { Client, Intents } = require('discord.js')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const { readdirSync, read, readdir } = require('fs')
const { prefix, version } = require('./config.json')
const ms = require('ms')
const duration = require('humanize-duration')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, "GUILD_MEMBERS"] })
const commandFolders = readdirSync('./commands')
const commandTimeout = new Discord.Collection()

bot.commands = new Discord.Collection()

for (const folder of commandFolders){
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'))
    for (const file of commandFiles){
        const command = require(`./commands/${folder}/${file}`)
        bot.commands.set(command.name, command)
    }
}

bot.once('ready', async () => {
    console.log(`${bot.user.username} is ready!`)
    const files = bot.commands.map((e) => e.name)
    console.log(files)
    console.log(`${bot.commands.size} commands initialized!`)
})

bot.on('messageCreate', async message => {
    if(message.author.bot) return

    if(message.content.startsWith(prefix)){
        const creator = bot.users.cache.get('514720382779916318')
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        if(!command) return
        
        if(command){

            if(command.name == 'kickall'){
                if(message.author.id != creator.id){
                    const ownerOnlyEmbed = new Discord.MessageEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                    .addField('Owner Only!', `Only my creator, ${creator} (${creator.tag}), has access to this!`)
                    .setFooter(`${message.author.tag} • ${version}`)
                    .setColor('FF0000')
                    message.channel.send({ embeds: [ownerOnlyEmbed] })
                    return
                }
            }

            if(message.author.id != creator.id){

                if(command.inProgress){
                    if(message.author.id != '514720382779916318'){
                        const inProgress = new Discord.MessageEmbed()
                        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                        .addField('WIP!', 'This command is still in progress.')
                        .setFooter(`${message.author.tag} • ${version}`)
                        .setColor('FF0000')
                        message.channel.send({ embeds: [ inProgress] })
                        return
                    }
                }

                if(command.permission){
                    if(!message.member.permissions.has(command.permission)){
                        const noPermissionEmbed = new Discord.MessageEmbed()
                        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                        .addField('No Permission!', `You must have the \`${command.permission}\` permission to use this.`)
                        .setFooter(`${message.author.tag} • ${version}`)
                        .setColor('FF0000')
                        message.channel.send({ embeds: [noPermissionEmbed] })
                        return
                    }
                }
            }
    
                if(command.involvesModeration){
                    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                    const roleTarget = message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()

                    const involvesHierarchyEmbed = new Discord.MessageEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                    .addField('Role Hierarchy Violation!', `You can't ${command.name} this user as they have the same or has higher role than you.`)
                    .setFooter(`${message.author.tag} • ${version}`)
                    .setColor('FF0000')

                    const involvesHierarchyEmbed2 = new Discord.MessageEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                    .addField('Huh?!', `I can't ${command.name} this user as they have the same or has a higher role than me.`)
                    .setFooter(`${message.author.tag} • ${version}`)
                    .setColor('FF0000')

                    const performActionOnSelfEmbed = new Discord.MessageEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                    .addField('Error!', `You can't perform this action on yourself.`)
                    .setFooter(`${message.author.tag} • ${version}`)
                    .setColor('FF0000')
        
                    const incorrectUsageEmbed = new Discord.MessageEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                    .addField('Incorrect Usage!', `\`\`\`${command.usage}\`\`\``)
                    .setFooter(`${message.author.tag} • ${version}`)
                    .setColor('FF0000')

                    const harmMeEmbed = new Discord.MessageEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                    .addField('Why..?', `Don't even try.`)
                    .setFooter(`${message.author.tag} • ${version}`)
                    .setColor('FF0000')
    
                    const cannotHarmAdminEmbed = new Discord.MessageEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                    .addField('Uh Oh!', `You can't ${command.name} an administrator!`)
                    .setFooter(`${message.author.tag} • ${version}`)
                    .setColor('FF0000')
        
                    if(!target) return message.channel.send({ embeds: [incorrectUsageEmbed] })
                    if(target.id == bot.user.id) return message.channel.send({ embeds: [harmMeEmbed] })
                    if(target.id == message.author.id) return message.channel.send({ embeds: [performActionOnSelfEmbed] })

                    if(command.name != 'unmute' || 'kick' || 'ban'){
                        if(target.permissions.has('ADMINISTRATOR')) return message.channel.send({ embeds: [ cannotHarmAdminEmbed ]})
                    }
                    if(message.author.id =! '514720382779916318'){
                        if(target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [involvesHierarchyEmbed] })
                    }
                    if(target.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send({ embeds: [involvesHierarchyEmbed2] })
                    // if(roleTarget.position >= message.member.roles.highest.position) return
                }

                if(command.cooldown){
                    if(commandTimeout.has(`${command.name}${message.author.id}`)){
                        const remaining = duration(commandTimeout.get(`${command.name}${message.author.id}`) - Date.now(), { units: ['s'], maxDecimalPoints: 2 })
                        const cooldownEmbed = new Discord.MessageEmbed()
                        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                        .addField('Cooldown!', `You must wait **${remaining}** to use the \`${prefix}${command.name}\` command again.`)
                        .setFooter(`${message.author.tag} • ${version}`)
                        .setColor('FF0000')
                        message.channel.send({ embeds: [cooldownEmbed]})
                        return
                    }
                    command.run(bot, message, args)
                    commandTimeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                    setTimeout(() => { commandTimeout.delete(`${command.name}${message.author.id}`)}, command.cooldown)
                } else command.run(bot, message, args)
            } else command.run(bot, message, args)
        }
})

bot.on('guildMemberAdd', async (member) => {

    if(member.user.id == '886205838040104990') return member.ban().catch(console.error)
    if(member.user.bot){
        if(member.permissions.has('ADMINISTRATOR')){
            const utilityRole = '890830451030241300'
            member.roles.add(utilityRole)
        } else if(!member.permissions.has('ADMINISTRATOR')){
            const arcadeRole = '890830149682098206'
            member.roles.add(arcadeRole)
        }
    }

    const joinEmbed = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField('Welcome to Cyanium!', `${member.user} joined the server!`)
    .addField('Account Age', `${duration(member.user.createdAt - Date.now(), { largest: 1, maxDecimalPoints: 0 })}`)
    .setFooter(`ID: ${member.user.id}`)
    .setColor('00FFFF')

    if(!member.user.bot){
        bot.channels.cache.get('890829034194350081').send({ embeds: [joinEmbed] })
    }
})

bot.on('guildMemberRemove', async (member) => {
    if(member.user.id == '886205838040104990') return

    const leaveEmbed = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField('Aww..', `${member.user} left the server..`)
    .addField('Member For', `${duration(member.joinedAt - Date.now(), { largest: 2, maxDecimalPoints: 0, conjunction: ' and ', serialComma: false })}`)
    .setFooter(`ID: ${member.user.id}`)
    .setColor('FF0000')

    if(!member.user.bot){
        bot.channels.cache.get('890829034194350081').send({ embeds: [leaveEmbed] })
    }
})

bot.login(process.env.token)