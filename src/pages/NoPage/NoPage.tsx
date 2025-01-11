import { useEffect } from 'react';
import styles from './NoPage.module.css';
import { TbError404 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import UnServicioLogo from '../../components/UnServicio-logo/UnServicioLogo';

const NoPage = () => {

    useEffect(() => {
        // Cambia el código de estado en el navegador (solo para motores de búsqueda como Google en SSR)
        document.title = "404 - Página no encontrada";

        // Si estás en un framework como Next.js o en Vercel, asegúrate de enviar el estado en el SSR
    }, []);

    return (
        <>
            <div className={styles.noPage}>
                <div className={styles.header}>
                    <UnServicioLogo height='100px' color="white" />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.landingPage}>
                        <TbError404 size={"450"} color={"#000"} />
                        <h1> Page Not Found</h1>
                        <Link to="/" className='text-decoration-none'>
                            <button type="button" className="btn btn-primary">
                                Go Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NoPage;