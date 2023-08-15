/** @format */

import { XernerxEvent, ActivityType } from 'xernerx';

export default class ReadyEvent extends XernerxEvent {
	constructor() {
		super('ready', {
			name: 'ready',
			type: 'discord',
			emitter: 'client',
		});
	}

	async run(client) {
		this.client.util.setPresence({
			interval: 300000,
			text: `${this.client.listening.length} servers listening to me!`,
			type: ActivityType.Watching,
		});
	}
}
