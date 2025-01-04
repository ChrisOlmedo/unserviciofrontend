import { Link } from 'react-router-dom';
//import { GoogleLogin } from 'react-google-login';

const Login = () => {
    /*const handleLoginSuccess = (response) => {
        console.log('Login Success:', response.profileObj);
        // Handle login success (e.g., save user info, redirect, etc.)
    };

    const handleLoginFailure = (response) => {
        console.log('Login Failed:', response);
        // Handle login failure
    };*/

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 gap-3">
            <h1>Login</h1>
            {/*<GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText="Login with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
            />*/}
            <Link to="/" className="btn btn-primary">Regresar</Link>
        </div>
    );
};

export default Login;