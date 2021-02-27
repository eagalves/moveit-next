import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'



interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye'
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    levelUp: () => void;
    currentExperience: number;
    challengedCompleted: number;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    completeChallenge: () => void;
    experienceToNextLevel: number;
}


export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(30);
    const [challengedCompleted, setchallengedCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, []) // quando segundo parametro é uma array vazio [], esse componente é executado uma unica vez assim q chamado

    useEffect(() => {
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challengedCompleted',String(challengedCompleted));
    },[level,currentExperience,challengedCompleted]) //dispara uma função sempre que uma das váriaveis for modificada
    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp`
            })
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
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setchallengedCompleted(challengedCompleted + 1);
    }

    return (
        <ChallengeContext.Provider value={{
            level,
            levelUp,
            currentExperience,
            challengedCompleted,
            startNewChallenge,
            activeChallenge,
            experienceToNextLevel,
            resetChallenge,
            completeChallenge
        }}>
            {children}
        </ChallengeContext.Provider>
    )
}