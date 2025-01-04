import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import ConectDB from '../../test/Test'

import { MdWorkHistory } from "react-icons/md";


function Home() {

    const [count, setCount] = useState(0);

    return (
        <>
            <div className='react-container'>
                <div >
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="homelogo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="homelogo react" alt="React logo" />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="cardb">
                    <button className="react-counter" onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <h2 className="fs-1 fw-bold my-5 text-ligth">
                        ¡Página en desarrollo! <MdWorkHistory />
                    </h2>
                </div>

                <ConectDB />
            </div >
        </>
    );
}
export default Home;