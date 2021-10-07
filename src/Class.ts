import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import { Command, Event } from './interface/Types.js';
import { readdirSync } from 'fs';

export default class myClient extends Client {
    public commands: Collection<String, Command>;

    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
        this.loadCommads();
        this.loadEvents();
    };

    private loadCommads(): void {
        const commandFolders = readdirSync('./commands', { 'withFileTypes': true }).filter(i => i.isDirectory());
        commandFolders.forEach((f) => {
            let commandFiles = readdirSync('./commands/' + f.name).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
            commandFiles.forEach((c) => {
                const command = require('./commands/' + f.name + '/' + c) as { default: Command };
                command.default.name = c;
                command.default.type = f.name;
                this.commands.set(c.replace(".js", "").replace(".ts", ""), command.default);
            });
        });
    };

    private loadEvents(): void {
        const eventFiles = readdirSync(`./events`).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
        for (let file of eventFiles) {
            file = file.replace(".js", "").replace(".ts", "")
            const event = require(`./events/${file}`) as { default: Event };
            if (event.default.once) {
                this.once(file, (...args) => event.default.execute(this, ...args));
            } else {
                this.on(file, (...args) => event.default.execute(this, ...args));
            };
        };
    };
};

export const intents = Object.values(Intents.FLAGS);