import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ServiceCard } from 'types';
import ServiceMapper from '../../ServiceMapper/ServiceMapper';
import styles from './HorizontalServices.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface HorizontalServicesProps {
    services: ServiceCard[];
    className?: string;
    title: string;
    onViewMore?: () => void;
}

const HorizontalServices: React.FC<HorizontalServicesProps> = ({ 
    services, 
    className,
    title,
    onViewMore 
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        loop: false,
        skipSnaps: false,
        slidesToScroll: 3,
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className={`${styles.wrapper} ${className || ''}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.controls}>
                    {onViewMore && (
                        <button 
                            className={styles.viewMore}
                            onClick={onViewMore}
                        >
                            Ver más
                        </button>
                    )}
                    <button
                        className={`${styles.button} ${styles.prevButton}`}
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                        aria-label="Anterior"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className={`${styles.button} ${styles.nextButton}`}
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                        aria-label="Siguiente"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.viewport} ref={emblaRef}>
                    <div className={styles.slideContainer}>
                        <ServiceMapper services={services} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalServices; 