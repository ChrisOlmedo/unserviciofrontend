import { useState, useEffect } from "react";
import { useServiceProvider } from "../../hooks/useServiceProvider";
import { useTriggerListener } from "../../hooks/useTriggerListener";
import styles from './AboutForm.module.css';

export const AboutForm = () => {
    const { aboutMe, updateAboutMe } = useServiceProvider().aboutMeSection();
    const { hasChangesForm, setHasChangesForm } = useServiceProvider().hasChangesForm();
    const [about, setAbout] = useState(aboutMe);
    const [message, setMessage] = useState("");
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        setCharCount(about.length);
    }, [about]);

    const handleChange = (value: string) => {
        setAbout(value);
        !hasChangesForm && setHasChangesForm(true);
    };

    useTriggerListener({
        validate: () => about.length > 30,
        onError: () => setMessage("La descripción debe tener al menos 30 caracteres."),
        onSave: () => {
            updateAboutMe(about);
        },
    });

    const getCharCountClass = () => {
        if (charCount < 30) return styles.error;
        if (charCount < 100) return styles.warning;
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
                {message && <div className={styles.errorMessage}>{message}</div>}
            </div>
        </div>
    );
};