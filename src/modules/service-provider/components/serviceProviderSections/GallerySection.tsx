import { Image } from "../../../../types/types";
import styles from './GallerySection.module.css';
import EditButtonAbsolute from "../EditButtonAbsolute";
import EditButton from "../EditButton";
import { useConfig } from "../../context/ConfigFlagContext";

interface GallerySectionProps {
    gallery: Image[];
}

const GallerySection = ({ gallery }: GallerySectionProps) => {
    const { isConfig } = useConfig();

    return (
        <div className={styles.galleryContainer}>
            <h2 className={styles.title}>Galería</h2>
            <div className={styles.galleryGrid}>
                {gallery.map((image, index) => (
                    <div key={index} className={styles.galleryItem}>
                        <img 
                            src={image.url} 
                            alt={`Imagen ${index + 1} de la galería`}
                            className={styles.galleryImage}
                        />
                    </div>
                ))}
            </div>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="gallery" />
                </EditButtonAbsolute>
            )}
        </div>
    );
};

export default GallerySection;