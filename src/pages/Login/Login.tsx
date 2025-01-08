import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../components/Context/IsLogin'
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
    const { isLogin, setIsLogin } = useIsLogin();
    const navigate = useNavigate();
    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        navigate("/");
        localStorage.setItem('isLoggedIn', 'true'); // Guardar el estado de login en localStorage;
        setIsLogin(true);
    };
    if (isLogin) {
        // Si no está autenticado, redirige a /login
        navigate("/");
    }

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
            <button className="btn btn-primary" onClick={handleLogin}>Regresar</button>
        </div>
    );
};

export default Login;