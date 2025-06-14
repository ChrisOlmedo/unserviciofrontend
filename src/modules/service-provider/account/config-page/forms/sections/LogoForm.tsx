import { useServiceProvider } from "../../hooks/useServiceProvider";
import { useMemo, useRef, useState } from "react";
import styles from './LogoForm.module.css';
import { useTriggerListener } from '../../hooks/useTriggerListener';
import { Image } from "types";
import ErrorMessage from "components/ErrorInput/ErrorMessage";
import { useFormChangeTracker } from "../../hooks/useFormChangeTracker";
import ConfirmButton from "components/Button/ConfirmButton";
import CancelButton from "components/Button/CancelButton";

const LogoForm = () => {
    const { logo, updateLogo, addDeletedImage } = useServiceProvider();
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentLogo, setCurrentLogo] = useState<Image>(logo);
    const [error, setError] = useState(false);
    const [deletedLogo, setDeletedLogo] = useState<{ id: string; url: string } | null>(null);

    useFormChangeTracker({
        localData: currentLogo,
        initialData: logo,
    });

    const currentPreview = useMemo(() => {
        return currentLogo.file
            ? URL.createObjectURL(currentLogo.file)
            : currentLogo.url;
    }, [currentLogo.file, currentLogo.url]);

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (!currentLogo.file && currentLogo.id) {
                setDeletedLogo({ id: currentLogo.id, url: currentLogo.url });
            }
            setCurrentLogo({
                id: '',
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
            if (error) setError(false);
        }
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
                setError(true);
                return false;
            }
            return true;
        },
        onError: () => {
            // El propio validador ya setea el error.
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
                    <ConfirmButton onClick={handleUploadClick}>
                        Subir nueva
                    </ConfirmButton>
                </div>
            )}
        </div>
    );
};

export default LogoForm;
