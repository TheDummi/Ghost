/** @format */

import { XernerxInhibitor } from 'xernerx';

export default class UserInhibitor extends XernerxInhibitor {
	constructor() {
		super('user', {
			name: 'user',
			type: 'user',
		});
	}

	async check(interaction, args, user) {
		if (!interaction.member.voice.channel) return interaction.util.reply({ content: `You need to be in a voice channel to use this command.`, ephemeral: true });
	}
}
