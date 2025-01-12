import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoLogIn, IoPersonCircleSharp, IoSearch } from "react-icons/io5"
import { BiSolidMapPin } from "react-icons/bi"
import { TiChevronRightOutline } from "react-icons/ti"
import { RiMapPinRangeFill } from "react-icons/ri"
import { useIsLogin } from '../Context/IsLogin'

import styles from './Header.module.css'
import UnServicioLogo from '../UnServicio-logo/UnServicioLogo'

const Header = () => {
    const { state } = useIsLogin();

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
                        <TiChevronRightOutline color="gray" size={"35px"} />
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
                        {state.idClient ? (
                            <Link to="/account/profile">
                                <IoPersonCircleSharp color="white" size={"35px"} />
                            </Link>
                        ) : (
                            <Link to="/login" className={styles.loginContainer}>
                                <IoLogIn color="white" size={"35px"} />
                                <span className={styles.loginSpan}>Ingresar</span>
                            </Link>
                        )}
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <div className={styles.headerBottomContainer}>
                        <RiMapPinRangeFill color="white" size={"20px"} />
                        <span>{location}</span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;