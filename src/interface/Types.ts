import { Message, Awaitable, CommandInteraction } from 'discord.js';
import Client from '../Class';
import { APIApplicationCommandOption } from 'discord-api-types/v9';

export interface Command {
    name?: string;
    description: string;
    usage?: string;
    dm: boolean;
    management: boolean;
    type?: string;
    run: (client: Client, message: Message, args: string[]) => void;
};

export interface InteractionFile {
    [key: string]: string | any;
    name?: string;
    description: string;
    options?: APIApplicationCommandOption[];
    default_permission?: boolean | undefined;
    type?: number;
    run?: (client: Client, interaction: CommandInteraction) => void;
}

export interface InteractionCommand {
    [key: string]: string | any;
    name?: string;
    description: string;
    options?: APIApplicationCommandOption[];
    default_permission?: boolean | undefined;
    type?: number;
}

export interface GuildInteractionCommand {
    options?: InteractionFile;
    guildId?: string;
};

export interface GuildInteractionCommandHandle {
    options: InteractionCommand[];
    guildId: string;
    run?: (client: Client, interaction: CommandInteraction) => void;
};

export interface InteractionCommands {
    default: InteractionCommand[];
    guild: GuildInteractionCommandHandle[];
    commands: GuildInteractionCommand[];
};

export interface Event {
    once: boolean;
    execute: (client: Client, ...args: any) => Awaitable<void>;
};