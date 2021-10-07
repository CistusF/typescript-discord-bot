import { Event } from '../Types';
import { Message } from 'discord.js';
import config from '../Config';

const event: Event = {
    once: false,
    execute: (client, message: Message) => {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        let args = message.content.slice(config.prefix.length).trim().split(" ");
        let command = args.shift()!.toLocaleLowerCase();
        try {
            let file = client.commands.get(command)!;
            if (file.type === "owner" && message.author.id !== '490829962769727498') return;
            file.run(client, message, args);
        } catch (e) {
            console.log(e);
        };
    }
};

export default event;