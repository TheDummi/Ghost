const { random, toArray, setPresence } = require('../funcs.js')
const { color } = require('../data/botData/config.json')
const { Command } = require('discord-akairo');
const destiny = require('../data/gameData/destiny.json');
const Discord = require('discord.js');

const subclasses = [
    "Warlock, Voidwalker",
    "Warlock, Sunsinger",
    "Warlock, Stormcaller",
    "Titan, Defender",
    "Titan, Sunbreaker",
    "Titan, Striker",
    "Hunter, Nightstalker",
    "Hunter, Gunslinger",
    "Hunter, Bladedancer",
]

const modifiers = [
    'No HUD',
    'Sensitivity 1',
    'Sensitivity 2',
    'Sensitivity 3',
    'Sensitivity 4',
    'Sensitivity 5',
    'Sensitivity 6',
    'Sensitivity 7',
    'Sensitivity 8',
    'Sensitivity 9',
    'Sensitivity 10',
    'No Super',
    'No Grenade',
    'No Melee',
    'No abilities',
    'No Arc Weapons',
    'No Solar Weapons',
    'No Void Weapons',
]

const missions = [
    {
        name: "The Dark Within",
        planet: "Earth",
        recLevel: 2,
        recLight: 15,
        recHardLevel: 40,
        recHardLight: 240
    },
    {
        name: "The Last Array",
        planet: "Earth",
        recLevel: 4,
        recLight: 20,
        recHardLevel: 40,
        recHardLight: 240
    }
]

const raids = [
    "Vault of Glass",
    "Crota's End",
    "King's Fall"
]

const hunterArmor = [
    "Knucklehead Radar",
    "Achlyophage Symboite",
    "Mask Of The Third Man",
    "ATS8 Arachnid",
    "Celestial Nighthawk",
    "Skyburners Annex",
    "Graviton Forfeit",
    "YoungAhamkara's Spine",
    "Don't Touch Me",
    "Khepri's Sting",
    "Sealed Ahamkara Grasps",
    "Crest Of Alpha Lupi",
    "Lucky Raspberry",
    "ATS8 Tarantella",
    "Radiant Dance Machines",
    "Bones Of Eao",
]

const warlockArmor = [
    "Skull Of Dire Ahamkara",
    "Apotheosis Veil",
    "No Land beyond Nemesis",
    "Obsidion Mind",
    "The Ram",
    "The Stag",
    "The Sunbreakers",
    "Claws Of Ahamkara",
    "Nothing Manacles",
    "The Impossible Machines",
    "Heart OfT hePraxis Fire",
    "Voidfang Vestments",
    "Star Fire Protocol",
    "Purifier Robes",
    "Alchemist's Raiment",
]

const titanArmor = [
    "Saint-14",
    "Helm Of Inmost Light",
    "An Insurmountable Skull Fort",
    "The Glass House",
    "Eternal Warrior",
    "Empyrean Bellicose",
    "The Taikonaut",
    "No Back Up Plans",
    "Ruin Wings",
    "ACD0 Feedback Fence",
    "Immolation Fists",
    "Crest Of Alpha Lupi",
    "The Armamentarium",
    "Twilight Garrison",
    "MK44 Stand Asides",
    "Peregrine Greaves",
]
let randomEmbed = new Discord.MessageEmbed()
    .setAuthor('Randomiser')
    .setDescription(`Choose any of the topics below to randomise`)
    .addField('- subclass', `Get a random subclass.`)
    .addField('- weapon', 'Get a random weapon.')
    .addField('- modifier', 'Get a random modifier.')
    .addField('- loadout', 'Get a random loadout consisting of a subclass (with handicap), a weapon and a modifier!')
    .addField('- modloadout', 'Get a random loadout consisting of a subclass (with handicap), a fitting armor piece, a weapon and 2 modifiers!')
    .addField('- patrol', 'Get a random patrol world.')
    .addField('- raid', 'Get a random raid.')
    .addField('- mission', 'Get a random mission.')
    .setColor(color)
class RandomCommand extends Command {
    constructor() {
        super('random', {
            aliases: ["random", "rand"],
            category: "Destiny",
            description: "Random generator for Destiny.",
            args: [
                {
                    id: 'option',
                    type: ['weapon', 'armor', 'subclass', 'modifier', 'loadout', 'modloadout', 'patrol', 'mission', 'raid'],
                    prompt: {
                        start: randomEmbed,
                        retry: randomEmbed
                    }
                },
                {
                    id: "user",
                    type: "user",
                },
            ]
        })
    }

