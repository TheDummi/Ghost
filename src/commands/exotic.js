// const { Command } = require('discord-akairo');
// const Discord = require('discord.js');
// const exotics = require('../data/userData/exotics.json');
// const config = require('../data/botData/config.json');
// const fs = require('fs')
// class ExoticCommand extends Command {
//     constructor() {
//         super('exotic', {
//             aliases: ["exotic", "check"],
//             category: "destiny",
//             description: "Check your owned exotic weapons",
//             args: [
//                 {
//                     id: "category",
//                     type: ["weapons", "warlockarmor", "hunterarmor", "titanarmor", "ZhaloSupercell", "FabianStrategy", "HardLight", "SurosRegime", "MonteCarlo", "TheLastWord", "AceOfSpades", "TheFirstCurse", "Hawkmoon", "NoTimeToExplain", "BadJuju", "RedDeath", "BooleanGemini", "TouchOfMalice",
//                         "JadeRabbit",
//                         "Tlaloc",
//                         "MidaMultiTool",
//                         "Telesto",
//                         "PlanC",
//                         "QueenbreakersBow",
//                         "Chaperone",
//                         "Invective",
//                         "UniversalRemote",
//                         "fourthHorseman",
//                         "LordOfWolves",
//                         "PatienceAndTime",
//                         "ZenMeteor",
//                         "Hereafter",
//                         "BlackSpindle",
//                         "NoLandBeyond",
//                         "DregsPromise",
//                         "SleeperSimulant",
//                         "Thunderlord",
//                         "SuperGoodAdvice",
//                         "DragonsBreath",
//                         "Truth",
//                         "BoltCaster",
//                         "RazeLighter",
//                         "DarkDrinker",
//                         "Necrochasm",
//                         "Thorn",
//                         "VexMythoclast",
//                         "Gjallahorn",
//                         "PocketInfinity",
//                         "IceBreaker",
//                         "SkullOfDireAhamkara",
//                         "ApotheosisVeil",
//                         "NoLandbeyondNemesis",
//                         "ObsidionMind",
//                         "TheRam",
//                         "TheStag",
//                         "Sunbreakers",
//                         "ClawsOfAhamkara",
//                         "NothingManacles",
//                         "TheImpossibleMachines",
//                         "HeartOfThePraxisFire",
//                         "VoidfangVestments",
//                         "StarFireProtocol",
//                         "PurifierRobes",
//                         "AlchemistSRaiment",
//                         "StormcallerBond",
//                         "LightBeyond",
//                         "CircleOfWar",
//                         "TheAgeToCome",
//                         "KnuckleheadRadar",
//                         "AchlyophageSymboite",
//                         "MaskOfTheThirdMan",
//                         "ATS8Arachnid",
//                         "CelestialNighthawk",
//                         "SkyburnersAnnex",
//                         "GravitonForfeit",
//                         "YoungAhamkaraSSpine",
//                         "DontTouchMe",
//                         "KhepriSSting",
//                         "SealedAhamkaraGrasps",
//                         "CrestOFAlphaLupi",
//                         "LuckyRaspberry",
//                         "ATS8Tarantella",
//                         "RadiantDanceMachines",
//                         "BonesOfEao",
//                         "NightstalkerCloak",
//                         "CloakOfOblivion",
//                         "ChaosCloak",
//                         "CloakOfTheRising",
//                         "SaintFourTeen",
//                         "HelmOfInmostLight",
//                         "AnInsurmountableSkullFort",
//                         "TheGlassHouse",
//                         "EternalWarrior",
//                         "EmpyreanBellicose",
//                         "TheTaikonaut",
//                         "NoBackUpPlans",
//                         "RuinWings",
//                         "ACD0FeedbackFence",
//                         "ImmolationFists",
//                         "CrestOfAlphaLupi",
//                         "TheArmamentarium",
//                         "TwilightGarrison",
//                         "MKFourtyFourStandAsides",
//                         "PeregrineGreaves",
//                         "MarkOfTheSunforged",
//                         "MarkOfOblivion",
//                         "MarkOfTheCircle",
//                         "markOfTheExecutor",],
//                     prompt: {
//                         start: "`weapons`, `warlockarmor`, `hunterarmor`, `titanarmor`",
//                         retry: "`weapons`, `warlockarmor`, `hunterarmor`, `titanarmor`",
//                     }
//                 },
//                 {
//                     id: 'user',
//                     type: "user"
//                 }
//             ]
//         })
//     }

