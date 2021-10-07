"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intents = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
class myClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.loadCommads();
        this.loadEvents();
    }
    ;
    loadCommads() {
        const commandFolders = (0, fs_1.readdirSync)('./commands', { 'withFileTypes': true }).filter(i => i.isDirectory());
        commandFolders.forEach((f) => {
            let commandFiles = (0, fs_1.readdirSync)('./commands/' + f.name).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
            commandFiles.forEach((c) => {
                const command = require('./commands/' + f.name + '/' + c);
                command.default.name = c;
                command.default.type = f.name;
                this.commands.set(c.replace(".js", "").replace(".ts", ""), command.default);
            });
        });
    }
    ;
    loadEvents() {
        const eventFiles = (0, fs_1.readdirSync)(`./events`).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
        for (let file of eventFiles) {
            file = file.replace(".js", "").replace(".ts", "");
            const event = require(`./events/${file}`);
            if (event.default.once) {
                this.once(file, (...args) => event.default.execute(this, ...args));
            }
            else {
                this.on(file, (...args) => event.default.execute(this, ...args));
            }
            ;
        }
        ;
    }
    ;
}
exports.default = myClient;
;
exports.intents = Object.values(discord_js_1.Intents.FLAGS);
