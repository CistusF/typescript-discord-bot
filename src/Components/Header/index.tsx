import { Component } from 'react';
import { Link } from 'react-router-dom';

import { faLightbulb, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './index.module.css';
import config from '../../Config';

type State = {
    dropType: boolean;
};


export default class Header extends Component {
    state: State = {
        dropType: false
    };

    ColorChange = () => {
        let theme = localStorage.getItem("theme");
        theme = theme === "white" ? "dark" : "white";
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };

    Open = () => {
        this.setState({
            dropType: !this.state.dropType
        });
    }
    render() {
        return (
            <>
                <div className={style.Header}>
                    <div className={style.HeaderHandle}>
                        <Link to="/" className={style.Title}>Cistus</Link>
                        <div className={style.Buttons}>
                            <Link to="/support" className={`${style.Button} .noselect`}>
                                Support
                            </Link>
                            <a href={"https://discord.com/api/oauth2/authorize?client_id=" + config.id + "&redirect_uri=" + encodeURIComponent(config.proxy) + "&response_type=code&scope=" + encodeURI(config.scope.join(" "))} className={`${style.Button} .noselect`}>
                                Login
                            </a>
                            <FontAwesomeIcon onClick={this.ColorChange} className={`${style.Button} ${style.svg}`} icon={faLightbulb} />
                        </div>
                        <div className={style.Dropdown}>
                            <FontAwesomeIcon preserveAspectRatio="xMidYMin" onClick={this.Open} className={`${style.svg} ${style.DropdownButton} ${(this.state.dropType ? style.open : null)}`} size={'3x'} icon={faCaretDown} />
                        </div>
                    </div>
                </div>
                <div className={style.DropdownItems} style={{
                    marginTop: this.state.dropType ? 0 : '-184px'
                }}>
                    {/* 아이템 개당 사이즈 46 */}
                    <Link to="/">
                        <div className={style.Item}>
                            Main
                        </div>
                    </Link>
                    <Link to="/support">
                        <div className={style.Item}>
                            Support
                        </div>
                    </Link>
                    <a href={"https://discord.com/api/oauth2/authorize?client_id=" + config.id + "&redirect_uri=" + encodeURIComponent(config.proxy) + "&response_type=code&scope=" + encodeURI(config.scope.join(" "))}>
                        <div className={style.Item}>
                            Login
                        </div>
                    </a>
                    <div className={style.Item} onClick={this.ColorChange}>
                        <FontAwesomeIcon className={`${style.Button} ${style.svg}`} icon={faLightbulb} />
                    </div>
                </div>
            </>
        )
    }
};