/** @format */

import { XernerxSlashCommand } from 'xernerx';

export default class PlayCommand extends XernerxSlashCommand {
	constructor() {
		super('play', {
			name: 'play',
			description: 'Play the song someone is listening to',
			args: [
				{
					name: 'title',
					type: 'string',
					description: 'Title of the song.',
				},
				{
					name: 'artist',
					type: 'string',
					description: 'Artist or band of the song.',
				},
			],
		});
	}

	async exec(interaction, { args }) {
		await interaction.deferReply({ ephemeral: true });

		if (!args.title && !args.artist) {
			interaction.member.presence.activities.map((a) => {
				if (!['Spotify'].includes(a.name)) return;
				args.title = a.details;
				args.artist = a.state;
			});
		}

		if (!args.title) return await interaction.util.reply({ content: `You're not listening to any music!`, ephemeral: true });

		const song = `${args?.title} - ${args?.artist}`;

		this.client.distube.play(interaction.member.voice.channel, song, {
			member: interaction.member,
		});

		return await interaction.util.reply({ content: `Added ${song} to the queue!`, ephemeral: true });
	}
}
