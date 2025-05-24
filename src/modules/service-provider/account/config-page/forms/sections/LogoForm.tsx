import { useServiceProvider } from "../../hooks/useServiceProvider";
import { useEffect, useState, useRef } from "react";
import styles from './LogoForm.module.css';

export const LogoForm = () => {
    const { serviceProviderState, saveForm } = useServiceProvider();
    const [previewUrl, setPreviewUrl] = useState<string>(serviceProviderState.logo?.url || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setPreviewUrl(url);
            // Aquí deberías actualizar el estado del serviceProvider
        }
    };

    const handleDelete = () => {
        setPreviewUrl('');
        // Aquí deberías actualizar el estado del serviceProvider
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        if (saveForm().shouldSave) {
            saveForm().resetShouldSave();
            console.log(serviceProviderState);
        }
    }, [saveForm().shouldSave]);

    return (
        <div className={styles.logoContainer}>
            <div className={styles.previewContainer}>
                {previewUrl ? (
                    <>
                        <img 
                            src={previewUrl} 
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
            
            {previewUrl && (
                <div className={styles.actions}>
                    <button 
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                    <button 
                        className={`${styles.actionButton} ${styles.uploadNewButton}`}
                        onClick={handleUploadClick}
                    >
                        Subir nueva
                    </button>
                </div>
            )}
        </div>
    );
};
