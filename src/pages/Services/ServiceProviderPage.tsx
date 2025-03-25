import './ServiceProviderPage.css';
import { ServicePage } from '../../types/types.ts';

import dataPage from '../../types/providerData.json';
import { useParams } from "react-router-dom";
import ServiceProviderIndex from '../../components/ServiceProviderPage/ServiceProviderIndex.tsx';

const ServiceProviderPage = () => {


    const { slug } = useParams();
    const slugIndex = slug ? parseInt(slug, 10) - 1 : -1;
    const dataService: ServicePage = dataPage[slugIndex];


    return (
        <>
            <ServiceProviderIndex serviceProviderData={dataService} isConfig={false} handleModalEdith={() => { }} />
            <section className="reviews text-center mx-5">
                <h2>Comentarios</h2>
                <div className="review">
                    {dataService.reviews.map((comment, index) => (
                        <p key={index} className="my-5">{comment.comment}</p>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ServiceProviderPage;