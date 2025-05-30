import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../user/context/userContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { CredentialResponse } from "@react-oauth/google";
import loginByGoogle from '../services/authServices';
import styles from "./AuthForm.module.css";
import { UserData } from "types";
import AuthHeader from "components/AuthHeader/AuthHeader";
import ErrorMessage from "components/ErrorInput/ErrorMessage";
import { useState } from 'react';

const googleAuthId = import.meta.env.VITE_GOOGLE_AUTH_ID;

const LoginGooglePage = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [error, setError] = useState("");

    // Google login
    const handleLoginSuccess = async (googleResponse: CredentialResponse): Promise<void> => {
        if (!googleResponse.credential) {
            setError("No se recibió el token de Google");
            return;
        }
        const token = googleResponse.credential;
        try {
            const response: UserData = await loginByGoogle(token);
            if (response) {
                setUser(response);
                navigate(from, { replace: true });
            } else {
                setError("No se pudo iniciar sesión con Google");
            }
        } catch (error: any) {
            setError(error.message || "Error en el login con Google");
        }
    };
    const handleLoginError = () => {
        setError('Login con Google falló');
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.formSection}>
                    <div className={styles.formInner} style={{ minHeight: 320 }}>
                        <AuthHeader />
                        <h2 className={styles.authTitle}>Iniciar sesión</h2>
                        {error && <ErrorMessage message={error} />}
                        <GoogleOAuthProvider clientId={googleAuthId}>
                            <div style={{ width: '100%', maxWidth: 340, margin: '0 auto' }}>
                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onError={handleLoginError}
                                    width="100%"
                                    theme="filled_blue"
                                    size="large"
                                    shape="pill"
                                />
                            </div>
                        </GoogleOAuthProvider>
                    </div>
                </div>
                <div className={styles.imageSection}>
                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
                        alt="Ilustración UnServicio"
                        className={styles.sideImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginGooglePage; 