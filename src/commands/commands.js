const { paginate, randColor } = require("../funcs.js");
const { Command, AkairoModule } = require('discord-akairo');
const config = require('../data/botData/config.json');
const Discord = require("discord.js");

const nameWeight = {
	'destiny': 1,
	'help': 3,
	'admin': 4,
	'info': 5,
	'utility': 6,
	'owner': 7
}
class CommandsCommand extends Command {
	constructor() {
		super('commands', {
			aliases: ['commands', 'cmd', 'command', 'cmds'],
			category: 'Help',
			description: 'Get a paginating commands list.',
			ownerOnly: false,
			channel: ['guild', 'dm']
		});
	}

	async exec(message) {
		message.react('👀')
		let categories = [];
		let embeds = [];
		let runnableCommands = [];
		this.handler.modules.forEach(e => {
			if (!categories.includes(e.category.id)) {
				categories.push(e.category.id)
			}
			if (e.ownerOnly) {
				if (this.client.ownerID.includes(message.author.id)) {
					return runnableCommands.push(e)
				}
				else {
					return;
				}
			}
			else {
				runnableCommands.push(e)
			}
		});
		categories = categories.sort((a, b) => {
			return nameWeight[a] - nameWeight[b];
		})
		let niceCategories = "";
		let color = config.color;
		for (let i = 0; i < categories.length; i++) {
			embeds[i] = new Discord.MessageEmbed()
				.setTitle(categories[i])
				.setColor(color)
			try {
				embeds[i] = embeds[i].setThumbnail(message.guild.iconURL({ dynamic: true }))
			}
			catch {
				embeds[i] = embeds[i].setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			}
			for (const item of this.handler.modules.filter(e => e.category.id === categories[i]).sort().array()) {
				if (!runnableCommands.includes(item)) continue;
				try {
					embeds[i].addField(item.aliases[0], item.description.toString(), true)
				} catch {
					embeds[i].addField(item.aliases[0], "ERROR", true)
				}

			}
		}
		for (const e of embeds) {
			if (e.fields.length == 0) {
				let i = embeds.indexOf(e)
				embeds.splice(i, 1);
			}
		}
		niceCategories = niceCategories + "**Page 1:** Categories list\n\n"
		embeds.forEach((e, i) => {
			niceCategories = niceCategories + `**Page ${i + 2}:** ${e.title}\n\n`
		});
		let firstEmbed = new Discord.MessageEmbed()
			.setTitle("Command categories")
			.setDescription(niceCategories)
			.setColor(color)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
		embeds.unshift(firstEmbed)
		try {
			await paginate(message, embeds)
			await message.react('✔️')
		}
		catch {
			await message.util.reply('in order to use this command I require the `Embed Links` permission');
			await message.react('❌')
		}
	}
};

module.exports = CommandsCommand;