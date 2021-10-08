import { Component } from "react";

import style from './index.module.css';

import { faDiscord, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Home extends Component {
    redirect = (link: string) => {
        window.open("https://" + link);
    };

    render() {
        return (
            <>
                <div className={style.impact}>
                    <div className={style.title}>
                        VENDETTA
                    </div>
                    <div className={style.description}>
                        <FontAwesomeIcon icon={faDiscord} />
                        ChatBot Maker
                        <FontAwesomeIcon icon={faHeartbeat} />
                    </div>
                    <div className={style.hr} />
                    <div className={style.description}>
                        저희와 함께 하세요!
                    </div>
                    <div className={style.container}>
                        <div className={style.button} onClick={this.redirect.bind(this, "discord.gg/6d72f9u")}>
                            <p>
                                <p>
                                    <FontAwesomeIcon icon={faDiscord} />
                                </p>
                            </p>
                            Discord
                        </div>
                        <div className={style.button} onClick={this.redirect.bind(this, "youtube.com/channel/UCdkQT9t-vio9KmPOdti5ChA")}>
                            <p>
                                <FontAwesomeIcon icon={faYoutube} />
                            </p>
                            Youtube
                        </div>
                        <div className={style.button} onClick={this.redirect.bind(this, "github.com/vendettadelsangue/typescript-discord-bot/tree/dashboard")}>
                            <p>
                                <FontAwesomeIcon icon={faGithub} />
                            </p>
                            Github
                        </div>
                    </div>
                </div>
                <div className={`${style.container} ${style.vertical}`}>
                    <div className={`${style.subTitle} ${style.fontFix}`}>
                        VENDETTA가 뭔가요?
                    </div>
                    <div className={`${style.description} ${style.fontFix}`}>
                        <p>
                            Vendetta는 봇 제작자로
                        </p>
                        <p>
                            봇과 아이디어를 공유하는 사람입니다.
                        </p>
                    </div>
                </div>
                <div className={`${style.container} ${style.vertical}`}>
                    <div className={`${style.subTitle} ${style.fontFix}`}>
                        유료 서비스인가요?
                    </div>
                    <div className={`${style.description} ${style.fontFix}`}>
                        <p>
                            프로그램은 모두 공짜입니다.
                        </p>
                        <p>
                            그저 사용하시며 의견을 공유해주세요!
                        </p>
                    </div>
                </div>
            </>
        );
    };
};