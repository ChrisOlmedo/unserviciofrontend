import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { registerUser } from '../services/authServices';
import loginByGoogle from '../services/authServices';
import AuthHeader from "components/AuthHeader/AuthHeader";
import ErrorMessage from "components/ErrorInput/ErrorMessage";

const googleAuthId = import.meta.env.VITE_GOOGLE_AUTH_ID;

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await registerUser(form.name, form.email, form.password);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error desconocido en registro");
    } finally {
      setLoading(false);
    }
  };

  // Google register (realmente es login, pero UX lo muestra aquí también)
  const handleGoogleSuccess = async (googleResponse: any) => {
    setError("");
    if (!googleResponse.credential) {
      setError("No se recibió el token de Google");
      return;
    }
    try {
      await loginByGoogle(googleResponse.credential);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error con Google");
    }
  };
  const handleGoogleError = () => {
    setError("Error con Google");
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.cardWithImage}>
        <div className={styles.formSection}>
          <div className={styles.formInner}>
            <AuthHeader />
            <h2 className={styles.authTitle}>Crear cuenta</h2>
            <form className={styles.authForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="name">
                  <FaUser style={{ marginRight: 8 }} /> Nombre
                </label>
                <input
                  className={styles.inputField}
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
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
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="confirmPassword">
                  <FaLock style={{ marginRight: 8 }} /> Confirmar contraseña
                </label>
                <input
                  className={styles.inputField}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
              {error && <ErrorMessage message={error} />}
              <button className={styles.authButton} type="submit" disabled={loading}>
                {loading ? "Creando cuenta..." : "Registrarse"}
              </button>
            </form>
            <div className={styles.divider}>o</div>
            <GoogleOAuthProvider clientId={googleAuthId}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                width="100%"
              />
            </GoogleOAuthProvider>
            <div className={styles.switchText}>
              ¿Ya tienes cuenta?
              <span className={styles.switchLink} onClick={() => navigate("/login")}>Inicia sesión</span>
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

export default RegisterPage; 