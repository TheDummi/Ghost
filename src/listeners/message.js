const { Listener, Command } = require('discord-akairo');
const moment = require('moment');
const Discord = require('discord.js');
const config = require('../data/botData/config.json');
const { } = require('../funcs.js');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        if (message.author.id == this.client.user.id) {
            message.react('✖️')
            const filter = (reaction, user) => (reaction.emoji.name === '✖️' && user.id !== message.author.id)
            message.awaitReactions(filter, { max: 1 })
                .then(collected => {
                    if (filter, { max: 1 }) {
                        message.delete()
                    }
                })
                .catch(console.error);
        }
        if (message.author.bot) return;

        let command = message.content.toLowerCase();

        if (command.startsWith("banana")) {
            return await message.reply('Here have a banana::banana:!')
        }

        if (command.startsWith(`<@!${this.client.user.id}>`)) {
            message.react('👀');
            let embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor(`Hello there, ${message.member.nickname || message.author.username}!`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`My prefixes are ${config.prefixes} and ${this.client.user}.\nRun ${config.prefixes}commands to get a commands list.`)
            message.channel.send(embed)
        }

        if (command.includes('dummi') || command.includes("<@!" + config.owners[0] + ">")) {
            if (message.guild == false) return;
            if (message.author.id == config.owners[0]) return;
            else {
                message.react('👀')
                let invite = message.url
                invite = await invite
                let anEmbed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username} mentioned you!`)
                    .setURL(invite)
                    .setColor(config.color)
                    .setFooter(`This was said in ${message.channel.name}, ${message.guild.name}.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                if (command.length > 1983) {
                    message.content = "Click the link above to see the message!"
                }
                if (message.attachments.array()) {
                    try {
                        let attachment = await message.attachments.array();
                        let attached = "";
                        for (let i = 0; i < attachment.length; i++) {
                            attached = await attachment[i].attachment;
                        }
                        await anEmbed
                            .setImage(attached.toString())
                            .setDescription(`Message content: ${message.content}`)
                    }
                    catch (e) { }
                }
                this.client.users.fetch(config.owners[0])
                    .then(owner => {
                        owner.send(anEmbed)
                    })
            }
        }
        if (message.channel.type === 'news') {
            message.crosspost()
                .then((message) => message.react('📣'))
                .catch(console.error)
        }
    }
};

module.exports = MessageListener;