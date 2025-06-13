import styles from './buttons.module.css';
import { ReactNode } from 'react';

interface SaveButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode;
}

function SaveButton({ onClick, disabled = false, children }: SaveButtonProps) {
    return (
        <button 
            onClick={onClick} 
            className={`${styles.button} ${styles.saveButton}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default SaveButton;