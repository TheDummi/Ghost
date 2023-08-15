/** @format */

import { XernerxContextCommand } from 'xernerx';

export default class SkipSongCommand extends XernerxContextCommand {
	constructor() {
		super('skipsong', {
			name: 'Skip Song',
			description: 'Play the song someone is listening to',
			type: 'user',
		});
	}

	async exec(interaction, args) {
		await interaction.deferReply({ ephemeral: true });

		if (this.client.user.id !== args.id) return await interaction.util.reply({ content: `This command can only be used on ${this.client.user}`, ephemeral: true });

		const queue = this.client.distube.getQueue(interaction);

		if (!queue) return await interaction.util.reply({ content: `There is no queue to skip.`, ephemeral: true });

		queue.skip();

		return await interaction.util.reply({ content: `Skipped!`, ephemeral: true });
	}
}
