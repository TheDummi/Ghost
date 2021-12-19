const { Listener } = require('discord-akairo');
const config = require('../data/botData/config.json');
const moment = require('moment');
const { random, randColor, setPresence, randomUser } = require('../funcs.js');
const Discord = require('discord.js')
class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        let client = this.client;

        setPresence(client, "LISTENING", "guardians || prefix: ?", "online")
        setInterval(() => {
            setPresence(client, "WATCHING", `${randomUser(client)}'s every move 👀`, "idle")
        }, 300000);

        let roles = new Discord.Collection()
        client.guilds.cache.forEach(g => {
            g.roles.cache.forEach(r => {
                roles.set(r.id, r)
            })
        })

        roles.get('id')
        let level = roles.get('806418917941182484')
        setInterval(async function () {
            await level.edit({
                color: randColor(),
            })
        }, 600000);

        let VLevel = roles.get('806418905467584553')
        setInterval(async function () {
            await VLevel.edit({
                color: randColor(),
            })
        }, 600000);

        let time = () => moment(Number(new Date())).format("H:mm:ss")
        console.log(`${time()} | ${client.user.username} is online`)
    }
}

module.exports = ReadyListener;