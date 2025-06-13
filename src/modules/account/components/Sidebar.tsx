import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaCog, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import styles from './Sidebar.module.css';

export interface NavItem {
    to: string;
    icon: 'profile' | 'settings' | 'create';
    label: string;
}

interface SidebarProps {
    isExpanded: boolean;
    navItems: NavItem[];
    onLogout: () => void;
}

const Sidebar = ({ isExpanded, navItems, onLogout }: SidebarProps) => {
    const location = useLocation();

    const getIcon = (icon: NavItem['icon']) => {
        switch (icon) {
            case 'profile':
                return <FaUser size={24} />;
            case 'settings':
                return <FaCog size={24} />;
            case 'create':
                return <FaPlusCircle size={24} />;
            default:
                return null;
        }
    };

    const sidebarVariants = {
        collapsed: { width: 60 },
        expanded: { width: 250 }
    };

    const contentVariants = {
        collapsed: { opacity: 0, width: 0, transition: { duration: 0.2 } },
        expanded: { opacity: 1, width: 190, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            className={styles.sidebar}
            initial={false}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={sidebarVariants}
        >
            <div className={styles.sidebarContent}>
                <nav>
                    <ul className={styles.navList}>
                        {navItems.map((item, index) => (
                            <motion.li 
                                key={index}
                                className={styles.navItem}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link 
                                    className={`${styles.navLink} ${location.pathname === item.to ? styles.active : ''}`}
                                    to={item.to}
                                >
                                    <div className={styles.iconWrapper}>
                                        {getIcon(item.icon)}
                                    </div>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </motion.li>
                        ))}
                        <motion.li 
                            className={styles.navItem}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: navItems.length * 0.1 }}
                        >
                            <button 
                                type="button" 
                                className={styles.logoutButton}
                                onClick={onLogout}
                            >
                                <div className={styles.iconWrapper}>
                                    <FaSignOutAlt size={24} />
                                </div>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            Cerrar Sesión
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.li>
                    </ul>
                </nav>
            </div>
        </motion.div>
    );
};

export default Sidebar; 