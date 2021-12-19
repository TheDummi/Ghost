const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const fs = require('fs')

const { setPresence } = require('../funcs.js')

const characters = require('../data/userData/characters.json')

class CharacterCommand extends Command {
    constructor() {
        super('character', {
            aliases: ["character", "char"],
            category: "Destiny",
            description: "Setup your 3 destiny characters.",
            args: [
                {
                    id: 'option',
                    type: ['1', '2', '3'],
                    prompt: {
                        start: "What number of character is this guardian? (`1`, `2` or `3`)",
                        retry: "`1`, `2` or `3`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 30000,
                        retries: 5
                    }
                },
                {
                    id: 'type',
                    type: ['warlock', 'hunter', 'titan'],
                    prompt: {
                        start: "what character is this? (`warlock`, `hunter` or `titan`)",
                        retry: "`warlock`, `hunter` or `titan`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 30000,
                        retries: 5
                    }
                },
                {
                    id: 'level',
                    type: 'number',
                    prompt: {
                        start: "What level is this character? (min: `1`, max: `40`)",
                        retry: "min: `1`, max: `40`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 30000,
                        retries: 5
                    }
                },
                {
                    id: 'light',
                    type: 'number',
                    prompt: {
                        start: "What light is this character? (min: `3`, max: `335`)",
                        retry: "min: `3`,max: `335`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 30000,
                        retries: 5
                    }
                },
                {
                    id: 'raid',
                    type: ['yes', 'no'],
                    prompt: {
                        start: "Can you do all raids with this character? (`yes` or `no`)",
                        retry: "`yes` or `no`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 30000,
                        retries: 5
                    }
                },
                {
                    id: 'exotics',
                    type: 'number',
                    prompt: {
                        start: "How many exotics of this character do you have? (min: `0`, max warlock: `19`,max hunter: `20`, max titan: `20`)",
                        retry: "min: `0`, max warlock: `19`,max hunter: `20`, max titan: `20`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 30000,
                        retries: 5
                    }
                }
            ]
        })
    }
    async exec(message, args) {
        message.react('👀');

        let user = message.author;
        let option = args.option;
        let type = args.type;
        let level = args.level;
        let light = args.light;
        let raid = args.raid;
        let exotics = args.exotics;

        setPresence(this.client, "WATCHING", `${user.username} setup his character.`)

        if (!characters[user.id]) {
            characters[user.id] = {
                firstCharacter: {
                    type: null,
                    level: 0,
                    light: 0,
                    raid: false,
                    exotics: 0,
                },
                secondCharacter: {
                    type: null,
                    level: 0,
                    light: 0,
                    raid: false,
                    exotics: 0,
                },
                thirdCharacter: {
                    type: null,
                    level: 0,
                    light: 0,
                    raid: false,
                    exotics: 0,
                }
            }
        }

        if (level > 40 || level < 1) {
            message.react('❌')
            return message.util.reply('character must be between level 1 and 40!')
        }
        if (light > 335 || light < 3) {
            message.react('❌')
            return message.util.reply('character must be between light 3 and 335!')
        }
        if ((type == "warlock" && (exotics > 19 || exotics < 0)) || (type == "warlock" && (exotics > 19 || exotics < 0)) || (type == "warlock" && (exotics > 19 || exotics < 0)) || ((type == "hunter" && (exotics > 20 || exotics < 0)) || (type == "hunter" && (exotics > 20 || exotics < 0)) || (type == "hunter" && (exotics > 20 || exotics < 0))) || ((type == "titan" && (exotics > 20 || exotics < 0)) || (type == "titan" && (exotics > 20 || exotics < 0)) || (type == "titan" && (exotics > 20 || exotics < 0)))) {
            message.react('❌')
            return message.util.reply(`you can't have ${exotics} exotics on a ${type}!`)
        } if (characters[user.id].firstCharacter.type == null || characters[user.id].secondCharacter.type == null || characters[user.id].thirdCharacter.type == null) {


            if (option == "1") {
                characters[user.id].firstCharacter = {
                    type: type,
                    level: level,
                    light: light,
                    raid: raid,
                    exotics: exotics
                }
            }
            if (option == "2") {
                characters[user.id].secondCharacter = {
                    type: type,
                    level: level,
                    light: light,
                    raid: raid,
                    exotics: exotics
                }
            }
            if (option == "3") {
                characters[user.id].thirdCharacter = {
                    type: type,
                    level: level,
                    light: light,
                    raid: raid,
                    exotics: exotics
                }
            }
        }

        else {
            await message.util.reply(`you've already set up character ${option}! use \`?update\`, to update your progress.`);
            return await message.react('❌');
        }

        fs.writeFile('src/data/userData/characters.json', JSON.stringify(characters), (err) => {
            if (err) {
                console.log(err)
                return message.react('❌')
            };
        });

        await message.util.reply(`setup character ${option} to be your ${type}!`)
        return await message.react('✔️')
    }
}
module.exports = CharacterCommand;