import { useState, useEffect } from "react";
import { useServiceProvider } from "../../hooks/useServiceProvider";
import { useTriggerListener } from "../../hooks/useTriggerListener";
import styles from './AboutForm.module.css';
import ErrorMessage from "components/ErrorInput/ErrorMessage";
import { useFormChangeTracker } from "../../hooks/useFormChangeTracker";

const MIN_CHAR_COUNT = 50;
const SAVE_CHAR_COUNT = 200;

const AboutForm = () => {
    const { aboutMe, updateAboutMe } = useServiceProvider();
    const [about, setAbout] = useState(aboutMe);
    const [error, setError] = useState("");
    const [charCount, setCharCount] = useState(about.length);

    useFormChangeTracker({
        localData: about,
        initialData: aboutMe
    });

    useEffect(() => {
        setCharCount(about.length);
    }, [about]);

    const handleChange = (value: string) => {
        setAbout(value);
        if (error) setError("");
    };

    useTriggerListener({
        validate: () => {
            if (about.length < MIN_CHAR_COUNT) {
                setError(`La descripción debe tener al menos ${MIN_CHAR_COUNT} caracteres.`);
                return false;
            }
            return true;
        },
        onError: () => {}, // La validación ya setea el error
        onSave: () => {
            updateAboutMe(about);
        },
    });

    const getCharCountClass = () => {
        if (charCount < MIN_CHAR_COUNT) return styles.error;
        if (charCount < SAVE_CHAR_COUNT) return styles.warning;
        return '';
    };

    return (
        <div className={styles.aboutContainer}>
            <div className={styles.formGroup}>
                <label htmlFor="aboutMe" className={styles.label}>
                    Cuéntanos sobre tu servicio
                </label>
                <textarea
                    id="aboutMe"
                    name="aboutMe"
                    placeholder="Describe los servicios que ofreces, tu experiencia, y por qué los clientes deberían elegirte..."
                    value={about}
                    onChange={(e) => handleChange(e.target.value)}
                    className={styles.textarea}
                    required
                />
                <div className={`${styles.characterCount} ${getCharCountClass()}`}>
                    {charCount} caracteres
                </div>
                {error && (
                    <ErrorMessage message={error} />
                )}
            </div>
        </div>
    );
};

export default AboutForm;