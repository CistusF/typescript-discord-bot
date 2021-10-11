import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import { Command, Event, InteractionCommand, InteractionCommandsHandle } from './interface/Types.js';
import { readdirSync } from 'fs';
import config from './Config';

export default class myClient extends Client {
    public commands: Collection<String, Command>;
    public interactions: InteractionCommandsHandle;

    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
        this.interactions = {
            interactions: [],
            commands: []
        };
        this.loadCommads();
        this.loadEvents();
        this.loadSlashCommands();
    };

    private loadCommads(): void {
        const commandFolders = readdirSync('./commands', { 'withFileTypes': true }).filter(i => i.isDirectory());
        commandFolders.forEach((f) => {
            let commandFiles = readdirSync('./commands/' + f.name).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
            if (commandFiles.length > 25) throw new Error("명령어 타입은 25개를 넘길 수 없습니다.");
            commandFiles.forEach((c) => {
                const command = require('./commands/' + f.name + '/' + c) as { default: Command };
                command.default.name = c;
                command.default.type = f.name;
                this.commands.set(c.replace(".js", "").replace(".ts", ""), command.default);
            });
        });
    };

    private loadEvents(): void {
        const eventFiles = readdirSync(`./events`).filter((f) => f.endsWith('.js') || f.endsWith('.ts'));
        for (let file of eventFiles) {
            if (file.replace(".js", "").replace(".ts", "") === "debug" && !config.debug) {
            } else {
                file = file.replace(".js", "").replace(".ts", "");
                const event = require(`./events/${file}`) as { default: Event };
                if (event.default.once) {
                    this.once(file, (...args) => event.default.execute(this, ...args));
                } else {
                    this.on(file, (...args) => event.default.execute(this, ...args));
                };
            }
        };
    };

    private loadSlashCommands(): void {
        let InteractionCommands = readdirSync('./interactionCommands/defaultCommands').filter(f => f.endsWith(".ts") || f.endsWith(".js"));
        if (InteractionCommands.length > 100) throw new Error("인터랙션 명령어는 100개를 넘길 수 없습니다.");
        InteractionCommands.forEach(c => {
            const command = require("./interactionCommands/defaultCommands/" + c).default as InteractionCommand;
            command.name = c.replace('.ts', "").replace('.js', "");
            this.interactions.commands.push(command);
            delete command.run;
            this.interactions.interactions.push(command);
        });

        const serverInteractions = readdirSync("./interactionCommands/serverCommands/", { withFileTypes: true }).filter(i => i.isDirectory());
        serverInteractions.forEach(g => {
            InteractionCommands = readdirSync("./interactionCommands/serverCommands/" + g.name).filter(f => f.endsWith(".ts") || f.endsWith(".js"));
            InteractionCommands.forEach(c => {
                const command = require("./interactionCommands/serverCommands/" + g.name + "/" + c).default as InteractionCommand;
                command.name = c.replace('.ts', "").replace('.js', "");
                command.guildId = g.name;
                this.interactions.commands.push(command);
                delete command.run;
                this.interactions.interactions.push(command);
            });
        });
    };
};

export const intents = Object.values(Intents.FLAGS);