import { Link, Outlet } from 'react-router-dom'
import { useUser } from '../../user/context/userContext'
import { logout } from '../../auth/services/authServices'
//import styles from './Account.module.css';

const AccountLayout = () => {

    const { userState, logoutUser } = useUser();
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
        logoutUser();
    };



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
                                <Link className="nav-link text-light" to={`/account/${userState.user?.slug ? userState.user?.slug : "create-page"}`}>Crear mi página</Link>
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