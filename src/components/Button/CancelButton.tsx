import styles from './buttons.module.css';

interface CancelButtonProps {
    onClick: () => void;
}

function CancelButton({ onClick }: CancelButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.button} ${styles.cancelButton}`}>
            Cancel
        </button>
    );
}

export default CancelButton;