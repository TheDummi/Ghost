
const { Command } = require('discord-akairo');
const Discord = require('discord.js');

const Package = require('../../package.json')
const config = require('../data/botData/config.json');
const destiny = require('../data/gameData/destiny.json');
const { setPresence, getUptime, capitalize } = require('../funcs.js');

let color = config.color;

let startEmbed = new Discord.MessageEmbed()
    .setTitle('Info')
    .setDescription('What do you want to know guardian? I\'m pretty sure I can find it in my archives... or maybe on venus... anyways, let\'s hear it!')
    .setColor(color)

let retryEmbed = new Discord.MessageEmbed()
    .setTitle('Oh no!')
    .setDescription('That has not been registered in my archives yet... Maybe you can inform me about it? Or try to look up something else...')
    .setColor(color)

let endedEmbed = new Discord.MessageEmbed()
    .setTitle('Oh no!')
    .setDescription('I have failed you guardian... I couldn\'t find anything related to it... I will go study it right away guardian!')
    .setColor(color)
class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info'],
            category: 'Destiny',
            description: 'Get info about the Destiny Universe.',
            channel: 'guild',
            args: [{
                id: 'string',
                type: "string",
                match: "restContent",
                prompt: {
                    start: startEmbed,
                    retry: retryEmbed,
                    cancel: "I cancelled your request guardian!",
                    timeout: "Maybe I can help you nedt time guardian...",
                    ended: endedEmbed
                }
            }]
        })
    }

    async exec(message, args) {
        message.react('👀');
        setPresence(this.client, "LISTENING", `info of ${args.string} requested by ${message.author.username}!`, "online");
        let string = args.string.toLowerCase();
        let embed = retryEmbed
        let ownersArray = [];
        let contributorsArray = [];
        for (let i = 0; i < config.owners.length; i++) {
            let user = this.client.users.cache.get(config.owners[i])
            ownersArray.push(user.tag)
        }

        for (let i = 0; i < config.contributors.length; i++) {
            let user = this.client.users.cache.get(config.contributors[i])
            contributorsArray.push(user.tag)
        }
        if (string == "bot" || string == `<@!${this.client.user.id}>`) {
            embed
                .setAuthor('Info about me!', message.author.displayAvatarURL({ dynamic: true }))
                .setTitle('')
                .setDescription(`Hi there! I'm ${this.client.user} and I'm the Destiny Archives on Discord, and many have more features!\n\nIf you wonder what my reactions mean, here is a little legend.\n\n👀 - I seen it, and I'm processing it.\n❌ - The command failed or errored somewhere, or you made a mistake.\n✔️ - The command got executed without any problems.`)
                .addFields(
                    { name: "Owners", value: ownersArray, inline: true },
                    { name: "Contributors", value: contributorsArray, inline: true },
                    { name: "Current Status", value: capitalize(this.client.presence.activities[0].type + " " + this.client.presence.activities[0].name) },
                    { name: 'Library', value: "Discord.js", inline: true },
                    { name: 'Version', value: Package.version, inline: true },
                    { name: 'Uptime', value: getUptime(this.client).noSecUptime }
                )
            await message.util.send(embed);
            return await message.react('✔️')
        }
        for (const data in destiny) {
            let d = destiny[data];
            if (d.name.toLowerCase() !== string) {
                continue;
            }
            embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(d.name)
                .setImage(d.icon)
                .setDescription(d.description)
                .setFooter('All information is based on the "The Taken King" dlc.', message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            if (d.rank) {
                function getColor() {
                    let newColor = color
                    if (d.rank == "Exotic") return newColor = "#FFF000";
                    if (d.rank == "Legendary") return newColor = "#3B0054";
                    if (d.rank == "Rare") return newColor = '#02198B';
                    if (d.rank == "Uncommon") return newColor = "#99EBCB";
                    if (d.rank == "Common") return newColor = '#FFFFFF';
                    return newColor;
                }
                embed.setColor(getColor())
            }
            if (d.tactic) {
                embed.addField('Tactic', d.tactic, true)
            }
            if (d.note) {
                embed.addField('Note', d.note)
            }
            if (d.rank) {
                embed.addField('Rank/Rarity', d.rank, true)
            }
            if (d.element) {
                embed.addField('Elements', d.element, true)
            }
            if (d.homePlanet) {
                embed.addField('Home Planet', d.homePlanet, true)
            }
            if (d.story) {
                embed.addField('Story Missions', d.story, true)
            }
            if (d.strikes) {
                embed.addField('Strike Missions', d.strikes, true)
            }
            if (d.raid) {
                embed.addField('Raid', d.raid, true)
            }
            if (d.location || d.planet) {
                if (d.location && d.planet) {
                    embed.addField('Location', d.location + ", " + d.planet, true)
                }
                else if (d.location) {
                    embed.addField('Location', d.location, true)
                }
                else if (d.planet) {
                    embed.addField('Planet', d.planet, true)
                }
            }
            if (d.appearance) {
                embed.addField('Appearances', d.appearance, true)
            }
            if (d.leader) {
                embed.addField('Leader', d.leader, true)
            }
            if (d.species) {
                embed.addField('Specimen', d.species, true)
            }
            if (d.ultra) {
                embed.addField('Ultra', d.ultra, true)
            }
            if (d.class) {
                embed.addField('Class', d.class, true)
            }
            if (d.requirements) {
                embed.addField('Requirements', d.requirements, true)
            }
            if (d.baseLight) {
                embed.addField('base Light', d.baseLight, true)
            }
            if (d.maxLight) {
                embed.addField('Max light', d.maxLight, true)
            }
            if (d.slot) {
                embed.addField('Slot', d.slot + " " + d.tag, true)
            }
            if (d.obtainable) {
                embed.addField('How to obtain', d.obtainable)
            }
            if (d.rof && d.impact && d.range && d.stability && d.reload) {
                embed.addField('In-Game stats', `**Rate of Fire:** ${d.rof}/100\n**Impact:** ${d.impact}/100\n**Range:** ${d.range}/100\n**Stability:** ${d.stability}/100\n**Reload Speed:** ${d.reload}/100`, true)
            }
            if (d.magazine && d.zoom && d.aim && d.recoil && d.speed) {
                embed.addField('Extra stats', `**Magazine size:** ${d.magazine}\n**Zoom:** ${d.zoom}\n**Aim Assist:** ${d.aim}\n**Recoil:** ${d.recoil}\n**Equip Speed:** ${d.speed}`, true)
            }
            if (d.basePerks && d.firstTierPerks && d.secondTierPerk && d.thirdTierPerks && d.fourthTierPerk) {
                embed.addField('Perks', `**Base:** ${d.basePerks}\n**Tier 1:** ${d.firstTierPerks}\n **Tier 2:** ${d.secondTierPerk}\n**Tier 3:** ${d.thirdTierPerks}\n**Tier 4:** ${d.fourthTierPerk}`)
            }
            if (d.bestWeapons) {
                embed.addField(`Top ${d.bestWeapons.length} best ${d.name}s.`, d.bestWeapons)
            }
            if (d.bestUsePVP && d.bestUsePVE) {
                embed.addFields({ name: 'Recommended Crucible Perks', value: d.bestUsePVP, inline: true }, { name: 'Recommended PVE Perks', value: d.bestUsePVE, inline: true })
            }
            break;
        }

        await message.util.send(embed)
        return await message.react('✔️')
    }
}
module.exports = InfoCommand;