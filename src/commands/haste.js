const got = require("got")
const fs = require("fs")
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const config = require('../data/botData/config.json');

class HasteCommand extends Command {
    constructor() {
        super('haste', {
            aliases: ['haste', 'get'],
            category: 'Developer',
            description: 'Haste code from the bot.',
            ownerOnly: true,
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'message',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: 'What path would you like to find?'
                    }
                }
            ]
        });
    }

    async exec(message, args) {
        message.react('👀')
        let embed = new Discord.MessageEmbed()
            .setTitle(`${args.message}`)
            .setColor(config.color)
        let b;
        try {
            b = fs.readFileSync(args.message)
        }
        catch {
            await message.reply("Not a valid file path")
            return await message.react('❌')
        }
        const { body } = await got.post('https://hst.sh/documents', {
            body: b
        });
        embed = embed.setURL(`https://hst.sh/${JSON.parse(body).key}.js`)
        if (b.length > 2048) {
            embed = embed.setDescription('Code is too long to display in an embed click the link in the title!')
            await message.util.send(embed);
            return await message.react('✔️')
        }
        else {
            embed = embed.setDescription('```js\n' + b + '```')
            await message.util.send(embed)
            return await message.react('✔️')
        }
    }
}

module.exports = HasteCommand;