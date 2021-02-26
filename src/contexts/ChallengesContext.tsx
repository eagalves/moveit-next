import { createContext, useState, ReactNode } from 'react'
import challenges from '../../challenges.json'

interface ChallengesProviderProps {
    children: ReactNode;
}
interface Challenge{
    type: 'body' | 'eye'
    description: string;
    amount: number;
}
interface ChallengesContextData{
    level: number;
    levelUp: ()=>void;
    currentExperience: number;
    challengedCompleted: number;
    startNewChallenge: ()=>void;
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
    const [activeChallenge,setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level+1)*4,2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random()*challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge)
    }
    
    function resetChallenge(){
        setActiveChallenge(null)
    }
    
   function completeChallenge() {
       if(!activeChallenge){
           return;
       }
       const {amount} = activeChallenge;
       let finalExperience = currentExperience + amount;
       if(finalExperience >= experienceToNextLevel){
           levelUp();
       }
       setCurrentExperience(finalExperience);
       setActiveChallenge(null);
       setchallengedCompleted(challengedCompleted+1);
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