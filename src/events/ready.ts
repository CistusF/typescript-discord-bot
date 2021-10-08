import { Event, InteractionCommand } from '../interface/Types';
import Client from '../Class';
import config from '../Config';
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const event: Event = {
    once: true,
    execute: async (client: Client) => {
        const rest = new REST({ version: '9' }).setToken(config.token);

        client.interactions.guild.forEach(async c => {
            try {
                await rest.put(
                    Routes.applicationGuildCommands(client.user!.id, c.guildId!),
                    { body: c.options },
                ).then(() => {
                    console.log("서버 인터랙션 로드 완료");
                });
            } catch (e) {
                console.error(e);
            };
        });

        try {
            await rest.put(
                Routes.applicationCommands(client.user!.id),
                { body: client.interactions.default }
            ).then(() => {
                console.log("인터랙션 로드 완료");
            });
        } catch (e) {
            console.error(e);
        }

        console.log(client.user?.tag + ' 으로 로그인 하였습니다.');
        console.log(client.interactions)
    }
};

export default event;