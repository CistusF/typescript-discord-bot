import { Awaitable, Message } from 'discord.js';
import client from '../Utils/client';
import { Command } from "./i18n.interface";

export type messageCommand = {
    synonym?: string[];
    description?: string;
    usage?: string;
    type?: string;
    run: (client: client, msg: Message, args: string[], i18n: Command) => void;
};

export type event = {
    once: boolean;
    execute: (client: client, ...args: any) => Awaitable<void>;
};