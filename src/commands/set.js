// const { Command, Argument } = require('discord-akairo');
// const Discord = require('discord.js')
// const profile = require('../data/userData/profile.json');
// const character1 = require('../data/userData/character1.json');
// const character2 = require('../data/userData/character2.json');
// const character3 = require('../data/userData/character3.json');
// const fs = require('fs');
// const config = require('../data/botData/config.json');
// let embed = new Discord.MessageEmbed()
//     .setColor(config.color)
//     .setTitle('What would you like to update guardian?')
//     .addField('basic', 'psn\ngamemode\ncharacter\nraid\nsynced')
//     .addField('character1', 'character\nlevel\nlight\nraidable')
//     .addField('character2', 'character\nlevel\nlight\nraidable')
//     .addField('character3', 'character\nlevel\nlight\nraidable')
// class SetCommand extends Command {
//     constructor() {
//         super('set', {
//             aliases: ["set"],
//             category: "destiny",
//             description: "Set your destiny characters!",
//             args: [
//                 {
//                     id: "option",
//                     type: ["basic", "character1", "character2", "character3"],
//                     prompt: {
//                         start: "What would you like to update guardian? `basic`, `character1`, `character2`, `character3`",
//                         retry: "What would you like to update guardian? `basic`, `character1`, `character2`, `character3`",
//                         timeout: "I'll help you next time guardian...",
//                         ended: "I really didn't get it guardian, try again...",
//                         cancel: "I cancelled your request guardian!"
//                     }
//                 },
//                 {
//                     id: "choice",
//                     type: ["psn", "gamemode", "main", "raid", "synced", "character", "level", "light", "raidable"],
//                     prompt: {
//                         start: embed,
//                         retry: embed,
//                         timeout: "I'll help you next time guardian...",
//                         ended: "I really didn't get it guardian, try again...",
//                         cancel: "I cancelled your request guardian!"
//                     }
//                 },
//                 {
//                     id: 'newArgs',
//                     type: "string",
//                     prompt: {
//                         start: "what is the new info?",
//                         retry: "what is the new info?",
//                         timeout: "I'll help you next time guardian...",
//                         ended: "I really didn't get it guardian, try again...",
//                         cancel: "I cancelled your request guardian!"
//                     }
//                 }
//             ]
//         })
//     }

//     async exec(message, args) {
//         let user = message.author;
//         let option = args.option;
//         let choice = args.choice;
//         let newArgs = args.newArgs;
//         if (!profile[user.id]) {
//             return await message.util.send('Set your account with `?setup` first guardian!')
//         }
//         let psn = profile[user.id].psn;
//         let gamemode = profile[user.id].gamemode;
//         let main = profile[user.id].main;
//         let raid = profile[user.id].raid;
//         let sync = profile[user.id].sync;

//         // character 1
//         let char1 = character1[user.id].character;
//         let level1 = character1[user.id].level;
//         let light1 = character1[user.id].light;
//         let raid1 = character1[user.id].raid;
//         // character 2
//         let char2 = character2[user.id].character;
//         let level2 = character2[user.id].level;
//         let light2 = character2[user.id].light;
//         let raid2 = character2[user.id].raid;

//         // character 3
//         let char3 = character3[user.id].character;
//         let level3 = character3[user.id].level;
//         let light3 = character3[user.id].light;
//         let raid3 = character3[user.id].raid;

