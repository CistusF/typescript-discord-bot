import { Awaitable, ApplicationCommandOption, CommandInteraction, Message, ContextMenuInteraction, UserContextMenuInteraction, CacheType } from 'discord.js';
import client from '../Utils/client';

export type Command = {
    [key: string]: string | any;
    name?: string;
    description: string;
    options?: ApplicationCommandOption[];
    default_permission?: boolean | undefined;
    type?: number;
    guildId?: string;
    run?: (client: client, interaction: CommandInteraction) => void;
}

export type UserContext = {
    name?: string;
    type?: ApplicationCommandType;
    run : (client: client, interaction: UserContextMenuInteraction<CacheType>) => void;
}

export type Context = {
    name?: string;
    type?: ApplicationCommandType;
    run : (client: client, interaction: ContextMenuInteraction<CacheType>) => void;
}

export type event = {
    once: boolean;
    execute: (client: client, ...args: any) => Awaitable<void>;
};

enum ApplicationCommandType {
    User = 2,
    Message = 3
}