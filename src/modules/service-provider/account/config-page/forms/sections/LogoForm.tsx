import { useServiceProvider } from "../../hooks/useServiceProvider";
import { useMemo, useRef, useState } from "react";
import styles from './LogoForm.module.css';
import SaveButton from "components/Button/SaveButton";
import CancelButton from "components/Button/CancelButton";
import { useTriggerListener } from '../../hooks/useTriggerListener';
import { Image } from "types";
import ErrorMessage from "components/ErrorInput/ErrorMessage";

export const LogoForm = () => {
    const { logo, updateLogo } = useServiceProvider().logoSection();
    const { addDeletedImage } = useServiceProvider();
    const { hasChangesForm, setHasChangesForm } = useServiceProvider().hasChangesForm();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentLogo, setCurrentLogo] = useState<Image>(logo);
    const [error, setError] = useState(false);
    const [deletedLogo, setDeletedLogo] = useState<{ id: string; url: string } | null>(null);

    const currentPreview = useMemo(() => {
        return currentLogo.file
            ? URL.createObjectURL(currentLogo.file)
            : currentLogo.url;
    }, [currentLogo.file, currentLogo.url]);

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Si el logo actual no tiene file y tiene id, se marca como eliminada, porque significa que viene un logo de la DB
            if (!currentLogo.file && currentLogo.id) {
                setDeletedLogo({ id: currentLogo.id, url: currentLogo.url });
            }
            setCurrentLogo({
                id: '',
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
        if (error) {
            setError(false);
        }
        !hasChangesForm && setHasChangesForm(true);
    };

    const handleDelete = () => {
        if (!currentLogo.file && currentLogo.id) {
            setDeletedLogo({ id: currentLogo.id, url: currentLogo.url });
        }
        setCurrentLogo({
            id: '',
            file: null,
            url: ''
        });
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    useTriggerListener({
        validate: () => {
            if (!currentLogo.file && !currentLogo.url) {
                return false;
            }
            return true;
        },
        onError: () => {
            setError(true);
        },
        onSave: () => {
            if (deletedLogo) {
                addDeletedImage(deletedLogo.id);
                setDeletedLogo(null);
            }
            updateLogo(currentLogo);
        },
    });

    return (
        <div className={styles.logoContainer}>
            <div className={styles.previewContainer}>
                {currentPreview ? (
                    <>
                        <img
                            src={currentPreview}
                            alt="Logo preview"
                            className={styles.previewImage}
                        />
                        <div className={styles.uploadButton} onClick={handleUploadClick}>
                            Cambiar imagen
                        </div>
                    </>
                ) : (
                    <div className={styles.uploadButton} onClick={handleUploadClick}>
                        Subir logo
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAddImage}
                    className={styles.fileInput}
                />
            </div>
            {error &&
                <ErrorMessage message="Por favor, sube una imagen válida." />
            }

            {currentPreview && (
                <div className={styles.actions}>
                    <CancelButton onClick={handleDelete}>
                        Eliminar
                    </CancelButton>
                    <SaveButton onClick={handleUploadClick}>
                        Subir nueva
                    </SaveButton>
                </div>
            )}
        </div>
    );
};
