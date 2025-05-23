import { ReactNode } from 'react';
import styles from './EditButtonAbsolute.module.css';

const EditButtonAbsolute = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.editButtonContainer}>
            {children}
        </div>
    );
}

export default EditButtonAbsolute;