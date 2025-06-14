import { useReducer, useRef, useState } from "react";
import styles from './GalleryForm.module.css';
import { useTriggerListener } from '../../hooks/useTriggerListener';
import { useServiceProvider } from "../../hooks/useServiceProvider";
import { Image } from "types";
import { useFormChangeTracker } from "../../hooks/useFormChangeTracker";

interface GalleryAction {
    type: 'ADD' | 'REMOVE' | 'UPDATE';
    index?: number;
    url?: string;
    file?: File;
}

const MAX_IMAGES = 6;

const GalleryForm = () => {
    const { gallery: initialGallery, updateGallery, addDeletedImage } = useServiceProvider();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileUpdateRef = useRef<HTMLInputElement>(null);
    const [indexToUpdate, setIndexToUpdate] = useState<number | undefined>();
    const [deletedGalleryIds, setDeletedGalleryIds] = useState<string[]>([]);

    function galleryReducer(state: Image[], action: GalleryAction): Image[] {
        switch (action.type) {
            case "ADD":
                if (state.length >= MAX_IMAGES) return state;
                return action.url ? [...state, { id: '', url: action.url, file: action.file }] : state;
            case "REMOVE":
                if (action.index === undefined) return state;
                const imgToRemove = state[action.index];
                if (!imgToRemove.file && imgToRemove.id) {
                    setDeletedGalleryIds(prev => [...prev, imgToRemove.id]);
                }
                return state.filter((_, i) => i !== action.index);
            case "UPDATE":
                if (action.index === undefined || !action.url) return state;
                const prevImg = state[action.index];
                if (!prevImg.file && prevImg.id) {
                    setDeletedGalleryIds(prev => [...prev, prevImg.id]);
                }
                const newState = [...state];
                newState[action.index] = { id: '', url: action.url, file: action.file };
                return newState;
            default:
                return state;
        }
    }
    const [gallery, dispatchGallery] = useReducer(galleryReducer, initialGallery);

    useFormChangeTracker({
        localData: gallery,
        initialData: initialGallery,
    });

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

    const handleUpdateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            dispatchGallery({ type: "UPDATE", index: indexToUpdate, url, file });
        }
    };
    const handleUpdate = (index: number) => {
        setIndexToUpdate(index);
        fileUpdateRef.current?.click();
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    useTriggerListener({
        validate: () => {
            if (gallery.length === 0) {
                return false;
            }
            return true;
        },
        onError: () => {
            console.error("Error: No images to save");
        },
        onSave: () => {
            deletedGalleryIds.forEach(id => addDeletedImage(id));
            setDeletedGalleryIds([]);
            updateGallery(gallery);
        },
    });

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
            <input
                ref={fileUpdateRef}
                type="file"
                accept="image/*"
                onChange={handleUpdateImage}
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
                                onClick={() => handleUpdate(index)}
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

export default GalleryForm;
