/** @format */

import { XernerxSlashCommand, EmbedBuilder } from 'xernerx';

export default class NowPlayingCommand extends XernerxSlashCommand {
	constructor() {
		super('nowplaying', {
			name: 'now',
			description: 'now',
			subcommands: [
				{
					name: 'playing',
					description: 'Get the current song playing.',
				},
			],
		});
	}
	async exec(interaction) {
		await interaction.deferReply();

		const queue = this.client.distube.getQueue(interaction);

		if (!queue) return await interaction.util.reply({ content: `There is nothing playing right now.`, ephemeral: true });
		const song = queue.songs[0];
		const next = queue.songs[1] || song.related[0];

		const embed = new EmbedBuilder()
			.setTitle(song.name)
			.setAuthor({ name: `${song.user.globalName} is now playing`, iconURL: song.user.displayAvatarURL() })
			.setURL(song.url)
			.addFields([
				{
					name: 'Next up',
					value: `${next.name}`,
				},
			])
			.setImage(song.thumbnail)
			.setColor(this.client.config.color)
			.setTimestamp()
			.setFooter({ text: `${interaction.user.globalName}`, iconURL: interaction.user.displayAvatarURL() });

		return await interaction.util.reply({ embeds: [embed] });
	}
}
