/** @format */

import XernerxClient, { XernerxLog } from 'xernerx';
import XernerxCommands from 'xernerx-commands';
import Distube from 'distube';

import config from './config/config.js';
import { DeezerPlugin } from '@distube/deezer';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';

new (class Client extends XernerxClient {
	constructor() {
		super(
			{ intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildVoiceStates', 'GuildPresences', 'GuildMembers'] },
			{
				ownerId: ['482513687417061376'],
				local: '689260593080696833',
				log: {
					ready: true,
					info: true,
					error: true,
				},
			},
			config
		);

		this.modules.commandHandler.loadMessageCommands({
			directory: './commands/message',
			prefix: ['.'],
			handleDeletes: true,
			handleEdits: true,
			handleTyping: true,
			allowMention: true,
		});

		this.modules.commandHandler.loadSlashCommands({
			directory: './commands/slash',
		});

		this.modules.commandHandler.loadContextCommands({
			directory: './commands/context',
		});

		this.modules.eventHandler.loadEvents({
			directory: './events',
		});

		this.modules.inhibitorHandler.loadInhibitors({
			directory: './inhibitors',
		});

		this.modules.extensionHandler.loadExtensions(new XernerxCommands(this));

		this.distube = new Distube.default(this, {
			leaveOnEmpty: true,
			leaveOnFinish: false,
			leaveOnStop: false,
			nsfw: true,
			plugins: [new DeezerPlugin(), new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin()],
		});

		this.listening = [];

		this.distube.on('initQueue', (queue) => {
			queue.autoplay = true;
			queue.volume = 100;

			this.listening.push(queue.id);

			new XernerxLog(this).info(`${queue.id} started listening, current listeners: ${this.listening.length}`);
		});

		this.distube.on('disconnect', (queue) => {
			this.listening.splice(this.listening.indexOf(queue.id), 1);

			new XernerxLog(this).info(`${queue.id} stopped listening, current listeners: ${this.listening.length}`);
		});

		this.connect(this.config.token);
	}
})();
