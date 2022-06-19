import { messageCommand } from "../../Interfaces/client.interface";

const command: messageCommand = {
    run: (client, message, args, i18n) => {
        message.reply(i18n.contents![0]);
    }
};

export default command;