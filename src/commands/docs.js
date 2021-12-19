const got = require("got");
const Discord = require("discord.js")
const { Command } = require('discord-akairo');
const config = require('../data/botData/config.json');

class DocsCommand extends Command {
    constructor() {
        super('docs', {
            aliases: ['docs'],
            category: 'Developer',
            description: 'Get methods of a class or manager.',
            ownerOnly: true,
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'class',
                    type: 'string',
                    match: 'rest'
                }
            ]
        })
    }


    async exec(message, args) {
        message.react('👀')
        let color = config.color;
        got.get('https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json').then(async response => {
            const body = JSON.parse(response.body)
            let classes = new Discord.Collection();
            body.classes.forEach(e => {
                classes.set(e.name, e)
            });
            let findClass = (message) => {
                return classes.find(e => e.name.toLowerCase() == args.class) || null
            };
            let c = findClass(message);
            if (c === null) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Could not find that class!", message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription('[Discord.js](https://discord.js.org/#/docs/main/stable/general/welcome)\n[Discord-Akairo](https://discord-akairo.github.io/#/docs/main/master/general/welcome)\n[Discord-Akairo-master](https://discord-akairo.github.io/#/docs/main/master/class/AkairoClient)\n[Discord-Sapphire](https://www.sapphirejs.dev/docs/General/Welcome)')
                    .setColor(color)
                await message.util.send(embed)
                return await message.react('❌')

            }
            else {
                if (c.props === undefined || c.methods === undefined) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(c.name, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`${c.description.replace("<warn>", "```").replace("</warn>", "```")}\n\n[Docs link](http://discord.js.org/#/docs/main/stable/class/${c.name})`)
                        .setFooter("For this class either there was not a single method or there wan not a single property. This caused me to exclude both, because if it didn't it would make the programers' life much harder.")
                        .setColor(color)
                    return await message.util.send(embed)
                }
                let props = "";
                c.props.forEach(e => {
                    props = `${props}**${e.name}**: ${e.description}\n\n`
                })
                let meths = "";
                c.methods.forEach(e => {
                    meths = `${meths}**${e.name}**: ${e.description}\n\n`
                })
                let embed = new Discord.MessageEmbed()
                    .setAuthor(c.name, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`${c.description.replace("<warn>", "```").replace("</warn>", "```")}\n\n[Docs link](http://discord.js.org/#/docs/main/stable/class/${c.name})`)
                    .addField("| Properties", props, true)
                    .addField("| Methods", meths, true)
                    .setColor(color)
                await message.react('✔️')
                return await message.util.send(embed).catch(async e => {
                    let propsSlim = "";
                    c.props.forEach(e => {
                        propsSlim = `${propsSlim}${e.name}\n\n`
                    })
                    let methsSlim = "";
                    c.methods.forEach(e => {
                        methsSlim = `${methsSlim}${e.name}\n\n`
                    })
                    let embedSlim = new Discord.MessageEmbed()
                        .setAuthor(c.name, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`${c.description}\n\n[Docs link](http://discord.js.org/#/docs/main/stable/class/${c.name})`)
                        .addField("| Properties", props, true)
                        .addField("| Methods", meths, true)
                        .setFooter("This response was minified to get around the discord character limit")
                        .setColor(color)
                    await message.util.send(embedSlim).catch(async e => {
                        let embedSuperSlim = new Discord.MessageEmbed()
                            .setAuthor(c.name, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`${c.description.replace("<warn>", "```").replace("</warn>", "```")}\n\n[Docs link](http://discord.js.org/#/docs/main/stable/class/${c.name})`)
                            .setFooter("This response was super minified to get around the discord character limit")
                            .setColor(color)
                        await message.util.send(embedSuperSlim)
                    })
                    return await message.react('✔️')
                })
            }
        });

    }
};

module.exports = DocsCommand;