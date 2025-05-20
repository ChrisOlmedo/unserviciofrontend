import { useContactTracking } from '../../hooks/useContactTracking';
import styles from './QuickContact.module.css';

interface QuickContactProps {
    phone: string;
    email: string;
    providerId: string;
}

const QuickContact = ({ phone, email, providerId }: QuickContactProps) => {
    const {
        handlePhoneClick,
        handleEmailClick,
        handleWhatsAppClick,
        handleCopy
    } = useContactTracking(providerId);

    const handleCopyPhone = () => {
        navigator.clipboard.writeText(phone);
        handleCopy('phone');
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        handleCopy('email');
    };

    const formatPhone = (phone: string) => {
        return phone.replace(/\D/g, '');
    };

    return (
        <div className={styles.quickContact}>
            <h3 className={styles.quickContactTitle}>Contacto Rápido</h3>
            <div className={styles.contactInfo}>
                <div className={styles.contactItem} onClick={handlePhoneClick}>
                    <span className={styles.contactIcon}>📞</span>
                    <a href={`tel:${formatPhone(phone)}`}>{phone}</a>
                    <button 
                        className={styles.copyButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPhone();
                        }}
                        aria-label="Copiar número de teléfono"
                    >
                        📋
                    </button>
                </div>

                <div className={styles.contactItem} onClick={handleEmailClick}>
                    <span className={styles.contactIcon}>✉️</span>
                    <a href={`mailto:${email}`}>{email}</a>
                    <button 
                        className={styles.copyButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCopyEmail();
                        }}
                        aria-label="Copiar correo electrónico"
                    >
                        📋
                    </button>
                </div>

                <div className={styles.contactItem} onClick={handleWhatsAppClick}>
                    <span className={styles.contactIcon}>💬</span>
                    <a 
                        href={`https://wa.me/${formatPhone(phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Chatear por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default QuickContact; 