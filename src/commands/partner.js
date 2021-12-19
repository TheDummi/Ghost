const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const config = require('../data/botData/config.json');

const { setPresence } = require('../funcs.js')

class PartnerCommand extends Command {
    constructor() {
        super('partner', {
            aliases: ["partner", 'advertise'],
            description: 'Send a partnership to partnership channel',
            category: "Developer",
            channel: "guild",
            ownerOnly: true,
            args: [
                {
                    id: 'name',
                    type: "string",
                    prompt: {
                        start: 'What is the name of the server? `required`',
                        retry: 'What is the name of the server? `required`',
                        ended: 'Ran out of tries.',
                        timeout: 'Took too long.',
                        cancel: 'Cancelled your request!'
                    }
                },
                {
                    id: 'description',
                    type: 'string',
                    prompt: {
                        start: 'What is the description of the server? `required`',
                        retry: 'What is the description of the server? `required`',
                        ended: 'Ran out of tries.',
                        timeout: 'Took too long.',
                        cancel: 'Cancelled your request!'
                    }
                },
                {
                    id: 'icon',
                    type: 'string',
                    prompt: {
                        start: 'What is the icon of the server?',
                        retry: 'What is the icon of the server?',
                        ended: 'Ran out of tries.',
                        timeout: 'Took too long.',
                        cancel: 'Cancelled your request!'
                    }
                },
                {
                    id: 'tags',
                    type: 'string',
                    prompt: {
                        start: 'What are some tags of the server?',
                        retry: 'What are some tags of the server?',
                        ended: 'Ran out of tries.',
                        timeout: 'Took too long.',
                        cancel: 'Cancelled your request!'
                    }
                },
                {
                    id: 'link',
                    type: 'string',
                    prompt: {
                        start: 'What is the server invite link? `required`',
                        retry: 'What is the server invite link? `required`',
                        ended: 'Ran out of tries.',
                        timeout: 'Took too long.',
                        cancel: 'Cancelled your request!'
                    }
                },
                {
                    id: 'color',
                    type: 'string',
                    prompt: {
                        start: 'What color would you represent the server with?',
                        retry: 'What color would you represent your server with?',
                        ended: 'Ran out of tries.',
                        timeout: 'Took too long.',
                        cancel: 'Cancelled your request!'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        message.react('👀')
        let channel = this.client.channels.cache.get(config.partnerChannel);

        let name = args.name;
        let description = args.description;
        let icon = args.icon;
        let tags = args.tags;
        let link = args.link;
        let color = args.color;

        let embed = new Discord.MessageEmbed()
            .setTitle(name)
            .setDescription(description + `\n\n[Click here to ${name}](${link})!`)
            .setURL(link)
            .setColor(config.color)
        if (icon !== "none") {
            embed.setThumbnail(icon)
        }
        if (tags !== "none") {
            embed.addField('Tags', tags, true)
        }
        if (color !== "none") {
            embed.setColor(color)
        }
        await channel.send(embed)
        await embed.setFooter('This is the embed that got send as a partnership!')
        await message.util.send(embed)
        await setPresence(this.client, "WATCHING", `${message.author} partner ${message.guild} with ${name}!`, 'online')
        return await message.react('✔️')
    }
}

module.exports = PartnerCommand;