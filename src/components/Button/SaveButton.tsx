import styles from './buttons.module.css';
interface CancelButtonProps {
    onClick: () => void;
}

function SaveButton({ onClick }: CancelButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.button} ${styles.saveButton}`}>
            Save
        </button>
    );
}

export default SaveButton;