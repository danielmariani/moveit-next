import { useContext } from "react";
import { render } from "react-dom";
import { ChallengesContext } from "../contexts/ChallengesContext";

import style from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext)
    return (
        <div className={style.profileContainter}>
            <img src="https://github.com/danielmariani.png" alt="Daniel Mariani"/>
            <div>
                <strong>Daniel Mariani</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}