import { Component } from 'react';
import { Link } from 'react-router-dom';

import { faLightbulb, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './index.module.css';

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
                            <Link to="/" className={`${style.Button} .noselect`}>
                                Login
                            </Link>
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
                    <Link to="/">
                        <div className={style.Item}>
                            Login
                        </div>
                    </Link>
                    <div className={style.Item} onClick={this.ColorChange}>
                        <FontAwesomeIcon className={`${style.Button} ${style.svg}`} icon={faLightbulb} />
                    </div>
                </div>
            </>
        )
    }
};