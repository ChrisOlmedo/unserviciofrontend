import { useState } from 'react';
import styles from './ProfileSidebar.module.css';
import ProviderInformation from './ProviderInformation';
import EditButtonAbsolute from "../EditButtonAbsolute";
import EditButton from "../EditButton";
import { Image } from "../../../../types/types";
import { FaPhone, FaWhatsapp, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ProfileSidebarProps {
    logo: Image;
    enterpriseName: string;
    rating: number;
    typeService: string;
    phone: string;
    email?: string;
    address?: string;
    isConfig?: boolean;
}

const ProfileSidebar = ({
    logo,
    enterpriseName,
    rating,
    typeService,
    phone,
    email,
    address,
    isConfig,
}: ProfileSidebarProps) => {
    const [showContact, setShowContact] = useState(false);

    const toggleContact = () => {
        setShowContact(!showContact);
    };

    const formatPhone = (phone: string) => {
        return phone.replace(/\D/g, '');
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.profileCard}>
                <div className={styles.logoContainer}>
                    <img 
                        src={logo.url} 
                        alt="Logo del prestador de servicios" 
                        className={styles.profileImage} 
                    />

                </div>
                <ProviderInformation
                    enterpriseName={enterpriseName}
                    rating={rating}
                    typeService={typeService}
                />
                
                <div className={styles.contactActions}>
                    <a 
                        href={`tel:${formatPhone(phone)}`}
                        className={styles.actionButton}
                        aria-label="Llamar al proveedor"
                    >
                        <FaPhone className={styles.actionIcon} />
                        Llamar
                    </a>
                    <a 
                        href={`https://wa.me/${formatPhone(phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionButton}
                        aria-label="Contactar por WhatsApp"
                    >
                        <FaWhatsapp className={styles.actionIcon} />
                        WhatsApp
                    </a>
                    {email && (
                        <a 
                            href={`mailto:${email}`}
                            className={styles.actionButton}
                            aria-label="Enviar correo electrónico"
                        >
                            <FaEnvelope className={styles.actionIcon} />
                            Correo
                        </a>
                    )}
                </div>

                <button 
                    className={styles.showContactButton}
                    onClick={toggleContact}
                    aria-label={showContact ? "Ocultar datos de contacto" : "Ver datos de contacto"}
                >
                    <span>Ver datos de contacto</span>
                    {showContact ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {showContact && (
                    <div className={styles.contactDetails}>
                        <div className={styles.contactItem}>
                            <FaPhone className={styles.contactIcon} />
                            <span>{phone}</span>
                        </div>
                        {email && (
                            <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <span>{email}</span>
                            </div>
                        )}
                        <div className={styles.contactItem}>
                            <FaWhatsapp className={styles.contactIcon} />
                            <span>{phone}</span>
                        </div>
                        {address && (
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📍</span>
                                <span>{address}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="information" />
                </EditButtonAbsolute>
            )}
        </div>
    );
};

export default ProfileSidebar; 