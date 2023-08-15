/** @format */

import { EmbedBuilder, XernerxContextCommand } from 'xernerx';

export default class NowPlayingCommand extends XernerxContextCommand {
	constructor() {
		super('nowplaying', {
			name: 'Now Playing',
			description: 'Play the song someone is listening to',
			type: 'user',
		});
	}

	async exec(interaction, args) {
		await interaction.deferReply();

		if (this.client.user.id !== args.id) return await interaction.util.reply({ content: `This command can only be used on ${this.client.user}`, ephemeral: true });

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
