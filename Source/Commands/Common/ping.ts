import { messageCommand } from "../../Interfaces/client";

const command: messageCommand = {
    run: (client, message, args, i18n) => {
        console.log(i18n)
        message.reply(i18n.contents![0]);
    }
};

export default command;