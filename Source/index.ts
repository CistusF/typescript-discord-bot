import Client from './Utils/client';
import { Intents } from 'discord.js';
import { env } from './Interfaces/env';

const env = process.env;
const client = new Client({
    intents: Object.values(Intents.FLAGS)
});

client.login(env.token);