//     async exec(message, args) {
//         let user = args.user || message.author
//         if (!exotics[user.id]) {
//             exotics[user.id] = {
//                 ZhaloSupercell: "❌",
//                 FabianStrategy: "❌",
//                 HardLight: "❌",
//                 SurosRegime: "❌",
//                 MonteCarlo: "❌",
//                 TheLastWord: "❌",
//                 AceOfSpades: "❌",
//                 TheFirstCurse: "❌",
//                 Hawkmoon: "❌",
//                 NoTimeToExplain: "❌",
//                 BadJuju: "❌",
//                 RedDeath: "❌",
//                 BooleanGemini: "❌",
//                 TouchOfMalice: "❌",
//                 JadeRabbit: "❌",
//                 Tlaloc: "❌",
//                 MidaMultiTool: "❌",
//                 // special weapons
//                 Telesto: "❌",
//                 PlanC: "❌",
//                 QueenbreakersBow: "❌",
//                 Chaperone: "❌",
//                 Invective: "❌",
//                 UniversalRemote: "❌",
//                 fourthHorseman: "❌",
//                 LordOfWolves: "❌",
//                 PatienceAndTime: "❌",
//                 ZenMeteor: "❌",
//                 Hereafter: "❌",
//                 BlackSpindle: "❌",
//                 NoLandBeyond: "❌",
//                 DregsPromise: "❌",
//                 // Heavy weapons
//                 SleeperSimulant: "❌",
//                 Thunderlord: "❌",
//                 SuperGoodAdvice: "❌",
//                 DragonsBreath: "❌",
//                 Truth: "❌",
//                 BoltCaster: "❌",
//                 RazeLighter: "❌",
//                 DarkDrinker: "❌",
//                 // Year 1 exclusive weapons
//                 Necrochasm: "❌",
//                 Thorn: "❌",
//                 VexMythoclast: "❌",
//                 Gjallahorn: "❌",
//                 PocketInfinity: "❌",
//                 IceBreaker: "❌",
//                 // Warloc armor
//                 SkullOfDireAhamkara: "❌",
//                 ApotheosisVeil: "❌",
//                 NoLandbeyondNemesis: "❌",
//                 ObsidionMind: "❌",
//                 TheRam: "❌",
//                 TheStag: "❌",
//                 Sunbreakers: "❌",
//                 ClawsOfAhamkara: "❌",
//                 NothingManacles: "❌",
//                 TheImpossibleMachines: "❌",
//                 HeartOfThePraxisFire: "❌",
//                 VoidfangVestments: "❌",
//                 StarFireProtocol: "❌",
//                 PurifierRobes: "❌",
//                 AlchemistSRaiment: "❌",
//                 StormcallerBond: "❌",
//                 LightBeyond: "❌",
//                 CircleOfWar: "❌",
//                 TheAgeToCome: "❌",
//                 // Hunter Armor
//                 KnuckleheadRadar: "❌",
//                 AchlyophageSymboite: "❌",
//                 MaskOfTheThirdMan: "❌",
//                 ATS8Arachnid: "❌",
//                 CelestialNighthawk: "❌",
//                 SkyburnersAnnex: "❌",
//                 GravitonForfeit: "❌",
//                 YoungAhamkaraSSpine: "❌",
//                 DontTouchMe: "❌",
//                 KhepriSSting: "❌",
//                 SealedAhamkaraGrasps: "❌",
//                 CrestOFAlphaLupi: "❌",
//                 LuckyRaspberry: "❌",
//                 ATS8Tarantella: "❌",
//                 RadiantDanceMachines: "❌",
//                 BonesOfEao: "❌",
//                 NightstalkerCloak: "❌",
//                 CloakOfOblivion: "❌",
//                 ChaosCloak: "❌",
//                 CloakOfTheRising: "❌",
//                 // Titan Armor
//                 SaintFourTeen: "❌",
//                 HelmOfInmostLight: "❌",
//                 AnInsurmountableSkullFort: "❌",
//                 TheGlassHouse: "❌",
//                 EternalWarrior: "❌",
//                 EmpyreanBellicose: "❌",
//                 TheTaikonaut: "❌",
//                 NoBackUpPlans: "❌",
//                 RuinWings: "❌",
//                 ACD0FeedbackFence: "❌",
//                 ImmolationFists: "❌",
//                 CrestOfAlphaLupi: "❌",
//                 TheArmamentarium: "❌",
//                 TwilightGarrison: "❌",
//                 MKFourtyFourStandAsides: "❌",
//                 PeregrineGreaves: "❌",
//                 MarkOfTheSunforged: "❌",
//                 MarkOfOblivion: "❌",
//                 MarkOfTheCircle: "❌",
//                 markOfTheExecutor: "❌",

