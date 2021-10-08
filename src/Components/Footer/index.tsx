import { Component } from 'react';

import style from './index.module.css';

export default class Footer extends Component {
    render() {
        return (
            <div className={style.Footer}>
                <div className={style.divider}></div>
                <div className={style.FooterHandle}>
                    <p className={style.Title}>Cistus</p>
                </div>
            </div>
        )
    }
};