import { Event, InteractionCommand } from '../interface/Types';
import Client from '../Class';
import config from '../Config';
import { REST } from '@discordjs/rest';

const event: Event = {
    once: true,
    execute: async (client: Client) => {
        if (config.refresh) {
            const rest = new REST({ version: '9' }).setToken(config.token);
            const Interactions: {
                guildId: string | null;
                commands: InteractionCommand[];
            }[] = [];

            const registerInteraction = async (i: {
                commands: InteractionCommand[];
                guildId: string | null;
            }) => {
                console.log(i.commands);
                try {
                    await rest.put(
                        i.guildId ? (`/applications/${client.user?.id}/guilds/${i.guildId}/commands`) : (`/applications/${client.user?.id}/commands`),
                        { body: i.commands },
                    ).then(() => {
                        console.log((i.guildId ? "서버 " : null) + "인터랙션 로드 완료");
                    }).catch((e: any) => {
                        console.error(e);
                    });
                } catch (e) {
                    console.error(e);
                };
            };

            client.interactions.interactions.forEach(async c => {
                let guildId: string | null;
                if (c.guildId) {
                    guildId = c.guildId;
                    delete c.guildId;
                };
                const Commands = Interactions.find(i => i.guildId === guildId ?? "null");
                if (Commands) {
                    Commands.commands.push(c);
                } else {
                    Interactions.push({ guildId: null, commands: [c] });
                }
            });

            Interactions.forEach(i => {
                registerInteraction(i);
            });
        }


        console.log(client.user?.tag + ' 으로 로그인 하였습니다.');
    }
};

export default event;