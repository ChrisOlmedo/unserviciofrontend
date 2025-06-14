import styles from './dangerButton.module.css';

interface DangerButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

const DangerButton = ({ children, onClick, disabled }: DangerButtonProps) => {
    return (
        <button
            className={styles.dangerButton}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default DangerButton; 