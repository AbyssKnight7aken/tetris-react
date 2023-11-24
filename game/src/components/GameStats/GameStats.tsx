import {memo} from 'react';
import styles from './GameStats.module.css';

const GameStats = ({gameStats}: {gameStats: any}) => {
    const {level, points, linesCompleted, linesPerLevel} = gameStats;
    const linesToLevel = linesPerLevel - linesCompleted;
    return (
        <ul className={`${styles.GameStats} ${styles.GameStats__right}`}>
            <li>Levels</li>
            <li className={styles.value}>{level}</li>
            <li>Lines to level</li>
            <li className={styles.value}>{linesToLevel}</li>
            <li>Points</li>
            <li className={styles.value}>{points}</li>
        </ul>
    );
}

export default memo(GameStats);