import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import UnServicioIcon from '../UnServicio-logo/UnServicioIcon';

const Footer = () => {
    return (
        <footer>
            <div className={styles.footerContainer}>
                <p>&copy; {new Date().getFullYear()} UnServicio. Todos los derechos resevados.</p>
                <div className={styles.footerLogo}>
                    <Link to='/' >
                        <UnServicioIcon color='white' />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;