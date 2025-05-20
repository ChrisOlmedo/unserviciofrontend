import { ServiceProviderPage } from "../../../../types/types";
import EditButtonAbsolute from "../EditButtonAbsolute";
import EditButton from "../EditButton";
import { useConfig } from "../../context/ConfigFlagContext";
import styles from './ProviderInformation.module.css';

type ProviderInformationProps = Pick<ServiceProviderPage, 'enterpriseName' | 'rating' | 'typeService'>;

const ProviderInformation = ({ enterpriseName, rating, typeService }: ProviderInformationProps) => {
    const { isConfig } = useConfig();

    return (
        <div className={styles.infoContainer}>
            <h2 className={styles.title}>{enterpriseName}</h2>
            <p className={styles.rating}>
                <strong>Calificación: {rating?.toFixed(1)}</strong>⭐
            </p>
            <p className={styles.description}>
                <strong>Oficio:</strong> {typeService}
            </p>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="logo" />
                </EditButtonAbsolute>
            )}
        </div>
    );
};

export default ProviderInformation;