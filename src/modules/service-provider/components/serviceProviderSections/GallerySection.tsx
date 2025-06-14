import { Image } from "types";
import styles from './GallerySection.module.css';
import EditButtonAbsolute from "modules/service-provider/components/EditButtonAbsolute";
import EditButton from "modules/service-provider/components/EditButton";
import { useConfig } from "modules/service-provider/context/ConfigFlagContext";
import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface GallerySectionProps {
    gallery: Image[];
}

const GallerySection = ({ gallery }: GallerySectionProps) => {
    const { isConfig } = useConfig();
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        containScroll: 'trimSnaps',
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const handleImageClick = (index: number) => {
        setSelectedImage(index);
        if (emblaApi) {
            emblaApi.scrollTo(index);
        }
    };

    const closeViewer = () => {
        setSelectedImage(null);
    };

    return (
        <div className={styles.galleryContainer}>
            <h2 className={styles.title}>Galería</h2>
            <div className={styles.galleryGrid}>
                {gallery.map((image, index) => (
                    <motion.div 
                        key={index} 
                        className={styles.galleryItem}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleImageClick(index)}
                    >
                        <img 
                            src={image.url} 
                            alt={`Imagen ${index + 1} de la galería`}
                            className={styles.galleryImage}
                        />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div 
                        className={styles.imageViewer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button 
                            className={styles.closeButton}
                            onClick={closeViewer}
                            aria-label="Cerrar visor"
                        >
                            <FaTimes />
                        </button>
                        
                        <div className={styles.carouselContainer}>
                            <button 
                                className={`${styles.navButton} ${styles.prevButton}`}
                                onClick={scrollPrev}
                                aria-label="Imagen anterior"
                            >
                                <FaChevronLeft />
                            </button>

                            <div className={styles.embla} ref={emblaRef}>
                                <div className={styles.emblaContainer}>
                                    {gallery.map((image, index) => (
                                        <div key={index} className={styles.emblaSlide}>
                                            <img 
                                                src={image.url} 
                                                alt={`Imagen ${index + 1} de la galería`}
                                                className={styles.viewerImage}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button 
                                className={`${styles.navButton} ${styles.nextButton}`}
                                onClick={scrollNext}
                                aria-label="Imagen siguiente"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="gallery" />
                </EditButtonAbsolute>
            )}
        </div>
    );
};

export default GallerySection;