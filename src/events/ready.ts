import { Event } from '../interface/Types';
import Client from '../Class';

const event: Event = {
    once: false,
    execute: (client: Client) => {
        console.log(client.user?.tag + ' 으로 로그인 하였습니다.');
    }
};

export default event;