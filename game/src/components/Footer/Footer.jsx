import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <section className={styles.site_footer}>
            <p>copyright &copy; 2023 <Link to="https://github.com/AbyssKnight7aken" target="_blank" rel="noopener noreferrer"> Radoslav Petrov</Link></p>
        </section>
    );
}

export default Footer;