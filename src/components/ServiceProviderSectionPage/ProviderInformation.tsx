import { ServicePage } from "../../types/types";
import EditButtonAbsolute from "./EditButtonAbsolute";
import EditButton from "../Button/EditButton";

type ProviderInformationProps = Pick<ServicePage, 'enterpriseName' | 'rating' | 'typeService' | 'phone'>;

const ProviderInformation = ({ enterpriseName, rating, typeService, phone }: ProviderInformationProps) => {
    return (
        <div className="serviceProvider-info">
            <h2>{enterpriseName}</h2>
            <p className="rating"><strong>Calificación: {rating}</strong>⭐</p>
            <p className="description"><strong>Oficio:</strong> {typeService}</p>
            <section className="contact">
                <button aria-label="Llamar al proveedor de servicios">Llamar</button>
                <p>Teléfono: {phone}</p>
            </section>
            <EditButtonAbsolute>
                <EditButton context="providerInformation" />
            </EditButtonAbsolute>

        </div>
    );
};

export default ProviderInformation;