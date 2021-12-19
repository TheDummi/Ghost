const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const config = require('../data/botData/config.json')
class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    async exec(message, command, reason) {
        const channel = this.client.channels.cache.get(config.tracebackChannel)

        let embed = new Discord.MessageEmbed()
            .setAuthor('Command block traceback', message.author.displayAvatarURL({ dynamic: true }))
            .setColor(config.color)
            .addField('Author', message.author.tag)
        if (message.guild !== null) {
            embed = embed.addField('Server', message.guild.name)
        }
        try {
            if (message.channel.id !== undefined) {
                let invite = message.channel.createInvite()
                let invited = await invite
                embed = embed.addField('Direct link', `[${message.channel.name}](${invited})`)
            }
        }
        catch {
            embed = embed.addField('Server link', 'No server link permission or in a DM')
        }
        embed
            .addField('Command', command.id)
        if (reason == "owner") {
            embed = embed.addField('Reason', `Not a developer`)
            await message.channel.send(`<@${message.author.id}> you are not a developer. \`${command.id}\` is a developer command.`)
        }
        if (reason == "dm") {
            embed = embed.addField('Reason', `Not in a DM`)
            await message.channel.send(`<@${message.author.id}> you can only use \`${command.id}\` in DMs.`)
        }
        if (reason == "guild") {
            embed = embed.addField('Reason', `Not in a guild`)
            await message.channel.send(`<@${message.author.id}> you can only use \`${command.id}\` in guilds.`)
        }
        await channel.send(embed)
    }
};
module.exports = CommandBlockedListener;