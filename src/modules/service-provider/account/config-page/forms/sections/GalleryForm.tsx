import { useReducer, useRef } from "react";
import styles from './GalleryForm.module.css';

interface Image {
    url: string;
    file?: File;
}

interface GalleryAction {
    type: 'ADD' | 'REMOVE' | 'UPDATE';
    index?: number;
    url?: string;
    file?: File;
}

const MAX_IMAGES = 6;

export const GalleryForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function galleryReducer(state: Image[], action: GalleryAction): Image[] {
        switch (action.type) {
            case "ADD":
                if (state.length >= MAX_IMAGES) return state;
                return action.url ? [...state, { url: action.url, file: action.file }] : state;
            case "REMOVE":
                if (action.index === undefined) return state;
                return state.filter((_, i) => i !== action.index);
            case "UPDATE":
                if (action.index === undefined || !action.url) return state;
                const newState = [...state];
                newState[action.index] = { url: action.url, file: action.file };
                return newState;
            default:
                return state;
        }
    }

    const [gallery, dispatchGallery] = useReducer(galleryReducer, []);

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            dispatchGallery({ type: "ADD", url, file });
        }
    };

    const handleRemoveImage = (index: number) => {
        dispatchGallery({ type: "REMOVE", index });
    };

    const handleUpdateImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            dispatchGallery({ type: "UPDATE", index, url, file });
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.galleryHeader}>
                <h2 className={styles.galleryTitle}>Galería de Imágenes</h2>
                <button 
                    className={styles.uploadButton}
                    onClick={handleUploadClick}
                    disabled={gallery.length >= MAX_IMAGES}
                >
                    Agregar Imagen
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                className={styles.fileInput}
            />

            <div className={styles.galleryGrid}>
                {gallery.map((img, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img 
                            src={img.url} 
                            alt={`Galería ${index + 1}`} 
                            className={styles.imagePreview}
                        />
                        <div className={styles.imageOverlay}>
                            <button 
                                className={`${styles.actionButton} ${styles.editButton}`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                ✏️
                            </button>
                            <button 
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                onClick={() => handleRemoveImage(index)}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
                
                {gallery.length < MAX_IMAGES && (
                    <div 
                        className={`${styles.imageContainer} ${styles.empty}`}
                        onClick={handleUploadClick}
                    >
                        <span className={styles.uploadIcon}>+</span>
                    </div>
                )}
            </div>

            {gallery.length >= MAX_IMAGES && (
                <div className={styles.errorMessage}>
                    Has alcanzado el límite máximo de {MAX_IMAGES} imágenes
                </div>
            )}
        </div>
    );
};
