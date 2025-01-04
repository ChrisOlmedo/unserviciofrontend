import { Link, Outlet } from 'react-router-dom';
//import styles from './Account.module.css';

const AccountLayout = () => {
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