const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { setPresence } = require('../funcs.js')

const config = require('../data/botData/config.json')

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'Help',
            description: 'Get a help message. Run `?help <command>` for command details.',
            ownerOnly: false,
            args: [
                {
                    id: 'command',
                    type: 'string'
                }
            ]
        });
    }

    async exec(message, args) {
        message.react('👀')
        let categories = [];
        let command = args.command;
        let noEmbed = new Discord.MessageEmbed()
            .setAuthor(`Couldn't find ${command} as command`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`${command}\` is not registered as a known command, try looking for misspelling.`)
            .setColor(config.color)
        let embed = noEmbed;
        if (command) {

            this.handler.modules.forEach(category => {
                categories.push({ command: category.aliases, description: category.description, category: category.category.id, ownerOnly: category.ownerOnly, cooldown: category.cooldown, ratelimit: category.ratelimit, editable: category.editable, typing: category.typing })
            })

            for (let i = 0; i < categories.length; i++) {
                if (categories[i].command[0] == command) {
                    embed
                        .setAuthor(categories[i].command[0], message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(categories[i].description)
                        .addFields(
                            { name: "Category", value: categories[i].category, inline: true },
                            { name: "Developer command", value: categories[i].ownerOnly, inline: true },
                            { name: "Cooldown", value: categories[i].cooldown, inline: true },
                            { name: "ratelimit", value: categories[i].ratelimit, inline: true },
                            { name: "editable", value: categories[i].editable, inline: true },
                            { name: "typing", value: categories[i].typing, inline: true }
                        )
                    break;
                }
            }
        }

        if (!command) {
            embed
                .setAuthor('Help message!', message.author.displayAvatarURL({ dynamic: true }))
                .setDescription("Run `?help <command>` to get detailed info!")
        }
        await message.util.send(embed)
        await message.react('✔️')
    }
};

module.exports = HelpCommand;
