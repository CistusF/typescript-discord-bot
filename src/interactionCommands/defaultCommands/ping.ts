import { InteractionCommand } from '../../interface/Types';

const command: InteractionCommand = {
    description: '핑퐁 테스트 명령어',
    run: (client, interaction) => {
        interaction.reply("Pong");
    }
};

export default command;