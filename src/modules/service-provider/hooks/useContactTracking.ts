import { useEffect, useCallback } from 'react';

interface ContactInteraction {
    type: 'phone' | 'email' | 'whatsapp';
    action: 'click' | 'copy' | 'view';
    timestamp: number;
}

export const useContactTracking = (providerId: string) => {
    const trackInteraction = useCallback((interaction: ContactInteraction) => {
        // Aquí implementaremos la lógica para enviar los datos al backend
        console.log('Contact Interaction:', {
            providerId,
            ...interaction
        });
        
        // TODO: Implementar la llamada a la API para guardar la interacción
        // fetch('/api/contact-interactions', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         providerId,
        //         ...interaction
        //     })
        // });
    }, [providerId]);

    const handlePhoneClick = useCallback(() => {
        trackInteraction({
            type: 'phone',
            action: 'click',
            timestamp: Date.now()
        });
    }, [trackInteraction]);

    const handleEmailClick = useCallback(() => {
        trackInteraction({
            type: 'email',
            action: 'click',
            timestamp: Date.now()
        });
    }, [trackInteraction]);

    const handleWhatsAppClick = useCallback(() => {
        trackInteraction({
            type: 'whatsapp',
            action: 'click',
            timestamp: Date.now()
        });
    }, [trackInteraction]);

    const handleCopy = useCallback((type: 'phone' | 'email') => {
        trackInteraction({
            type,
            action: 'copy',
            timestamp: Date.now()
        });
    }, [trackInteraction]);

    // Rastrear tiempo de visualización
    useEffect(() => {
        let startTime = Date.now();
        let isVisible = true;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                isVisible = false;
                const viewTime = Date.now() - startTime;
                if (viewTime > 5000) { // Solo registrar si la vista fue mayor a 5 segundos
                    trackInteraction({
                        type: 'phone',
                        action: 'view',
                        timestamp: startTime
                    });
                }
            } else {
                startTime = Date.now();
                isVisible = true;
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (isVisible) {
                const viewTime = Date.now() - startTime;
                if (viewTime > 5000) {
                    trackInteraction({
                        type: 'phone',
                        action: 'view',
                        timestamp: startTime
                    });
                }
            }
        };
    }, [trackInteraction]);

    return {
        handlePhoneClick,
        handleEmailClick,
        handleWhatsAppClick,
        handleCopy
    };
}; 