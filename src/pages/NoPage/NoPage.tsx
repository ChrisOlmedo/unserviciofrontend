import './NoPage.css';
import { TbError404 } from "react-icons/tb";
import { Link } from 'react-router-dom';

const NoPage = () => {
    return (
        <div className="no-page">
            <div className="wrapper">
                <div className="landing-page">
                    <TbError404 size={"450"} color={"#000"} />
                    <h1> Page Not Found</h1>
                    <Link to="/" className='text-decoration-none'>
                        <button type="button" className="btn btn-primary">
                            Go Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoPage;