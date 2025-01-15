import { useState } from 'react'
import ConectDB from '../../test/Test'
import UnServicioLogo from '../../components/UnServicio-logo/UnServicioLogo'
import { MdWorkHistory } from "react-icons/md"
import styles from './Home.module.css'
//import Pruebas from './Pruebas'



function Home() {

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.headerLogo}>
                    <UnServicioLogo height='100px' color='white' />
                </div>
                {/*<Pruebas />*/}
                <div className={styles.coming}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 >
                                    ¡Página en desarrollo! <MdWorkHistory />
                                </h2>
                                <h3>Encuentra todos los servicios en un solo lugar próximamente...</h3>
                                <ConectDB />
                            </div>
                        </div>
                    </div>
                </div>{/*}
                <div className={styles.email}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <p>GET NOTIFIED AT LAUNCH</p>
                                <input type="email" placeholder="email address...."></input>
                                <input type="submit" value="Go"></input>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
        </>
    );
}
export default Home;