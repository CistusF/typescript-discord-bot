import { i18n } from "../Interfaces/i18n"

const translate: i18n = {
    "Event": {
        "MessageCreate": {
            "commandError": "An error occurred\nPlease report this error to the administrator."
        },
        "Ready": {
            "ready": "Now bot is logined %s!" // [client.user.tag]
        }
    },
    "Command": {
        "ping": {
            "description": "Reply message pong",
            "synonym": ["ping"],
            "contents": ["Pong"]
        },
        "setLang": {
            "description": "Set Language Test",
            "synonym": ["setLang"]
        }
    },
    "Error": "An error occurred\n%s" // [catch e]
}

export default translate;