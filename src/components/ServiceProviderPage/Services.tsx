import EditButton from "../Button/EditButton";
import EditButtonAbsolute from "./EditButtonAbsolute";

const Services = ({ services }: { services: string[] }) => {
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


            <EditButtonAbsolute>
                <EditButton context="services" />
            </EditButtonAbsolute>
        </section>
    );
}

export default Services;