//         if (option == "basic") {
//             if (choice == "character" || choice == "level" || choice == "light" || choice == "raidable") {
//                 return await message.util.send('Not an option for `basic info`! Use `psn`, `gamemode`, `main`, `synced`')
//             }
//             if (choice == "psn") {
//                 if (newArgs.length < 8 || newArgs.length > 16) {
//                     return await message.util.send('A PSN name can only be between 8 and 16 characters!')
//                 }
//                 else {
//                     try {
//                         message.member.setNickname(newArgs)
//                     }
//                     catch { }
//                     psn = newArgs;
//                 }
//             }
//             if (choice == "gamemode") {
//                 if (newArgs == "pve" || newArgs == "pvp") {
//                     gamemode = newArgs;
//                 }
//                 else {
//                     return await message.channel.send('You can only choose between `pve`, `pvp`')
//                 }
//             }
//             if (choice == "main") {
//                 if (newArgs == "warlock" || newArgs == "hunter" || newArgs == "titan") {
//                     main = newArgs;
//                 }
//                 else {
//                     return await message.util.send('Not a valid character option')
//                 }
//             }
//             if (choice == "raid") {
//                 if (newArgs == "kf" || newArgs == "crota" || newArgs == "vog") {
//                     raid = newArgs;
//                 }
//                 else {
//                     return await message.util.send('Not a valid character option')
//                 }
//             }
//             if (choice == "synced") {
//                 if (newArgs == "yes" || newArgs == "no") {
//                     sync = newArgs;
//                 }
//                 else {
//                     return await message.util.send('Not a valid character option')
//                 }
//             }
//             await message.util.send(`Updated ${choice} to ${newArgs}!`)
//         }
//         if (option == "character1") {
//             if (choice == "psn" || choice == "gamemode" || choice == "main" || choice == "raid" || choice == "synced") {
//                 return await message.util.send(`Not an option for \`${option}\`! Use \`character\`, \`level\`, \`light\`, \`raidable\``)
//             }
//             if (choice == "character") {
//                 if (newArgs == "warlock" || newArgs == "hunter" || newArgs == "titan") {
//                     char1 = newArgs;
//                 }
//                 else {
//                     return await message.util.send('Not a valid character option')
//                 }

//             }
//             if (choice == "level") {
//                 if (isNaN(Number(newArgs))) {
//                     return await message.channel.send('Please specify a valid amount!')
//                 }
//                 if (Number(newArgs) < 0 || Number(newArgs) > 40) {
//                     return await message.channel.send('There is no way you obtained that level in destiny!')
//                 }
//                 else {
//                     level1 = newArgs;
//                 }
//             }
//             if (choice == "light") {
//                 if (isNaN(Number(newArgs))) {
//                     return await message.channel.send('Please specify a valid amount!')
//                 }
//                 if (Number(newArgs) < 0 || Number(newArgs) > 335) {
//                     return await message.channel.send('There is no way you obtained that light in destiny!')
//                 }
//                 else {
//                     light1 = newArgs;
//                 }
//             }
//             if (choice == "raidable") {
//                 if (newArgs == "yes" || newArgs == "no") {
//                     raid1 = newArgs;
//                 }
//                 else {
//                     return await message.channel.send('Please answer with `yes` or `no`!')
//                 }
//             }
//             await message.util.send(`Updated ${choice} to ${newArgs}!`)
//         }
//         if (option == "character2") {
//             if (choice == "psn" || choice == "gamemode" || choice == "main" || choice == "raid" || choice == "synced") {
//                 return await message.util.send(`Not an option for \`${option}\`! Use \`character\`, \`level\`, \`light\`, \`raidable\``)
//             }
//             if (choice == "psn" || choice == "gamemode" || choice == "main" || choice == "raid" || choice == "synced") {
//                 return await message.util.send(`Not an option for \`${option}\`! Use \`character\`, \`level\`, \`light\`, \`raidable\``)
//             }
//             if (choice == "character") {
//                 if (newArgs == "warlock" || newArgs == "hunter" || newArgs == "titan") {
//                     char2 = newArgs;
//                 }
//                 else {
//                     return await message.util.send('Not a valid character option')
//                 }

