import './ServiceProviderPage.css';
import { servicePage } from '../../types/types.ts';

import dataPage from '../../types/providerData.json';
import { useNavigate, useParams } from "react-router-dom";


const ServiceProviderPage = () => {
    const navigate = useNavigate();

    const { slug } = useParams();
    const slugIndex = slug ? parseInt(slug, 10) - 1 : -1;
    const dataService: servicePage = dataPage[slugIndex];


    if (!dataService || !dataService.providerPageData) {
        navigate('/sdfasdf');
    }

    return (
        <>
            <div className="serviceProvider-page">
                <header className="serviceProvider-header">
                    <img src={dataService.logo} alt="serviceProvider" className="serviceProvider-image" />
                    <div className="serviceProvider-info">
                        <h1>{dataService.enterpriseName}</h1>
                        <p className="rating"><strong>Calificación: {dataService.rating}</strong>⭐</p>
                        <p className="description"><strong>Oficio:</strong> {dataService.typeService}</p>
                        <section className="contact">
                            <button>Llamar</button>
                            <p>Teléfono: {dataService.phone}</p>
                        </section>
                    </div>
                </header>
                <section className='serviceProviderContent'>

                    <h1 className='text-center'>{dataService.enterpriseName}</h1>
                    <section className="services">
                        <div className="services-tarjet">
                            <h2>Servicios</h2>
                            <ul>
                                {dataService.providerPageData.services.map((service, index) => (
                                    <li key={index} className="service-card">{service}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <section className="aboutMe">
                        <h2>Quien soy/Quienes somos</h2>
                        <p>{dataService.providerPageData.aboutMe}</p>
                    </section>
                    <section className="gallery">
                        <h2>Galería</h2>
                        <div className="gallery-grid">
                            {dataService.providerPageData.gallery.map((photo, index) => (
                                <img key={index} src={photo.url} alt={`Foto ${index + 1}`} />
                            ))}
                        </div>
                    </section>
                </section>

            </div>
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