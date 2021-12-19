const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const { randColor } = require('../funcs.js');

const { levelRole, VLevelRole } = require('../data/botData/config.json')

class ChangeCommand extends Command {
    constructor() {
        super('change', {
            aliases: ["change", "cc"],
            category: "Developer",
            ownerOnly: true,
            description: "Change the color of Vlevel and level 100",
            args: [
                {
                    id: 'option',
                    type: ['Vlvl', 'lvl'],
                    prompt: {
                        start: "What role?"
                    }
                },
                {
                    id: 'color',
                    type: 'string',
                    default: randColor()
                }
            ]
        })
    }
    async exec(message, args) {
        message.react('👀');
        let color = args.color;
        let option = args.option;
        let roles = new Discord.Collection()
        this.client.guilds.cache.forEach(g => {
            g.roles.cache.forEach(r => {
                roles.set(r.id, r)
            })
        })
        roles.get('id')
        if (option == 'lvl') {
            try {
                let level = roles.get(levelRole)
                if (option == 'lvl') {
                    await level.edit({
                        color: randColor(),
                    })
                }
            }
            catch (err) {
                await message.util.reply(err)
                return await message.react('❌')
            }
        }
        if (option == 'Vlvl') {
            try {
                let VLevel = roles.get(VLevelRole)
                if (option == 'Vlvl') {
                    await VLevel.edit({
                        color: randColor(),
                    })
                }
            }
            catch (err) {
                await message.util.reply(err);
                return await message.react('❌');
            }
            finally {
                await message.util.reply(`Changed ${option} color to #${color}!`);
                await this.client.commandHandler.reload('change');
                return await message.react('✔️');
            }
        }
    }
};

module.exports = ChangeCommand;