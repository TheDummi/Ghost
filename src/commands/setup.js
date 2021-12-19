const { Command } = require('discord-akairo');
const Discord = require('discord.js')

const profile = require('../data/userData/profile.json');
const { setPresence, capitalize } = require('../funcs.js')

const fs = require('fs');

class SetupCommand extends Command {
    constructor() {
        super('setup', {
            aliases: ["setup"],
            category: "Destiny",
            description: "Setup your Destiny profile.",
            args: [
                {
                    id: "name",
                    type: "string",
                    prompt: {
                        start: "What is your PSN? (min: `8`, max `16` characters)",
                        retry: "min: `8`, max `16` characters?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                },
                {
                    id: "synced",
                    type: ["yes", "no"],
                    prompt: {
                        start: "Have you synced with PS4? (`yes` or `no`)",
                        retry: "`yes ` or `no`",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                },
                {
                    id: "grimoire",
                    type: "number",
                    prompt: {
                        start: "What is your grimoire score? (min: `0`, max `5050`)",
                        retry: "min: `0`, max: `5050`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                },
                {
                    id: "character",
                    type: ["warlock", "hunter", "titan"],
                    prompt: {
                        start: "What is your favourite character? (`warlock`, `hunter` or `titan`)",
                        retry: "`warlock`, `hunter` or `titan`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                },
                {
                    id: 'raid',
                    type: ["vault of glass", "crota's end", "king's fall"],
                    prompt: {
                        start: "What is your favourite raid? (`vault of glass`, `crota's end` or `king's fall`)",
                        retry: "`vault of glass`, `crota's end` or `king's fall`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                },
                {
                    id: "gamemode",
                    type: ["PvE", "PvP"],
                    prompt: {
                        start: "What do you prefer playing? (`PvE` or `PvP`)",
                        retry: "`PvE` or `PvP`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                },
                {
                    id: "weapon",
                    type: "string",
                    prompt: {
                        start: "What's your favourite weapon?",
                        retry: "What?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                },
                {
                    id: "strike",
                    type: "string",
                    prompt: {
                        start: "What is your favourite strike?",
                        retry: "What?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                },
                {
                    id: "subclass",
                    type: ["voidwalker", "sunsinger", "stormcaller", "nightstalker", "gunslinger", "bladedancer", "defender", "sunbreaker", "striker"],
                    prompt: {
                        start: "What's your favourite subclass? (`voidwalker`, `sunsinger`, `stormcaller`, `nightstalker`, `gunslinger`, `bladedancer`, `defender`, `sunbreaker` or `striker`)",
                        retry: "`voidwalker`, `sunsinger`, `stormcaller`, `nightstalker`, `gunslinger`, `bladedancer`, `defender`, `sunbreaker` or `striker`?",
                        cancel: "Cancelled your setup guardian!",
                        ended: "I didn't get it guardian, rerun the command...",
                        timeout: "You took too long guardian...",
                        time: 300000,
                        retries: 5
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        message.react('👀')
        let user = message.author;

        setPresence(this.client, "WATCHING", `${user.username} set-up their profile`, 'online');

        if (profile[user.id]) {
            message.react('❌')
            return message.util.reply('you already have a profile!')
        }

        if (!profile[user.id]) {
            profile[user.id] = {
                name: null,
                synced: false,
                grimoire: 0,
                favourites: {
                    character: null,
                    raid: null,
                    gamemode: null,
                    weapon: null,
                    strike: null,
                    subclass: null,
                }
            }
        }

        let name = args.name;
        let synced = args.synced;
        let grimoire = args.grimoire;
        let character = capitalize(args.character);
        let raid = capitalize(args.raid);
        let gamemode = args.gamemode;
        let weapon = capitalize(args.weapon);
        let strike = capitalize(args.strike);
        let subclass = capitalize(args.subclass);

        try {
            message.member.setName(name)
        }
        catch (e) {
            message.react('❌')
            console.error
        }

        profile[user.id] = {
            name: name,
            synced: synced,
            grimoire: grimoire,
            favourites: {
                character: character,
                raid: raid,
                gamemode: gamemode,
                weapon: weapon,
                strike: strike,
                subclass: subclass,
            }
        }

        fs.writeFile('src/data/userData/profile.json', JSON.stringify(profile), (err) => {
            if (err) {
                console.log(err);
                return message.react('❌');
            }
        })
        message.util.reply(`set-up your profile under the name ${name}!`)
        return message.react('✔️')
    }
}

module.exports = SetupCommand;