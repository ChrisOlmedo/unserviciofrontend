import styles from './TitleModal.module.css';
interface TitleModalProps {
    title: string;
}
function TitleModal({ title }: TitleModalProps) {

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <h1>{title}</h1>
            </div>
        </header>

    );
};

export default TitleModal;