//             }
//             fs.writeFile('data/exotics.json', JSON.stringify(exotics), (err) => {
//                 if (err) console.log(err)
//             })
//         }
//         let ZhaloSupercell = exotics[user.id].ZhaloSupercell;
//         let FabianStrategy = exotics[user.id].FabianStrategy
//         let HardLight = exotics[user.id].HardLight
//         let SurosRegime = exotics[user.id].SurosRegime
//         let MonteCarlo = exotics[user.id].MonteCarlo
//         let TheLastWord = exotics[user.id].TheLastWord
//         let AceOfSpades = exotics[user.id].AceOfSpades
//         let TheFirstCurse = exotics[user.id].TheFirstCurse
//         let Hawkmoon = exotics[user.id].Hawkmoon
//         let NoTimeToExplain = exotics[user.id].NoTimeToExplain
//         let BadJuju = exotics[user.id].BadJuju
//         let RedDeath = exotics[user.id].RedDeath
//         let BooleanGemini = exotics[user.id].BooleanGemini
//         let TouchOfMalice = exotics[user.id].TouchOfMalice
//         let JadeRabbit = exotics[user.id].JadeRabbit
//         let Tlaloc = exotics[user.id].Tlaloc
//         let MidaMultiTool = exotics[user.id].MidaMultiTool
//         let Telesto = exotics[user.id].Telesto
//         let PlanC = exotics[user.id].PlanC
//         let QueenbreakersBow = exotics[user.id].QueenbreakersBow
//         let Chaperone = exotics[user.id].Chaperone
//         let Invective = exotics[user.id].Invective
//         let UniversalRemote = exotics[user.id].UniversalRemote
//         let fourthHorseman = exotics[user.id].fourthHorseman
//         let LordOfWolves = exotics[user.id].LordOfWolves
//         let PatienceAndTime = exotics[user.id].PatienceAndTime
//         let ZenMeteor = exotics[user.id].ZenMeteor
//         let Hereafter = exotics[user.id].Hereafter
//         let BlackSpindle = exotics[user.id].BlackSpindle
//         let NoLandBeyond = exotics[user.id].NoLandBeyond
//         let DregsPromise = exotics[user.id].DregsPromise
//         let SleeperSimulant = exotics[user.id].SleeperSimulant
//         let Thunderlord = exotics[user.id].Thunderlord
//         let SuperGoodAdvice = exotics[user.id].SuperGoodAdvice
//         let DragonsBreath = exotics[user.id].DragonsBreath
//         let Truth = exotics[user.id].Truth
//         let BoltCaster = exotics[user.id].BoltCaster
//         let RazeLighter = exotics[user.id].RazeLighter
//         let DarkDrinker = exotics[user.id].DarkDrinker

//         let Necrochasm = exotics[user.id].Necrochasm
//         let Thorn = exotics[user.id].Thorn
//         let VexMythoclast = exotics[user.id].VexMythoclast
//         let Gjallahorn = exotics[user.id].Gjallahorn
//         let PocketInfinity = exotics[user.id].PocketInfinity
//         let IceBreaker = exotics[user.id].IceBreaker
//         let option = args.category;
//         let embed = new Discord.MessageEmbed()
//             .setColor(config.color)
//         if (message.util.parsed.alias === "exotic") {
//             if (option == "weapons") {
//                 embed = embed
//                     .setTitle('Exotic weapons')
//                     .addField('Year 2 Primary', `${ZhaloSupercell} Zhalo Supercell\n${FabianStrategy} Fabian Strategy\n${HardLight} Hard light\n${SurosRegime} SUROS Regime\n${MonteCarlo} Monte Carlo\n${TheFirstCurse} The First Curse\n${AceOfSpades} Ace Of Spades\n${TheLastWord} The Last Word\n${Hawkmoon} Hawkmoon\n${NoTimeToExplain} No Time To Explain\n${BadJuju} Bad Juju\n${RedDeath} Red Death`, true)
//                     .addField('Year 2 Primary', `${BooleanGemini} Boolean Gemini\n${TouchOfMalice} Touch Of Malice\n${JadeRabbit} JadeRabbit\n${Tlaloc} Tlaloc\n${MidaMultiTool} Mida Multi-Tool`, true)
//                     .addField('Year 2 Special', `${Telesto} Telesto\n${PlanC} Plan C\n${QueenbreakersBow} QueenBreaker's Bow\n${Chaperone} Chaperone\n${Invective} Invective\n${UniversalRemote} Universal Remote\n${fourthHorseman} 4th Horseman\n${LordOfWolves} Lord Of Wolves\n${PatienceAndTime} Patience And Time`, true)
//                     .addField('Year 2 Special', `${ZenMeteor} Zen Meteor\n${Hereafter} Hereafter\n${BlackSpindle} Black Spindle\n${NoLandBeyond} No Land Beyond\n${DregsPromise} Dreg's Promise`, true)
//                     .addField('Year 2 Heavy', `${SleeperSimulant} Sleeper Simulant\n${Thunderlord} Thunderlord\n${SuperGoodAdvice} Super Good Advice\n${DragonsBreath} Dragon's Breath\n${Truth} Truth\n${BoltCaster} Bolt-Caster\n${RazeLighter} Raze-Lighter\n${DarkDrinker} Dark-Drinker`, true)
//                     .addField('Year 1 Exclusive', `${Necrochasm} Necrochasm\n${Thorn} Thorn\n${VexMythoclast} Vex Mythoclast\n${Gjallahorn} Gjallahorn\n${PocketInfinity} Pocket Infinity\n${IceBreaker} Ice Breaker`, true)
//                 await message.util.send(embed)
//             }
//         }
//         if (message.util.parsed.alias === "check") {
//             if (option == "ZhaloSupercell") {
//                 ZhaloSupercell = "✅"
//                 message.channel.send('You put your Zhalo Supercell on owned')
//             }
//         }
//         fs.writeFile('data/exotics.json', JSON.stringify(exotics), (err) => {
//             if (err) console.log(err)
//         })
//     }
// }

// module.exports = ExoticCommand;