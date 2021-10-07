"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const event = {
    once: false,
    execute: (client, message) => {
        if (!message.content.startsWith(Config_1.default.prefix) || message.author.bot)
            return;
        let args = message.content.slice(Config_1.default.prefix.length).trim().split(" ");
        let command = args.shift().toLocaleLowerCase();
        try {
            let file = client.commands.get(command);
            if (file.type === "owner" && message.author.id !== '490829962769727498')
                return;
            file.run(client, message, args);
        }
        catch (e) {
            console.log(e);
        }
        ;
    }
};
exports.default = event;
