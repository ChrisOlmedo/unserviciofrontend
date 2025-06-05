import { Link, Outlet } from 'react-router-dom'
import { useUser } from '../../user/context/userContext'
import { logout } from '../../auth/services/authServices'
import styles from './AccountLayout.module.css';
import { useState, useEffect, useRef } from 'react';

const AccountLayout = () => {
    const { userState, logoutUser } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const timeoutRef = useRef<number>();

    const handleLogout = () => {
        logout();
        logoutUser();
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handleMouseEnter = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (sidebarRef.current && !isExpanded) {
                setIsExpanded(true);
            }
        };

        const handleMouseLeave = () => {
            timeoutRef.current = setTimeout(() => {
                if (sidebarRef.current && isExpanded) {
                    setIsExpanded(false);
                }
            }, 300);
        };

        const sidebar = sidebarRef.current;
        const button = buttonRef.current;

        if (sidebar && button) {
            sidebar.addEventListener('mouseenter', handleMouseEnter);
            sidebar.addEventListener('mouseleave', handleMouseLeave);
            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (sidebar && button) {
                sidebar.removeEventListener('mouseenter', handleMouseEnter);
                sidebar.removeEventListener('mouseleave', handleMouseLeave);
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [isExpanded]);

    return (
        <div className={styles.container}>
            <button 
                ref={buttonRef}
                className={styles.toggleButton} 
                onClick={toggleSidebar}
                aria-label="Toggle menu"
            >
                <i className={`bi ${isExpanded ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
            <aside ref={sidebarRef} className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
                <div className={styles.sidebarContent}>
                    <nav>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to="/account/profile" onClick={() => setIsExpanded(false)}>
                                    <i className="bi bi-person"></i>
                                    <span>Perfil</span>
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to="/account/settings" onClick={() => setIsExpanded(false)}>
                                    <i className="bi bi-gear"></i>
                                    <span>Configuración</span>
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to={`/account/${userState.user?.role === "service-provider" ? "config-page" : "create-page"}`} onClick={() => setIsExpanded(false)}>
                                    <i className="bi bi-plus-circle"></i>
                                    <span>Crear mi página</span>
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <button 
                                    type="button" 
                                    className={styles.logoutButton} 
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Cerrar Sesión</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default AccountLayout;