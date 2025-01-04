import styles from './UnServicioLogo.module.css';
import UnServicioIcon from './UnServicioIcon';

const calculateFontSize = (height: string) => {
    if (!height || typeof height !== 'string') {
        console.warn('Invalid height:', height);
        return '16px'; // Valor por defecto en caso de error
    }
    const numericPart = parseFloat(height);
    const unitPart = height.replace(/[0-9.]/g, '');

    if (isNaN(numericPart)) {
        console.warn('Height does not contain a numeric value:', height);
        return '16px'; // Valor por defecto
    }

    return `${numericPart * 0.5}${unitPart}`;
};

interface Props {
    color?: string;
    height: string;
}

const UnServicioLogo = ({ color, height }: Props) => {

    const fontSize = calculateFontSize(height);
    return (
        <div className={styles.logoContainer} style={{ height }}>
            <UnServicioIcon color={color} />
            <span id='logo-title' className={styles.logoTitle} style={{ color, fontSize }}>UnServicio</span>
        </div >
    );
};

export default UnServicioLogo;
