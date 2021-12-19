const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const config = require('../data/botData/config.json')
class ErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    async exec(error, message, command) {
        let logsChannel = this.client.channels.cache.get(config.logsChannel);
        let tracebackChannel = this.client.channels.cache.get(config.tracebackChannel);
        let errorEmbed = new Discord.MessageEmbed()
            .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
            .setColor(config.color)
        let m = await logsChannel.send(errorEmbed)
        let reason = error.message
        let embed = new Discord.MessageEmbed()
            .setAuthor('Command error traceback', message.author.displayAvatarURL({ dynamic: true }))
            .setColor(config.color)
            .addField('Author', message.author.username)
        if (message.guild !== null) {
            embed = embed.addField('Server', message.guild.name)
        }
        try {
            if (message.channel.id !== undefined) {
                let invite = message.channel.createInvite()
                let invited = await invite
                embed = embed.addField('Server link', `[${message.channel.name}](${invited})`)
            }
        }
        catch {
            embed = embed.addField('Server link', 'No server invite permission or in DM.')
        }
        embed
            .addField('Error log', `[${command.id}](${m.url})`)
            .addField('Command', command.id)
            .addField('Reason', reason)
        await tracebackChannel.send(embed)
        let embedError = new Discord.MessageEmbed()
            .setAuthor(`There was an error trying to execute ${command.id}!`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Your error got logged in <#${config.tracebackChannel}>, ask <@${config.owners[0]}> to fix it!`)
            .setColor(config.color)
        await message.util.send(embedError)
            .then(message => {
                setTimeout(function () {
                    message.delete(embedError)
                }, 60000)
            })
    }
}
module.exports = ErrorListener;