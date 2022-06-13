require("dotenv").config({ path: "../.env" });
import { Client, ClientOptions, Collection } from "discord.js";
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import { env } from "../Interfaces/env";
import { i18n } from "../Interfaces/i18n";
import { messageCommand, event } from '../Interfaces/client';
const env = process.env as unknown as env;

async () => {
    await mongoose.connect("mongodb://localhost:27017/test");
};

export default class client extends Client {
    public token: string;
    public ownerId: string;
    public prefix: string;
    public lang: string;
    static lang: string;
    public commands: Collection<String, messageCommand>;
    public i18n: Collection<String, i18n>;
    static i18n: Collection<String, i18n>;
    constructor(options: ClientOptions) {
        super(options);
        this.token = env.token;
        this.ownerId = env.ownerId;
        this.prefix = env.prefix;
        this.lang = env.defaultLang;
        this.commands = new Collection();
        this.i18n = new Collection();
        this.loadI18ns();
        this.loadCommands();
        this.loadEvents();
    };

    private loadCommands(): void {
        const commandFolders = readdirSync('./Commands', { 'withFileTypes': true }).filter(i => i.isDirectory());
        commandFolders.forEach(f => {
            let commandFiles = readdirSync('./Commands/' + f.name).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
            commandFiles.forEach(c => {
                const command = require('../Commands/' + f.name + '/' + c) as { default: messageCommand };
                console.log(this.i18n)
                const commandName = c.replace(".js", "").replace(".ts", "");
                command.default.type = f.name;
                command.default.description = this.i18n.get(this.lang)?.Command[commandName].description;
                command.default.synonym = this.i18n.get(this.lang)?.Command[commandName].synonym;
                this.commands.set(commandName, command.default);
            });
        });
    };

    private loadEvents(): void {
        const eventFiles = readdirSync(`./Events`).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
        for (let file of eventFiles) {
            if (file.replace(".js", "").replace(".ts", "") === "debug" && !env.debug) {
            } else {
                file = file.replace(".js", "").replace(".ts", "");
                const event = require(`../Events/${file}`) as { default: event };
                if (event.default.once) {
                    this.once(file, (...args) => event.default.execute(this, ...args));
                } else {
                    this.on(file, (...args) => event.default.execute(this, ...args));
                };
            }
        };
    };

    private loadI18ns(): void {
        const i18n = readdirSync("./locales").filter(i => i.endsWith(".js") || i.endsWith(".ts"));
        for (let file of i18n) {
            const i18nFile = require("../locales/" + file.replace(".js", "").replace(".ts", "")) as { default: i18n };
            this.i18n.set(file.replace(".js", "").replace(".ts", ""), i18nFile.default);
        };
    };
};

