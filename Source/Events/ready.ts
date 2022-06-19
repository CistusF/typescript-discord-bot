import chalk from "chalk";
import { event } from "../Interfaces/client.interface";

const Event: event = {
    once: true,
    execute: (client) => {
        console.log(chalk.bgGreenBright(client.i18n.get(client.lang)?.Event.Ready.ready), client.user?.tag);
    }
};

export default Event;