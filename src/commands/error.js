const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const func = require('../funcs.js')

const config = require('../data/botData/config.json')

class ErrorCommand extends Command {
    constructor() {
        super('error', {
            aliases: ['error'],
            category: 'Developer',
            description: 'Force throw an error.',
            ownerOnly: true,
            channel: ['guild', 'dm']
        });
    }

    async exec(message) {
        message.react('👀')
        let m = await message.util.send('Creating an error...')
        await func.sleep(1000)
        await m.edit(`Created an error, check <#${config.logsChannel}>!`)
        let errorChannel = this.client.channels.cache.get(config.logsChannel);
        let error = new Error(`This error got forced by ${message.author.username}`)
        let errorEmbed = new Discord.MessageEmbed()
            .setAuthor('ERROR', message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`\`\`js\n${error}\`\`\``)
            .setColor(config.color)
        await errorChannel.send(errorEmbed)
        return await message.react('✔️')
    }
};

module.exports = ErrorCommand;
