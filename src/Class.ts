import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import { Command, Event, InteractionFile, InteractionCommands, GuildInteractionCommand } from './interface/Types.js';
import { readdirSync } from 'fs';
import config from './Config';

export default class myClient extends Client {
    public commands: Collection<String, Command>;
    public interactions: InteractionCommands;

    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
        this.interactions = {
            default: [],
            guild: [],
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
        const eventFiles = readdirSync(`./events`).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
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
        const InteractionCommands = readdirSync('./interactionCommands/defaultCommands').filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        if (InteractionCommands.length > 100) throw new Error("인터랙션 명령어는 100개를 넘길 수 없습니다.");
        InteractionCommands.forEach(c => {
            const command = require("./interactionCommands/defaultCommands/" + c).default as InteractionFile;
            const commandHandle = { name: c.replace(".js", "").replace(".ts", ""), description: command.description };
            this.interactions.default.push(commandHandle);
            this.interactions.commands.push({ options: command })
        });

        const guildInteractionCommands = readdirSync('./interactionCommands/serverCommands', { 'withFileTypes': true }).filter(i => i.isDirectory());
        guildInteractionCommands.forEach(f => {
            let commandFiles = readdirSync('./interactionCommands/serverCommands/' + f.name).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
            if (commandFiles.length > 100) throw new Error("인터랙션 명령어는 100개를 넘길 수 없습니다.");
            commandFiles.forEach((c) => {
                const command = require('./interactionCommands/serverCommands/' + f.name + '/' + c).default as GuildInteractionCommand;
                c = c.replace(".js", "").replace(".ts", "");
                const commandHandle: GuildInteractionCommand = {
                    options: {
                        name: c,
                        description: ""
                    },
                    guildId: command.guildId
                };

                for (let option in command.options) {
                    if (option !== "run") {
                        if (commandHandle.options) {
                            commandHandle.options[option] = command.options[option];
                        };
                    };
                };

                if (this.interactions.default.find(i => i.name === commandHandle.options?.name)) throw new Error("인터랙션은 이름이 겹칠 수 없습니다.");
                let guild = this.interactions.guild.find(i => i.guildId == commandHandle.guildId);
                if (!guild) {
                    commandHandle.options!.name = c;
                    this.interactions.guild.push({
                        guildId: commandHandle.guildId!,
                        options: [commandHandle.options!]
                    });
                } else {
                    guild.options.push(commandHandle.options!);
                };
                this.interactions.commands.push(command);
            });
        });
    };
};

export const intents = Object.values(Intents.FLAGS);