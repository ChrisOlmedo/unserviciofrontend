import styles from './Services.module.css';
import EditButton from "../EditButton";
import EditButtonAbsolute from "../EditButtonAbsolute";
import { useConfig } from "../../context/ConfigFlagContext";

const Services = ({ services }: { services: string[] }) => {
    const { isConfig } = useConfig();

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Servicios</h2>
            <div className={styles.servicesContainer}>
                <ul className={styles.servicesList}>
                    {services.map((service, index) => (
                        <li key={index} className={styles.serviceCard}>{service}</li>
                    ))}
                </ul>
            </div>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="services" />
                </EditButtonAbsolute>
            )}
        </section>
    );
};

export default Services;