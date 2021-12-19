const { Listener } = require('discord-akairo');
const config = require('../data/botData/config.json');
const moment = require('moment');
const { capitalize } = require('../funcs.js');
const Discord = require('discord.js')
class PresenceUpdateListener extends Listener {
    constructor() {
        super('presenceUpdate', {
            emitter: 'client',
            event: 'presenceUpdate'
        });
    }

    async exec(oldPresence, newPresence) {
        try {
            let member = this.client.users.cache.get(oldPresence.userID || newPresence.userID);
            if (member.bot) return;
            if (oldPresence.status == newPresence.status) return;
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${member.username} updated their status`, member.displayAvatarURL({ dynamic: true }))
                .addField('From', capitalize(oldPresence.status), true)
                .addField('To', capitalize(newPresence.status), true)
                .setTimestamp()
                .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            if (newPresence.status == "online") {
                embed.setColor("#7CFC00")
            }
            if (newPresence.status == "idle") {
                embed.setColor('#FFF000')
            }
            if (newPresence.status == "dnd") {
                embed.setColor('#FF0000')
                    .setFooter('Dnd = Do not Disturb')
            }
            if (newPresence.status == "offline") {
                embed.setColor('#808080')
            }
            for (let i = 0; i < oldPresence.activities.length; i++) {
                if ((oldPresence.activities[i].type && newPresence.activities[i].type == "CUSTOM_STATUS") && (oldPresence.activities[i].state == newPresence.activities[i].state)) {
                    embed.addField("Custom status", newPresence.activities[i].state)
                }
                else {
                    if (oldPresence.activities[i].type == "CUSTOM_STATUS") {
                        embed.addField("Old custom status", oldPresence.activities[i].state)
                    }
                    else if (newPresence.activities[i].type == "CUTOM_STATUS") {
                        embed.addField("New custom status", newPresence.activities[i].state)
                    }
                }
                if ((newPresence.activities[i].type == "PLAYING")) {
                    embed.addField('Playing', `Game: ${newPresence.activities[i].name}\nDetails: ${newPresence.activities[i].details}\nState: ${newPresence.activities[i].state}`)
                }
                if ((newPresence.activities[i].type == "LISTENING")) {
                    embed.addField('Listening', `App: ${newPresence.activities[i].name}\nSong: ${newPresence.activities[i].details}\nArtist: ${newPresence.activities[i].state}`)
                }

            }
            this.client.channels.cache.get('921735904144539678').send(embed)
        }
        catch (e) { console.error }
    }
}
module.exports = PresenceUpdateListener;