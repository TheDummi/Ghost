/** @format */
import { XernerxEvent } from 'xernerx';
export default class ReadyEvent extends XernerxEvent {
    constructor() {
        super('ready', {
            name: 'ready',
            type: 'discord',
            once: false,
        });
    }
    // @ts-ignore
    async run(client) {
        setInterval(async () => {
            const guild = await this.client.guilds.fetch(this.client.settings.local);
            if (!guild)
                return;
            const roles = ['762077868334514217', '806418905467584553', '806418917941182484'];
            for (const role of roles) {
                const r = await guild.roles.fetch(role);
                r?.edit({ color: this.color() });
            }
        }, 10 * 60000);
    }
    color() {
        let hex = '#';
        for (let i = 0; i < 6; i++) {
            const hexa = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E'];
            hex += hexa[Math.floor(Math.random() * hexa.length)];
        }
        return hex;
    }
}
