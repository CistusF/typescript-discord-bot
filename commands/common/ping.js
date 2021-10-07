"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    description: "봇의 핑을 확인합니다.",
    dm: true,
    management: false,
    run: (client, message, args) => {
        message.reply("Pong!");
    }
};
exports.default = command;
