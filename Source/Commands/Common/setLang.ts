import { messageCommand } from "../../Interfaces/client";
import mongoose from "mongoose";
import { User } from "../../Schemas/Users";

const command: messageCommand = {
    run: (client, message, args, i18n) => {
        const UserModel = mongoose.model("User", User);
        const user = new UserModel({
            "lang": "en",
            "memo": "",
            "userId": message.author.id
        });

        user.save();
    }
};

export default command;