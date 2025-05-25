import styles from './buttons.module.css';
import { ReactNode } from 'react';

interface CancelButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode;
}

function CancelButton({ onClick, disabled = false, children }: CancelButtonProps) {
    return (
        <button 
            onClick={onClick} 
            className={`${styles.button} ${styles.cancelButton}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default CancelButton;