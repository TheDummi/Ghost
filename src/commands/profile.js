const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');

const config = require('../data/botData/config.json');
const profile = require('../data/userData/profile.json');
const characters = require('../data/userData/characters.json');
const { setPresence, capitalize } = require('../funcs.js');


class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ["profile", "p"],
            category: "Destiny",
            description: "Check your or someone else's profile!",
            args: [
                {
                    id: 'user',
                    type: 'user',
                }
            ]
        })
    }

    async exec(message, args) {
        message.react('👀')
        let user = args.user || message.author
        if (!profile[user.id]) {
            await message.util.reply(`you don't have a profile yet! Make one with \`?setup\`!`)
            return await message.react('❌')
        }
        else {
            setPresence(this.client, "WATCHING", `${message.author.username} stalking ${user.username}'s profile...`, 'online')
            let p = profile[user.id];
            let c = characters[user.id];

            let name = p.name;
            let synced = p.synced;
            let grimoire = p.grimoire;
            let character = p.favourites.character;
            let raid = p.favourites.raid;
            let gamemode = p.favourites.gamemode;
            let weapon = p.favourites.weapon;
            let strike = p.favourites.strike;
            let subclass = p.favourites.subclass;

            function Synced() {
                if (synced == "yes") return " ";
                if (synced == "no") return " not ";
            }

            let embed = new Discord.MessageEmbed()
                .setAuthor(`${user.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setTitle('Basic info')
                .setDescription(`**PSN:** ${name}\n**Grimoire Score:** ${grimoire}`, true)
                .addField('Favourite-', `**Character:** ${character}\n**Subclass:** ${subclass}\n**Weapon:**${weapon}\n**Gamemode:** ${gamemode}\n**Strike:** ${strike}\n**Raid:** ${raid}`)
                .setFooter(`This account has${Synced()}been linked to a PS4`)
                .setColor(config.color)
                .setTimestamp()
            try {
                let firstType = c.firstCharacter.type;
                let firstLevel = c.firstCharacter.level;
                let firstLight = c.firstCharacter.light;
                let firstRaid = c.firstCharacter.raid;
                let firstExotics = c.firstCharacter.exotics;
                embed.addField(capitalize(firstType), `**Level:** ${firstLevel}\n**Light:** ${firstLight}\n**Raid-ready:** ${firstRaid}\n**Exotics:** ${firstExotics}`, true)
            }
            catch { embed.addField('Character 1', "Not set up.", true) }

            try {
                let secondType = c.secondCharacter.type;
                let secondLevel = c.secondCharacter.level;
                let secondLight = c.secondCharacter.light;
                let secondRaid = c.secondCharacter.raid;
                let secondExotics = c.secondCharacter.exotics;
                embed.addField(capitalize(secondType), `**Level:** ${secondLevel}\n**Light:** ${secondLight}\n**Raid-ready:** ${secondRaid}\n**Exotics:** ${secondExotics}`, true)
            }
            catch { embed.addField('Character 2', "Not set up.", true) }

            try {
                let thirdType = c.thirdCharacter.type;
                let thirdLevel = c.thirdCharacter.level;
                let thirdLight = c.thirdCharacter.light;
                let thirdRaid = c.thirdCharacter.raid;
                let thirdExotics = c.thirdCharacter.exotics;
                embed.addField(capitalize(thirdType), `**Level:** ${thirdLevel}\n**Light:** ${thirdLight}\n**Raid-ready:** ${thirdRaid}\n**Exotics:** ${thirdExotics}`, true)
            }
            catch { embed.addField('Character 3', "Not set up.", true) }

            await message.util.send(embed)
            await message.react('✔️')
        }
    }
}
module.exports = ProfileCommand;