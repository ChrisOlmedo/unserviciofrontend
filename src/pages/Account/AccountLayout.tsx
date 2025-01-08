import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../components/Context/IsLogin'
//import styles from './Account.module.css';

const AccountLayout = () => {

    const { isLogin, setIsLogin } = useIsLogin();
    const navigate = useNavigate();
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        navigate("/");
        localStorage.setItem('isLoggedIn', 'false'); // Eliminar el estado de login en localStorage
        setIsLogin(false);
    };

    useEffect(() => {
        if (!isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    return (
        <div className="container-fluid">
            <div className="row ">
                <aside className="mt-5 col-md-3 bg-dark p-3 py-5 h-100">
                    <nav>
                        <ul className="nav flex-column ms-5">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/account/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/account/settings">Settings</Link>
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