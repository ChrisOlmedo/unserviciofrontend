import { ServiceProviderPage } from "types";
import EditButtonAbsolute from "modules/service-provider/components/EditButtonAbsolute";
import EditButton from "modules/service-provider/components/EditButton";
import { useConfig } from "modules/service-provider/context/ConfigFlagContext";
import styles from './ProviderInformation.module.css';

type ProviderInformationProps = Pick<ServiceProviderPage, 'enterpriseName' | 'rating' | 'serviceCategories'>;

const ProviderInformation = ({ enterpriseName, rating, serviceCategories }: ProviderInformationProps) => {
    const { isConfig } = useConfig();

    return (
        <div className={styles.infoContainer}>
            <h2 className={styles.title}>{enterpriseName}</h2>
            <p className={styles.rating}>
                <strong>Calificación: {rating?.toFixed(1)}</strong>⭐
            </p>
            <p className={styles.description}>
                <strong>Oficio:</strong> {serviceCategories.join(', ')}
            </p>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="information" />
                </EditButtonAbsolute>
            )}
        </div>
    );
};

export default ProviderInformation;