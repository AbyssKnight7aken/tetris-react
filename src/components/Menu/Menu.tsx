import styles from './Menu.module.css';
import { MouseEventHandler } from "react";

const Menu = ({onClick}: {onClick: MouseEventHandler}) => {
    return (
        <div className={styles.Menu}>
            <button className={styles.Button} onClick={onClick}>Play</button>
        </div>
    )
}
export default Menu;