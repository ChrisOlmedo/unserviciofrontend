import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../components/Context/IsLogin'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'


const googleId = import.meta.env.VITE_GOOGLE_AUTH_ID;

const Login = () => {
    const { state, login } = useIsLogin();
    const navigate = useNavigate();
    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        navigate("/");
        login();
    };
    if (state.isLogin) {
        // Si no está autenticado, redirige a /login
        navigate("/");
    }

    const handleLoginSuccess = (response: any) => {
        console.log('Login Success:', response);
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    const auth = true;
    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 gap-3">
            <h1>Login</h1>
            <button className="btn btn-primary" onClick={handleLogin}>Regresar</button>
            {auth &&
                <GoogleOAuthProvider clientId={googleId}>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />
                </GoogleOAuthProvider>
            }
        </div>
    );
};

export default Login;