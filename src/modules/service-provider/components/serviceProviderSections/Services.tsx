import EditButton from "../EditButton";
import EditButtonAbsolute from "../EditButtonAbsolute";
import { useConfig } from "../../context/ConfigFlagContext";

const Services = ({ services }: { services: string[] }) => {
    const { isConfig } = useConfig();

    return (
        <section className="services">
            <div className="services-tarjet">
                <h2>Servicios</h2>
                <ul>
                    {services.map((service, index) => (
                        <li key={index} className="service-card">{service}</li>
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
}

export default Services;