"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event = {
    once: false,
    execute: (client) => {
        var _a;
        console.log(((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag) + ' 으로 로그인 하였습니다.');
    }
};
exports.default = event;
