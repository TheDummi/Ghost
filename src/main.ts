/** @format */

import XernerxClient, { XernerxIntents } from 'xernerx';

import config from './data/config.js';

new (class Client extends XernerxClient<typeof config> {
	constructor() {
		super(
			{
				intents: XernerxIntents.All,
			},
			{
				local: '689260593080696833',
				ownerId: '482513687417061376',
				log: {
					ready: true,
					info: true,
					error: true,
					warn: true,
				},
			},
			config
		);

		this.modules.eventHandler.loadEvents({
			directory: './dist/events',
		});

		this.connect(this.config.token);
	}
})();
