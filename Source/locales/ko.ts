import { i18n } from "../Interfaces/i18n"

const translate: i18n = {
    "Event": {
        "MessageCreate": {
            "commandError": "오류가 발생하였습니다.\n관리자에게 문의해주세요."
        },
        "Ready": {
            "ready": "%s로 로그인 하였습니다!" // [client.user.tag]
        }
    },
    "Command": {
        "ping": {
            "description": "퐁을 출력합니다.",
            "synonym": ["핑"],
            "contents": ["퐁"]
        },
        "setLang": {
            "description": "언어설정 테스트",
            "synonym": ["setLang"]
        }
    },
    "Error": "에러가 발생하였습니다.\n%s" // [catch (e)]
}
export default translate;