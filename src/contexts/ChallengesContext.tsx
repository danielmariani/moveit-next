import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookie from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number,
}

interface ChallengeContextData {
    level: number,
    currentExperience: number, 
    experienceToNextLevel: number, 
    challengesCompleted: number,
    activeChallenge: Challenge,
    levelUp: () => void, 
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,

}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ 
    children, 
    ...restProps }: ChallengesProviderProps) {  
    const [level, setLevel] = useState(restProps.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(restProps.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(restProps.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []); //  Array vazio significa que a função será executada uma única vez.

    useEffect(() => {
        Cookie.set('level', String(level));
        Cookie.set('currentExperience', String(currentExperience));
        Cookie.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, setChallengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }
    function challengesCompletedUp() {
        setChallengesCompleted(challengesCompleted + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        if (Notification.permission === 'granted') {
            new Audio('/notification.mp3').play();
            new Notification('Novo desafio ', {
                body: `Valendo ${challenge.amount} xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            levelUp();
            finalExperience -= experienceToNextLevel;
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        challengesCompletedUp();

    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    return (
        <ChallengesContext.Provider value={
            {
                level,
                currentExperience, 
                experienceToNextLevel,
                challengesCompleted,
                activeChallenge,
                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}>
            {children}
            {isLevelUpModalOpen && (<LevelUpModal />) }
            
        </ChallengesContext.Provider>
    );
}