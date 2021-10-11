import { InteractionCommand } from '../../../interface/Types';

const command: InteractionCommand = {
    description: '테스트를 위한 명령어',
    run: (client, interaction) => {
        interaction.reply("test");
    }
};

export default command;