//             }
//             if (choice == "level") {
//                 if (isNaN(Number(newArgs))) {
//                     return await message.channel.send('Please specify a valid amount!')
//                 }
//                 if (Number(newArgs) < 0 || Number(newArgs) > 40) {
//                     return await message.channel.send('There is no way you obtained that level in destiny!')
//                 }
//                 else {
//                     level2 = newArgs;
//                 }
//             }
//             if (choice == "light") {
//                 if (isNaN(Number(newArgs))) {
//                     return await message.channel.send('Please specify a valid amount!')
//                 }
//                 if (Number(newArgs) < 0 || Number(newArgs) > 335) {
//                     return await message.channel.send('There is no way you obtained that light in destiny!')
//                 }
//                 else {
//                     light2 = newArgs;
//                 }
//             }
//             if (choice == "raidable") {
//                 if (newArgs == "yes" || newArgs == "no") {
//                     raid2 = newArgs;
//                 }
//                 else {
//                     return await message.channel.send('Please answer with `yes` or `no`!')
//                 }
//             }
//             await message.util.send(`Updated ${choice} to ${newArgs}!`)
//         }
//         if (option == "character3") {
//             if (choice == "psn" || choice == "gamemode" || choice == "main" || choice == "raid" || choice == "synced") {
//                 return await message.util.send(`Not an option for \`${option}\`! Use \`character\`, \`level\`, \`light\`, \`raidable\``)
//             }
//             if (choice == "psn" || choice == "gamemode" || choice == "main" || choice == "raid" || choice == "synced") {
//                 return await message.util.send(`Not an option for \`${option}\`! Use \`character\`, \`level\`, \`light\`, \`raidable\``)
//             }
//             if (choice == "character") {
//                 if (newArgs == "warlock" || newArgs == "hunter" || newArgs == "titan") {
//                     char3 = newArgs;
//                 }
//                 else {
//                     return await message.util.send('Not a valid character option')
//                 }

//             }
//             if (choice == "level") {
//                 if (isNaN(Number(newArgs))) {
//                     return await message.channel.send('Please specify a valid amount!')
//                 }
//                 if (Number(newArgs) < 0 || Number(newArgs) > 40) {
//                     return await message.channel.send('There is no way you obtained that level in destiny!')
//                 }
//                 else {
//                     level3 = newArgs;
//                 }
//             }
//             if (choice == "light") {
//                 if (isNaN(Number(newArgs))) {
//                     return await message.channel.send('Please specify a valid amount!')
//                 }
//                 if (Number(newArgs) < 0 || Number(newArgs) > 335) {
//                     return await message.channel.send('There is no way you obtained that light in destiny!')
//                 }
//                 else {
//                     light3 = newArgs;
//                 }
//             }
//             if (choice == "raidable") {
//                 if (newArgs == "yes" || newArgs == "no") {
//                     raid3 = newArgs;
//                 }
//                 else {
//                     return await message.channel.send('Please answer with `yes` or `no`!')
//                 }
//             }
//             await message.util.send(`Updated ${choice} to ${newArgs}!`)
//         }
//         character1[user.id] = {
//             character: char1,
//             level: level1,
//             light: light1,
//             raid: raid1,
//         }
//         character2[user.id] = {
//             character: char2,
//             level: level2,
//             light: light2,
//             raid: raid2,
//         }
//         character3[user.id] = {
//             character: char3,
//             level: level3,
//             light: light3,
//             raid: raid3,
//         }
//         profile[user.id] = {
//             psn: psn,
//             gamemode: gamemode,
//             main: main,
//             raid: raid,
//             sync: sync
//         }
//         fs.writeFile("data/profile.json", JSON.stringify(profile), (err) => {
//             if (err) console.log(err);
//         });
//         fs.writeFile("data/character1.json", JSON.stringify(character1), (err) => {
//             if (err) console.log(err);
//         });
//         fs.writeFile("data/character2.json", JSON.stringify(character2), (err) => {
//             if (err) console.log(err);
//         });
//         fs.writeFile("data/character3.json", JSON.stringify(character3), (err) => {
//             if (err) console.log(err);
//         });
//     }
// }

// module.exports = SetCommand;