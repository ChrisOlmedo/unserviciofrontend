import { useState } from 'react';
import styles from './ProfileSidebar.module.css';
import EditButtonAbsolute from "../EditButtonAbsolute";
import EditButton from "../EditButton";
import { Image } from "../../../../types/types";
import { FaPhone, FaWhatsapp, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useConfig } from '../../context/ConfigFlagContext';


interface ProfileSidebarProps {
    logo: Image;
    enterpriseName: string;
    rating: number;
    serviceCategories: string[];
    phone: string;
    email?: string;
    location?: string;
}

const ProfileSidebar = ({
    logo,
    enterpriseName,
    rating,
    serviceCategories,
    phone,
    email,
    location,
}: ProfileSidebarProps) => {
    const [showContact, setShowContact] = useState(false);
    const { isConfig } = useConfig();
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
                                <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
                                <span className={styles.starFilled}>★</span>
                            </div>
                            <span className={styles.reviewCount}>• {rating} reseñas</span>
                        </div>
                        {serviceCategories && (
                            <div className={styles.serviceType}>
                                {serviceCategories.map((category, index) => (
                                    <span key={index} className={styles.serviceBadge}>
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.contactActions}>
                        <a
                            href={`tel:${formatPhone(phone)}`}
                            className={styles.actionButton}
                            aria-label="Llamar al proveedor"
                        >
                            <FaPhone className={styles.actionIcon} />
                            <span className={styles.actionText}>Llamar</span>
                        </a>
                        <a
                            href={`https://wa.me/${formatPhone(phone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionButton}
                            aria-label="Contactar por WhatsApp"
                        >
                            <FaWhatsapp className={styles.actionIcon} />
                            <span className={styles.actionText}>WhatsApp</span>
                        </a>
                        <a
                            href={`mailto:${email}`}
                            className={styles.actionButton}
                            aria-label="Enviar correo electrónico"
                        >
                            <FaEnvelope className={styles.actionIcon} />
                            <span className={styles.actionText}>Correo</span>
                        </a>
                    </div>

                    <button
                        className={styles.showContactButton}
                        onClick={toggleContact}
                        aria-label={showContact ? "Ocultar datos de contacto" : "Ver datos de contacto"}
                    >
                        <span className={styles.contactButtonText}>
                            {showContact ? "Ocultar datos de contacto" : "Ver datos de contacto"}
                        </span>
                        {showContact ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {showContact && (
                        <div className={styles.contactDetails}>
                            <div className={styles.contactItem}>
                                <FaPhone className={styles.contactIcon} />
                                <span>{phone}</span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <span>{email}</span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaWhatsapp className={styles.contactIcon} />
                                <span>{phone}</span>
                            </div>
                            {location && (
                                <div className={styles.contactItem}>
                                    <span className={styles.contactIcon}>📍</span>
                                    <span>{location}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar; 