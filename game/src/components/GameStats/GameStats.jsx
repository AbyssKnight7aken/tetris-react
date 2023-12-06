import React from 'react';

import styles from "./GameStats.module.css";

const GameStats = ({ gameStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  //console.log(gameStats);

  return (
    <ul className={`${styles.GameStats} ${styles.GameStats__right}`}>
      <li>Level</li>
      <li className={styles.value}>{level}</li>
      <li>Lines to level</li>
      <li className={styles.value}>{linesToLevel}</li>
      <li>Points</li>
      <li className={styles.value}>{points}</li>
    </ul>
  );
};

export default React.memo(GameStats);
