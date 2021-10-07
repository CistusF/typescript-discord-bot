import Client, { intents } from './Class';
import config from './Config';

const client = new Client({
    intents: intents
});

client.login(config.token);