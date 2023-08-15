/** @format */

import { XernerxContextCommand } from 'xernerx';

export default class ListenToSongCommand extends XernerxContextCommand {
	constructor() {
		super('listentosong', {
			name: 'Listen To Song',
			description: 'Play the song someone is listening to',
			type: 'user',
		});
	}

	async exec(interaction, args) {
		await interaction.deferReply({ ephemeral: true });

		const user = await interaction.guild.members.fetch(args.id);
		const presence = user.presence.activities.map((a) => (['Spotify'].includes(a.name) ? { title: a.details, artist: a.state } : null)).filter((x) => x)[0];

		if (!presence.title) return await interaction.util.reply({ content: `${args} isn't listening to any music!`, ephemeral: true });

		const song = `${presence?.title} - ${presence?.artist}`;

		this.client.distube.play(interaction.member.voice.channel, song, {
			member: interaction.member,
		});

		return await interaction.util.reply({ content: `Added ${song} to the queue!`, ephemeral: true });
	}
}
