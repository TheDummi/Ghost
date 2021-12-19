const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const config = require('./data/botData/config.json');
class MyClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.owners,
        },
            {
                disableMentions: 'everyone'
            });
        this.commandHandler = new CommandHandler(this, {
            directory: './src/commands/',
            prefix: config.prefixes,
            defaultCooldown: 1000,
            handleEdits: true,
            commandUtil: true,
            clientPermissions: 'EMBED_LINKS'
        });
        this.commandHandler.loadAll();
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './src/inhibitors'
        });
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();
        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
            process: process,
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
    }
}
const client = new MyClient();
client.login(config.token);