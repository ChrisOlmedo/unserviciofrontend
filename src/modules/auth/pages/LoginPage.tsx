import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../user/context/userContext'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { CredentialResponse } from "@react-oauth/google";
import loginByGoogle, { loginUser } from '../services/authServices';
import styles from "./AuthForm.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { UserData } from "types";
import AuthHeader from "components/AuthHeader/AuthHeader";
import ErrorMessage from "components/ErrorInput/ErrorMessage";

const googleAuthId = import.meta.env.VITE_GOOGLE_AUTH_ID;

const LoginPage = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Estado para login local
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Login real usando loginUser
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!form.email || !form.password) {
            setError("Email y contraseña son obligatorios");
            return;
        }
        setLoading(true);
        try {
            const userData: UserData= await loginUser(form.email, form.password);
            setUser(userData);
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || "Error desconocido en login");
        } finally {
            setLoading(false);
        }
    };

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
                    <div className={styles.formInner}>
                        <AuthHeader />
                        <h2 className={styles.authTitle}>Iniciar sesión</h2>
                        <form className={styles.authForm} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel} htmlFor="email">
                                    <FaEnvelope style={{ marginRight: 8 }} /> Email
                                </label>
                                <input
                                    className={styles.inputField}
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel} htmlFor="password">
                                    <FaLock style={{ marginRight: 8 }} /> Contraseña
                                </label>
                                <input
                                    className={styles.inputField}
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            {error && <ErrorMessage message={error} />}
                            <button className={styles.authButton} type="submit" disabled={loading}>
                                {loading ? "Ingresando..." : "Ingresar"}
                            </button>
                        </form>
                        <div className={styles.divider}>o</div>
                        <GoogleOAuthProvider clientId={googleAuthId}>
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginError}
                                width="100%"
                            />
                        </GoogleOAuthProvider>
                        <div className={styles.switchText}>
                            ¿No tienes cuenta?
                            <span className={styles.switchLink} onClick={() => navigate("/register")}>Regístrate</span>
                        </div>
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

export default LoginPage;