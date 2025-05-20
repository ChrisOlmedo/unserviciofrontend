const serviceProvider = {
    slug: "servicio-ejemplo",
    enterpriseName: "Servicios Alejandro",
    logo: { url: "https://via.placeholder.com/80", file: null },
    typeService: "Plomería",
    rating: 4.7,
    phone: "555-123-4567",
    whatsapp: "5215551234567",
    email: "contacto@serviciosalejandro.com",
    location: "Guadalajara, Jalisco",
    coverage: {
        maxDistance: 20,
        cities: ["Zapopan", "Tlaquepaque", "Tonalá"],
    },
    services: [
        "Instalación de tuberías",
        "Reparación de fugas",
        "Mantenimiento preventivo",
    ],
    aboutMe:
        "Somos una empresa con más de 10 años de experiencia, ofreciendo soluciones rápidas y confiables para tu hogar.",
    gallery: [
        "https://via.placeholder.com/150?text=Trabajo+1",
        "https://via.placeholder.com/150?text=Trabajo+2",
        "https://via.placeholder.com/150?text=Trabajo+3",
        "https://via.placeholder.com/150?text=Trabajo+4",
    ],
};

export default function ServiceProviderPagePrueba() {
    return (
        <>
            <div className="container">
                {/* Header con logo y nombre */}
                <header className="header">
                    <img
                        src={serviceProvider.logo.url}
                        alt="Logo empresa"
                        className="logo"
                    />
                    <div>
                        <h1 className="enterprise-name">{serviceProvider.enterpriseName}</h1>
                        <p className="type-service">
                            Tipo de servicio: <span>{serviceProvider.typeService}</span>
                        </p>
                        <p className="rating">⭐ {serviceProvider.rating.toFixed(1)} / 5</p>
                    </div>
                </header>

                {/* Información de contacto */}
                <section className="card contact">
                    <h2 className="section-title">Contacto</h2>
                    <p>📞 Teléfono: {serviceProvider.phone}</p>
                    <p>
                        📱 WhatsApp:{" "}
                        <a
                            href={`https://wa.me/${serviceProvider.whatsapp}`}
                            className="whatsapp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Enviar mensaje
                        </a>
                    </p>
                    <p>✉️ Email: {serviceProvider.email}</p>
                    <p>📍 Ubicación: {serviceProvider.location}</p>
                </section>

                {/* Cobertura */}
                <section className="card">
                    <h2 className="section-title">Cobertura</h2>
                    <p>Distancia máxima: {serviceProvider.coverage.maxDistance} km</p>
                    <ul className="list">
                        {serviceProvider.coverage.cities.map((city) => (
                            <li key={city}>{city}</li>
                        ))}
                    </ul>
                </section>

                {/* Servicios */}
                <section className="card">
                    <h2 className="section-title">Servicios ofrecidos</h2>
                    <ul className="list two-columns">
                        {serviceProvider.services.map((service) => (
                            <li key={service}>{service}</li>
                        ))}
                    </ul>
                </section>

                {/* Sobre mí */}
                <section className="card light-bg">
                    <h2 className="section-title">Sobre nosotros</h2>
                    <p>{serviceProvider.aboutMe}</p>
                </section>

                {/* Galería */}
                <section>
                    <h2 className="section-title">Galería</h2>
                    <div className="gallery">
                        {serviceProvider.gallery.map((imgUrl, idx) => (
                            <img
                                key={idx}
                                src={imgUrl}
                                alt={`Trabajo ${idx + 1}`}
                                className="gallery-img"
                            />
                        ))}
                    </div>
                </section>
            </div>

            <style>{`
        .container {
          max-width: 960px;
          margin: auto;
          padding: 24px;
          font-family: sans-serif;
          color: #333;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 40px;
        }
        .logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ccc;
        }
        .enterprise-name {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        .type-service {
          font-size: 14px;
          color: #666;
        }
        .type-service span {
          font-weight: 600;
        }
        .rating {
          margin-top: 4px;
          color: #eab308;
          font-weight: bold;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #ddd;
          padding-bottom: 6px;
          margin-bottom: 16px;
        }
        .card {
          padding: 20px;
          margin-bottom: 30px;
          border: 1px solid #eee;
          border-radius: 10px;
        }
        .light-bg {
          background-color: #f9fafb;
        }
        .list {
          list-style-type: disc;
          padding-left: 20px;
          margin-top: 10px;
        }
        .list li {
          margin-bottom: 6px;
        }
        .two-columns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 16px;
        }
        .gallery-img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        .whatsapp {
          color: #25d366;
          text-decoration: none;
        }
      `}</style>
        </>
    );
}
