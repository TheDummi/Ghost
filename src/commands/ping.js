const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { setPresence } = require('../funcs.js')

const botSettings = require('../data/botData/config.json')

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'Info',
            description: 'Get the bot latency and the discord message latency.',
            ownerOnly: false,
        });
    }

    async exec(message) {
        message.react('👀')
        let m = await message.util.send(`pinging...`)
        const timeDiff = (m.editedAt || m.createdAt) - (message.editedAt || message.createdAt);
        let str = `${message.author.username} get my ping! It's ${Math.round(this.client.ws.ping)}ms.`
        if (Math.round(this.client.ws.ping) > 150) str += " OH NO! This is quite high!"
        setPresence(this.client, "WATCHING", str, "online")
        let embed = new Discord.MessageEmbed()
            .setTitle('🏓 pong!')
            .addField(`| Message latency`, `\`\`\`js\n${timeDiff}ms.\`\`\``, true)
            .addField('| Bot latency', `\`\`\`js\n${Math.round(this.client.ws.ping)}ms.\`\`\``, true)
            .setColor(botSettings.color)
        try {
            await m.edit("", embed);
            return await message.react('✔️')
        }
        catch {
            await m.edit(`> __🏓 pong!__\n> **Message latency:** ${timeDiff}ms.\n> **Bot latency:** ${Math.round(this.client.ws.ping)}ms.`)
            return await message.react('❌')
        }
    }
};

module.exports = PingCommand;
