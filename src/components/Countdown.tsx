import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import style from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const {
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');


    return (
        <div>
            <div className={style.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                disabled
                className={style.contdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                { isActive ? (
                    <button type="button" 
                    className={`${style.contdownButton} ${style.contdownButtonActive}`}
                    onClick={resetCountdown}>
                        Abandonar ciclo
                    </button>
                    ):( 
                    <button type="button" 
                    className={`${style.contdownButton} ${style.contdownButtonInActive}`}
                    onClick={startCountdown}>
                        Iniciar um ciclo
                    </button>
                    )}
                </>
            )}

        </div>
        
    );
}