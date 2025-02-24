import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/userContext'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { CredentialResponse } from "@react-oauth/google";
import loginByGoogle from '../../services/authServices';
import { useEffect } from 'react';

const googleAuthId = import.meta.env.VITE_GOOGLE_AUTH_ID;

const Login = () => {
    const { userState, setUser } = useUser();
    const navigate = useNavigate();
    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        navigate("/");
    }
    useEffect(() => {
        if (userState.user) {
            navigate("/");
        }
    }, [userState.user, navigate]);

    const handleLoginSuccess = async (googleResponse: CredentialResponse): Promise<void> => {

        if (!googleResponse.credential) {
            console.error("No se recibió el token de Google");
            return;
        }
        const token = googleResponse.credential
        try {
            const response = await loginByGoogle(token);

            if (response) {
                setUser(response);
            } else {
                console.warn("No se pudo iniciar sesión con Google");
                // Mostrar mensaje al usuario, redirigir, etc.
            }
        } catch (error) {
            console.error("Error en el login con Google:", error);
        }
    }

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