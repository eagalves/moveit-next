import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const {level} = useContext(ChallengeContext)
    return (
        <div className={styles.profileContainer}>
           <img src="https://github.com/eagalves.png" alt="Evandro Augusto" />
            
            
            <div>
                
                <strong>Evandro Augusto</strong> 
                <p> <img src="icons/level.svg"/>
                   level {level}
                </p>
            </div>
        </div>
    );
}