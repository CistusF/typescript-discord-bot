import { Event } from '../interface/Types';
import { Interaction } from 'discord.js';

const event: Event = {
    once: false,
    execute: (client, interaction: Interaction) => {
        try {
            if (interaction.isCommand()) {
                if (interaction.replied) return;
                let command = client.interactions.commands.find(i => i.name === interaction.commandName);
                if (!command || !command.run) return interaction.reply({ content: "명령어에 대한 응답을 찾을 수 없습니다.\n개발자에게 문의해주세요.", ephemeral: true });
                command.run(client, interaction);
            };
        } catch (e) {
            console.error(e);
        };
    }
};

export default event;