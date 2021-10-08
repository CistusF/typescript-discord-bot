import { GuildInteractionCommand } from '../../../interface/Types';

const command: GuildInteractionCommand = {
    options: {
        description: '테스트를 위한 명령어',
        run: (client, interaction) => {
            interaction.reply("test");
        }
    },
    guildId: "819244674933850214",
};

export default command;