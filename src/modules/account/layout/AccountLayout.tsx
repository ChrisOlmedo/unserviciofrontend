import { Outlet } from 'react-router-dom'
import { useUser } from '../../user/context/userContext'
import { logout } from '../../auth/services/authServices'
import styles from './AccountLayout.module.css';
import { useState } from 'react';
import { useScrollLock } from 'hooks/useScrollLock';
import Sidebar, { NavItem } from '../components/Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';
import { routePaths } from 'router/routePaths';

const AccountLayout = () => {
    const { userState, logoutUser } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    useScrollLock(isExpanded);

    const handleLogout = () => {
        logout();
        logoutUser();
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const getServiceProviderRoute = () => {
        const route = userState.user?.role === "service-provider" ? "edit" : "create";
        return routePaths.account.serviceProvider[route];
    };

    const navItems: NavItem[] = [
        { 
            to: routePaths.account.profile, 
            icon: "profile", 
            label: "Perfil" 
        },
        { 
            to: routePaths.account.settings, 
            icon: "settings", 
            label: "Configuración" 
        },
        { 
            to: getServiceProviderRoute(),
            icon: "create",
            label: userState.user?.role === "service-provider" 
                ? "Editar mi página" 
                : "Crear mi página"
        }
    ];

    return (
        <div className={styles.container}>
            <button 
                className={styles.toggleButton} 
                onClick={toggleSidebar}
                aria-label="Toggle menu"
            >
                {isExpanded ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            <Sidebar 
                isExpanded={isExpanded}
                navItems={navItems}
                onLogout={handleLogout}
            />

            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default AccountLayout;