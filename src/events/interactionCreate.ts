import { Event } from '../interface/Types';
import { Interaction } from 'discord.js';

const event: Event = {
    once: false,
    execute: (client, interaction: Interaction) => {
        try {
            if (interaction.isCommand()) {
                let command;
                if (interaction.guildId) {
                    command = client.interactions.commands.find(i => i.guildId === interaction.guildId)?.options;
                    if (!command) {
                        command = client.interactions.commands.find(i => i.options?.name === interaction.commandName)?.options;
                    };
                    if (!command || !command.run) return interaction.reply({ content: "없는 명령어 입니다.\n개발자에게 업데이트를 요청해주세요.", ephemeral: true });
                    return command!.run(client, interaction);
                };
            };
        } catch (e) {
            console.error(e);
        };
    }
};

export default event;