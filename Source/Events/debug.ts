import {event} from "../Interfaces/client";
import chalk from "chalk";

const Event:event = {
    once: true,
    execute: (client, log) => {
        console.log(chalk.green(log));
    }
};

export default Event;