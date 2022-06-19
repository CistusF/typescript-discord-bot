import { event } from "../Interfaces/client.interface";
import chalk from "chalk";

const Event: event = {
    once: false,
    execute: (client, message) => {
        if (!message.content.startsWith(client.prefix) || message.author.bot) return;
        const args = message.content.slice(client.prefix.length).split(" ");
        const command = args.shift()!;

        const commandFile = client.commands.find(i => i.synonym!.includes(command) == true);
        if (!commandFile) return;
        try {
            const i18n = Object.values(client.i18n.get(client.lang)?.Command!).find(i => i.synonym.includes(command))!;
            commandFile.run(client, message, args, i18n);
        } catch (e) {
            message.reply(client.i18n.get(client.lang)?.Event.MessageCreate.commandError);
            console.log(chalk.bold.red("An error occurred\n%s"), e);
        };
    }
};

export default Event;