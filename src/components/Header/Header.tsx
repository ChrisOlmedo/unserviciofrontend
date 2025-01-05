import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoLogIn, IoPersonCircleSharp, IoSearch } from "react-icons/io5";
import { BiSolidMapPin } from "react-icons/bi";
import { GoProjectRoadmap } from "react-icons/go";
import { LuMapPinHouse } from "react-icons/lu";

import styles from './Header.module.css';
import UnServicioLogo from '../UnServicio-logo/UnServicioLogo';

const Header = () => {

    // Estado para saber si el usuario está logeado o no
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Verificar si hay un estado previo de login en localStorage
    useEffect(() => {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        if (storedLoginState === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // Guardar el estado de login en localStorage
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false'); // Eliminar el estado de login en localStorage
    };



    //Ubicación

    const [location, setLocation] = useState("Ubicación...");

    // Detectar ubicación automática
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                // Convertir coordenadas a una ubicación amigable
                const response = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();
                setLocation(data.city || "Ubicación no disponible");
            },
            () => {
                setLocation("No se pudo detectar la ubicación");
            }
        );

    }, []);


    return (
        <>
            <div className={styles.headerSpace}></div>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.logoContainer}>
                        <GoProjectRoadmap color="white" size={"35px"} />
                        <Link to="/">
                            <UnServicioLogo color={"white"} height={"35px"} />
                        </Link>
                    </div>
                    <div className={styles.searchContainer}>
                        <form action="" className={styles.searchForm}>
                            <div className={styles.searchIcon}>
                                <BiSolidMapPin size={"30px"} />
                            </div>
                            <input type="text" placeholder="Buscar servicios..." className={styles.searchInput} />
                            <button className={styles.searchButton} aria-label="buscar">
                                <IoSearch color={"gray"} size={"30px"} />
                            </button>
                        </form>
                    </div>
                    <div className={styles.profileContainer}>
                        {isLoggedIn ? (
                            <Link to="/account/profile" onClick={handleLogout} >
                                <IoPersonCircleSharp color="white" size={"35px"} />
                            </Link>
                        ) : (
                            <Link to="/login" onClick={handleLogin} className={styles.loginContainer}>
                                <IoLogIn color="white" size={"35px"} />
                                <span className={styles.loginSpan}>Ingresar</span>
                            </Link>
                        )}
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <div className={styles.headerBottomContainer}>
                        <LuMapPinHouse color="white" size={"20px"} />
                        <span>{location}</span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;