import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../user/context/userContext'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { CredentialResponse } from "@react-oauth/google";
import loginByGoogle from '../services/authServices';

const googleAuthId = import.meta.env.VITE_GOOGLE_AUTH_ID;

const LoginPage = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname || "/"; // Ruta previa o raíz
    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        navigate("/");
    };

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
                navigate(from, { replace: true });
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

export default LoginPage;