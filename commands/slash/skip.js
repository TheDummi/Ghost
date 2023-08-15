/** @format */

import { XernerxSlashCommand } from 'xernerx';

export default class SkipCommand extends XernerxSlashCommand {
	constructor() {
		super('skip', {
			name: 'skip',
			description: 'Skip the current playing song.',
		});
	}

	async exec(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const queue = this.client.distube.getQueue(interaction);

		if (!queue) return await interaction.util.reply({ content: `There is no queue to skip.`, ephemeral: true });

		queue.skip();

		return await interaction.util.reply({ content: `Skipped!`, ephemeral: true });
	}
}
