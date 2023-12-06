import styles from './Menu.module.css';

const Menu = ({ onClick }) => (
  <div className={styles.Menu}>
    <button className={styles.Button} onClick={onClick}>
      Play Tetris
    </button>
  </div>
);

export default Menu;
