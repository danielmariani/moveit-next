import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number,
    seconds: number,
    isActive: boolean,
    hasFinished: boolean,
    startCountdown: () => void,
    resetCountdown: () => void,
}   

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) { 
    const { startNewChallenge } = useContext(ChallengesContext);
    const totalSeconds = 25 * 60;
    const [time, setTime] = useState(totalSeconds);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(totalSeconds);
    }
    
    useEffect(() => {
        if (isActive) {
            if (time > 0) {
                countdownTimeout = setTimeout(() => {
                    setTime(time - 1);
                }, 1000);
            } else {
                setIsActive(false);
                setHasFinished(true);
                startNewChallenge();
            }
        }
    },[isActive, time])

    return (
        <CountdownContext.Provider value={
            {
                minutes,
                seconds,
                isActive,
                hasFinished,
                startCountdown,
                resetCountdown,
            }}>
            {children}
        </CountdownContext.Provider>
    );
}
