import { useState } from 'react';
import styles from './ProfileSidebar.module.css';
import EditButtonAbsolute from "modules/service-provider/components/EditButtonAbsolute";
import EditButton from "modules/service-provider/components/EditButton";
import { Image } from "types";
import { FaPhone, FaWhatsapp, FaEnvelope, FaCopy, FaCheck } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useConfig } from "modules/service-provider/context/ConfigFlagContext";
import CategoryPill from 'components/CategoryPill/CategoryPill';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileSidebarProps {
    logo: Image;
    enterpriseName: string;
    rating: number;
    serviceCategories: string[];
    phone: string;
    whatsapp?: string;
    email?: string;
    location?: string;
}

const ProfileSidebar = ({
    logo,
    enterpriseName,
    rating,
    serviceCategories,
    phone,
    whatsapp,
    email,
}: ProfileSidebarProps) => {
    const [isContactVisible, setIsContactVisible] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const { isConfig } = useConfig();

    const formatPhone = (phone: string) => {
        return phone.replace(/\D/g, '');
    };

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.profileCard}>
                <div className={styles.logoContainer}>
                    {isConfig && (
                        <EditButtonAbsolute>
                            <EditButton context="logo" />
                        </EditButtonAbsolute>
                    )}
                    <div className={styles.logoWrapper}>
                        <img
                            src={logo.url}
                            alt="Logo del prestador de servicios"
                            className={styles.profileImage}
                        />
                    </div>
                </div>

                <div className={styles.infoContainer}>
                    {isConfig && (
                        <EditButtonAbsolute>
                            <EditButton context="information" />
                        </EditButtonAbsolute>
                    )}

                    <div className={styles.businessInfo}>
                        <h2 className={styles.enterpriseName}>{enterpriseName}</h2>
                        <div className={styles.ratingContainer}>
                            <div className={styles.ratingInfo}>
                                <span className={styles.ratingNumber}>{rating ? rating.toFixed(1) : 0}</span>
                                <span className={styles.starFilled}>★</span>
                            </div>
                            <span className={styles.reviewCount}>• {rating} reseñas</span>
                        </div>
                        {serviceCategories && (
                            <div className={styles.serviceType}>
                                {serviceCategories.map((category, index) => (
                                    <CategoryPill key={index}>
                                        {category}
                                    </CategoryPill>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.contactActions}>
                        <a href={`tel:${phone}`} className={styles.actionButton}>
                            <FaPhone className={styles.actionIcon} />
                            <span className={styles.actionText}>Llamar</span>
                        </a>
                        <a href={`https://wa.me/${whatsapp || phone}`} target="_blank" rel="noopener noreferrer" className={styles.actionButton}>
                            <FaWhatsapp className={styles.actionIcon} />
                            <span className={styles.actionText}>WhatsApp</span>
                        </a>
                        <a href={`mailto:${email}`} className={styles.actionButton}>
                            <FaEnvelope className={styles.actionIcon} />
                            <span className={styles.actionText}>Correo</span>
                        </a>
                    </div>

                    <button
                        className={styles.showContactButton}
                        onClick={() => setIsContactVisible(!isContactVisible)}
                        aria-expanded={isContactVisible}
                    >
                        <span>Mostrar datos de contacto</span>
                        <motion.div
                            animate={{ rotate: isContactVisible ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <IoIosArrowDown className={styles.contactIcon} />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {isContactVisible && (
                            <motion.div
                                className={styles.contactDetails}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.contactItem}>
                                    <FaPhone className={`${styles.contactIconItem} ${styles.phoneIcon}`} />
                                    <span className={styles.contactText}>{phone}</span>
                                    <button
                                        className={styles.copyButton}
                                        onClick={() => handleCopy(phone, 'phone')}
                                        title="Copiar teléfono"
                                    >
                                        {copiedField === 'phone' ? <FaCheck /> : <FaCopy />}
                                    </button>
                                </div>
                                <div className={styles.contactItem}>
                                    <FaWhatsapp className={`${styles.contactIconItem} ${styles.whatsappIcon}`} />
                                    <span className={styles.contactText}>{whatsapp || phone}</span>
                                    <button
                                        className={styles.copyButton}
                                        onClick={() => handleCopy(whatsapp || phone, 'whatsapp')}
                                        title="Copiar WhatsApp"
                                    >
                                        {copiedField === 'whatsapp' ? <FaCheck /> : <FaCopy />}
                                    </button>
                                </div>
                                <div className={styles.contactItem}>
                                    <FaEnvelope className={`${styles.contactIconItem} ${styles.emailIcon}`} />
                                    <span className={styles.contactText}>{email}</span>
                                    <button
                                        className={styles.copyButton}
                                        onClick={() => handleCopy(email || '', 'email')}
                                        title="Copiar correo"
                                    >
                                        {copiedField === 'email' ? <FaCheck /> : <FaCopy />}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar; 