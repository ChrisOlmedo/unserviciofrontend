import './ServiceProviderPage.css';

import dataPage from '../../../types/providerData.json';
import { useParams } from "react-router-dom";
import ServiceProviderIndex from '../components/ServiceProviderIndex';
import NoPage from '../../../pages/NoPage/NoPage';

const ServiceProviderPage = () => {

    const { slug } = useParams();
    const slugIndex = slug ? parseInt(slug, 10) - 1 : -1;
    const dataService = dataPage[slugIndex];
    if (!dataService) {
        return <NoPage />;
    };

    return (
        <>
            <ServiceProviderIndex serviceProviderData={dataService} isConfig={false} />
            <section className="reviews text-center mx-5">
                <h1 className="text-center my-5">Formulario para cotizar</h1>
                <p className="text-center my-5">Aquí pdebería haber un formulario para contactar prestadores de servicio</p>
                <h2 className="text-center my-5">Comentarios</h2>
                {/*
                <div className="review">
                    {dataService.reviews.map((comment, index) => (
                        <p key={index} className="my-5">{comment.comment}</p>
                    ))}
                </div>
                */}
                <p className="text-center my-5">
                    Aquí puedes dejar tu comentario sobre el servicio. Recuerda que es importante ser respetuoso y constructivo en tus opiniones.
                    Aquí debería haber muchos comentarios de usuarios, pero no los tengo en el JSON.
                </p>
            </section>
        </>
    );
};

export default ServiceProviderPage;