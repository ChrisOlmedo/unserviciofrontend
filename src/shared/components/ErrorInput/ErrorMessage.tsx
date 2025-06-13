import styles from './ErrorMessage.module.css';
const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className={styles.errorMessage}>{message}</div>
    );
}

export default ErrorMessage;