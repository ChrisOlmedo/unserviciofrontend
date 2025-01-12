import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../components/Context/IsLogin'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const googleAuthId = import.meta.env.VITE_GOOGLE_AUTH_ID;
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const { state, login } = useIsLogin();
    const navigate = useNavigate();

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        navigate("/");
    };
    if (state.idClient) {
        // Si no está autenticado, redirige a /login
        navigate("/");
    }

    const handleLoginSuccess = async (googleResponse: any) => {
        const token = googleResponse.credential; // Obtén el token de Google
        try {
            const response = await fetch(`${apiUrl}/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                throw new Error('Error durante el inicio de sesión');
            }

            const userId = await response.json(); // Recibe el ID

            // Actualiza el id 
            login(userId);

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
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