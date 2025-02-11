import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../context/userContext'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import loginByGoogle from '../../services/authServices';
import { useEffect } from 'react';

const googleAuthId = import.meta.env.VITE_GOOGLE_AUTH_ID;

const Login = () => {
    const { state, login } = useIsLogin();
    const navigate = useNavigate();
    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        navigate("/");
    }
    useEffect(() => {
        if (state.id) {
            navigate("/");
        }
    }, [state.id]);

    const handleLoginSuccess = async (googleResponse: any) => {
        const token = googleResponse.credential; // Obtén el token de Google
        loginByGoogle(token, login);
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 gap-3">
            <h1>Login</h1>
            <button className="btn btn-primary" onClick={handleLogin}>Regresar</button>
            <GoogleOAuthProvider clientId={googleAuthId}>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default Login;