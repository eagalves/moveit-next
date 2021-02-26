import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallengesContainer.module.css'
export function CompletedChallenges() {
    const {challengedCompleted} = useContext(ChallengeContext);
    return (
        <div className={styles.completedChallengesContainer}>
           <span> Desafios completos</span>
           <span>{challengedCompleted}</span>
        </div>
    );
}