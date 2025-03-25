import { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/userContext'
import { logout } from '../../services/authServices'
//import styles from './Account.module.css';

const AccountLayout = () => {

    const { userState, logoutUser } = useUser();

    const navigate = useNavigate();
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
        logoutUser();
    };

    useEffect(() => {

        if (!userState.user && !userState.isLoading) {
            navigate("/");
        }
    }, [userState.isLoading, userState.user, navigate]);

    if (userState.isLoading) {
        return <h1>Cargando...</h1>
    }

    return (
        <div className="container-fluid">
            <div className="row ">
                <aside className="mt-5 col-md-3 bg-dark p-3 py-5 h-100">
                    <nav>
                        <ul className="nav flex-column ms-5">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/account/profile">Pérfil</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/account/settings">Configuración</Link>
                            </li>
                            <li className="nav-item">
                                {/* 
                                *
                                *
                                * Proxima actualizacion, agregar al usuario un campo que contenga el slug de su pagina
                                * por defecto debera llevar un nombre como "Mi pagina" y el slug sera "mi-pagina"
                                * 
                                * <Link className="nav-link text-light" to="/account/:slug">Crear mi página</Link>
                                * o if(role == 'user') { <Link className="nav-link text-light" to="/account/mi-pagina">Crear mi página</Link> }
                                * 
                                */}
                                <Link className="nav-link text-light" to="/account/bepartner">Crear mi página</Link>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <section className="col-md-9 p-3 text-center">
                    <Outlet />
                </section>
            </div>
        </div>
    );
};

export default AccountLayout;