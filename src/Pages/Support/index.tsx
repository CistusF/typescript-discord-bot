import { Component } from "react";
import style from './index.module.css';

import { IconDefinition, faBullhorn, faUserEdit, faEdit, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Datas: {
    title: string;
    description: string;
    img: IconDefinition;
}[] = [
        {
            title: "공지",
            description: "프로그램의 공지를 확인할 수 있어요!",
            img: faBullhorn
        },
        {
            title: "계정설정",
            description: "계정에 대한 정보를 수정 가능합니다!",
            img: faUserEdit
        },
        {
            title: "수정",
            description: "프로그램에서 공식, 비공식 적으로 수정된 사항들을 모아두었어요!",
            img: faEdit
        },
        {
            title: "보안",
            description: "프로그램의 보안상 문제와 같은 사항들을 확인할 수 있어요!",
            img: faUserLock
        }
    ];

export default class Main extends Component {
    render() {
        return (
            <>
                <div className={style.Welcome}>
                    <p>
                        Vendetta Support
                    </p>
                    <p className={style.subWelcome}>
                        We solve the problem of our customers
                    </p>
                </div>
                <div className={style.warp} />
                <div className={style.contents}>
                    <p className={style.Title}>
                        계정 설정부터 승인까지 저희와 관련된 모든 것을 문의하세요.
                    </p>
                    <p className={style.subTitle}>
                        저희 프로그램을 시작한 지 얼마 안 되어 팁을 찾고 계신가요?
                    </p>
                    <p className={style.subTitle}>
                        그렇다면, 저희의 초보자를 위한 가이드 를 확인해 보세요!
                    </p>
                    <div className={style.warp} />
                    <p className={style.Title}>
                        저희가 미리 준비한 답변을 보시겠어요?
                    </p>
                    <div className={style.Component}>
                        {
                            Datas.map(({ title, description, img }): JSX.Element => {
                                return <div className={style.ButtonOuter}>
                                    <div className={style.Button}>
                                        <FontAwesomeIcon className={style.svg} size={'4x'} icon={img} />
                                        <div className={style.textArea}>
                                            <p>{title}</p>
                                            <p className={style.subText}>{description}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </>
        );
    };
};