    async exec(message, args) {
        let option = args.option;
        let user = args.user || message.author;

        let rand;
        let weapons = toArray('Weapon');
        // let subclasses = toArray('Subclass');
        // let modifiers = toArray('Modifier');
        let patrols = toArray('Planet');
        // let missions = toArray('Mission');
        // let raids = toArray('Raid');
        // let hunterArmor = toArray('Armor');
        // let warlockArmor= toArray('Armor');
        // let titanArmor= toArray('Armor');


        let embed = new Discord.MessageEmbed()
            .setAuthor(`Random ${option} for ${user.username}`, user.displayAvatarURL({ dynamic: true }))
            .setColor(color)
            .setThumbnail(user.displayAvatarURL({ Dynamic: true }))
            .setFooter(`${user.username}, if you don't have the requirements to run this mod, you can reroll them individually!`)

        // Weapon
        if (option == "weapon") {
            rand = weapons[Math.floor(Math.random() * weapons.length)];
            embed
                .addField('Weapon', rand);
        }

        // Patrol
        if (option == "patrol") {
            rand = patrols[Math.floor(Math.random() * patrols.length)]
            embed
                .addField('Patrol', rand)
                .setFooter('')
        }

        // Subclass
        if (option == "subclass") {
            rand = subclasses[Math.floor(Math.random() * subclasses.length)];
            embed
                .addField('Subclass', rand);
        }

        // Raid
        if (option == "raid") {
            rand = raids[Math.floor(Math.random() * raids.length)]
            embed
                .setFooter('')
                .addField('Raid', rand)
        }

        // Mission
        if (option == "mission") {
            rand = missions[Math.floor(Math.random() * missions.length)]

            embed
                .addField('mission', rand.name)
                .addField('Planet', rand.planet)
                .addField('Recommended Level', rand.recLevel)
                .addField('Recommended Light', rand.recLight)
                .addField('Recommended Level Hard', rand.recHardLevel)
                .addField('Recommended Light Hard', rand.recHardLight)
                .setFooter('')
        }
        // Modifier
        if (option == 'modifier') {
            rand = modifiers[Math.floor(Math.random() * modifiers.length)];
            embed
                .addField('Modifier', rand)
                .setFooter('')
        }

        // Loadout
        if (option == 'loadout') {
            let a = weapons[Math.floor(Math.random() * weapons.length)]
            let b = subclasses[Math.floor(Math.random() * subclasses.length)]
            let c = modifiers[Math.floor(Math.random() * modifiers.length)]
            let randWarlockArmor = warlockArmor[Math.floor(Math.random() * warlockArmor.length)]
            let randHunterArmor = hunterArmor[Math.floor(Math.random() * hunterArmor.length)]
            let randTitanArmor = titanArmor[Math.floor(Math.random() * titanArmor.length)]
            embed
                .addField('Subclass', b)
                .addField('Weapon', a)
            if (b.includes("Warlock")) {
                embed.addField('Armor', randWarlockArmor)
            }
            if (b.includes("Hunter")) {
                embed.addField('Armor', randHunterArmor)
            }
            if (b.includes("Titan")) {
                embed.addField('Armor', randTitanArmor)
            }

            embed.addField('Modifier', c)
        }

        // ModLoadout
        if (option == "modloadout") {
            let a = weapons[Math.floor(Math.random() * weapons.length)]
            let b = subclasses[Math.floor(Math.random() * subclasses.length)]
            let c = modifiers[Math.floor(Math.random() * modifiers.length)]
            let d = modifiers[Math.floor(Math.random() * modifiers.length)]
            let randWarlockArmor = warlockArmor[Math.floor(Math.random() * warlockArmor.length)]
            let randHunterArmor = hunterArmor[Math.floor(Math.random() * hunterArmor.length)]
            let randTitanArmor = titanArmor[Math.floor(Math.random() * titanArmor.length)]
            if (b.includes("Sunsinger")) {
                const extramod = [
                    b,
                    b + ", No Fireborn",
                    b + ", No Solar Grenade",
                    b + ", Angel of Light",
                    b + ", No Viking Funeral",
                    b + ", No Touch of Flame",
                    b + ", No Flameshield",
                    b + ", No Focused Burst"
                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }
            if (b.includes("Stormcaller")) {
                const extramod = [
                    b,
                    b + ", No Ironic Blink",
                    b + ", No Superconductor",
                    b + ", No Amplitude",
                    b + ", No Landfall",
                    b + ", No Focused Burst",
                    b + ", No Arc Web",
                    b + ", No Perpetual Change",
                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }
            if (b.includes("Voidwalker")) {
                const extramod = [
                    b,
                    b + ", No Life Steal",
                    b + ", No Focused Burst",
                    b + ", No Angry Magic",
                    b + ", No The Hunger",
                    b + ", No Embrace The Void",
                    b + ", No Lance",
                    b + ", No Shatter",
                    b + ", No Scatter Grenade",
                    b + ", Blink"
                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }
            if (b.includes("Sunbreaker")) {
                const extramod = [
                    b,
                    b + ", No Suncharge",
                    b + ", No Scorched Earth",
                    b + ", No Melting Point",
                    b + ", No Thermal Vent",
                    b + ", No Headseeker",
                    b + ", No Explosive Pyre",
                    b + ", No Cauterize",
                    b + ", No Fusion Grenade"

                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }
            if (b.includes("Striker")) {
                const extramod = [
                    b,
                    b + ", No FlashBang Grenade",
                    b + ", No Lightning Grenade",
                    b + ", No Death From Above",
                    b + ", No Aftermath",
                    b + ", No Aftershocks",
                    b + ", No Transfusion",
                    b + ", No Overload",
                    b + ", No Shoulder Charge",
                    b + ", No Juggernaut"
                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }
            if (b.includes("Defender")) {
                const extramod = [
                    b,
                    b + ", No Suppressor Grenade",
                    b + ", Armor of Light",
                    b + ", Weapons of Light",
                    b + ", Blessings of Light",
                    b + ", No Gift of Light",
                    b + ", No War Machine",
                    b + ", No Bastion",
                    b + ", No Gift of Void",
                    b + ", No Illuminated",
                    b + ", No Untouchable"
                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }
            if (b.includes("Gunslinger")) {
                const extramod = [
                    b,
                    b + ", No Tripmine Grenade",
                    b + ", No incendiary Grenade",
                    b + ", No Triple Jump",
                    b + ", Higher Jump",
                    b + ", No Incendiary Blade",
                    b + ", No Deadeye",
                    b + ", No combustion",
                    b + ", Scavenger",
                    b + ", No Keyhole",
                    b + ", No Chain of Woe",
                    b + ", No Gambler's Dagger"
                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }
            if (b.includes("Bladedancer")) {
                const extramod = [
                    b,
                    b + ", No Flux Grenade",
                    b + ", No Skip Grenade",
                    b + ", Blink",
                    b + ", Higher Jump",
                    b + ", Showstopper",
                    b + ", Razor's Edge",
                    b + ", No Vanish",
                    b + ", No Backstab",
                    b + ", No Escape Artist",
                    b + ", Shadowjack",
                    b + ", No quickdraw",
                    b + ", Stalker",
                    b + ", No Encore",
                    b + ", No Hungering Blade"
                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }
            if (b.includes("Nightstalker")) {
                const extramod = [
                    b,
                    b + ", No Voidwalk Grenade",
                    b + ", No Spike Grenade",
                    b + ", No Triple Jump",
                    b + ", Higher Jump",
                    b + ", No Black Hole",
                    b + ", Quiver",
                    b + ", No Vanish in Smoke",
                    b + ", No Snare",
                    b + ", No Keen Scout",
                    b + ", No Shadestep"
                ]
                b = extramod[Math.floor(Math.random() * extramod.length)]
            }

            embed
                .addField('Subclass', b)
                .addField('Weapon', a)
            if (b.includes("Warlock")) {
                embed.addField('Armor', randWarlockArmor)
            }
            if (b.includes("Hunter")) {
                embed.addField('Armor', randHunterArmor)
            }
            if (b.includes("Titan")) {
                embed.addField('Armor', randTitanArmor)
            }
            if (c.includes('Sensitivity') && d.includes('Sensitivity')) {
                console.log(c, d)
                let g = modifiers[Math.floor(Math.random() * modifiers.length)]
                let h = modifiers[Math.floor(Math.random() * modifiers.length)]
                embed.addField('Modifiers', g + ", " + h)
            }
            else if (c == d) {
                console.log(c, d)
                let e = modifiers[Math.floor(Math.random() * modifiers.length)]
                let f = modifiers[Math.floor(Math.random() * modifiers.length)]
                embed.addField('Modifiers', e + ", " + f)
            }
            else {
                embed.addField('Modifiers', c + ", " + d)
            }
        }
        setPresence(this.client, "WATCHING", `${user.username} struggle with the mods he got from me!`)

        return await message.util.send(embed)
    }
}

module.exports = RandomCommand;