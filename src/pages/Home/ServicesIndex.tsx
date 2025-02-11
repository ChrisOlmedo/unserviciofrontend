import cardData from '../../types/cardData.json'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import { Link } from 'react-router-dom';


const ServicesIndex = () => {

    return (
        <div className="bg-light" style={{ padding: '300px 10px' }}>
            <h1 className="text-center my-4">Servicios</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {cardData.map((card, index) => (
                    <div key={index}>
                        <Link to={`/services/${card.id}`} className='text-decoration-none'>
                            <ServiceCard
                                logo={card.logo}
                                enterpriseName={card.enterpriseName}
                                typeService={card.typeService}
                                rating={card.rating}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesIndex;