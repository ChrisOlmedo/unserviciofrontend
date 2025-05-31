import { ServiceProviderPageConfig } from "types";

/**
 * Construye un FormData para crear o actualizar un proveedor de servicios.
 * @param data Estado del proveedor de servicios
 * @param isUpdate Si es true, incluye imágenes eliminadas y existentes; si es false, solo archivos nuevos
 */
export function buildServiceProviderFormData(data: ServiceProviderPageConfig, isUpdate: boolean = false): FormData {
    const formData = new FormData();

    // Campos simples
    formData.append('slug', data.slug || '');
    formData.append('enterpriseName', data.enterpriseName || '');
    formData.append('serviceCategories', JSON.stringify(data.serviceCategories || []));
    formData.append('rating', String(data.rating ?? ''));
    formData.append('phone', data.phone || '');
    formData.append('whatsapp', data.whatsapp || '');
    formData.append('email', data.email || '');
    formData.append('location', data.location || '');
    formData.append('coverage', JSON.stringify(data.coverage || {}));
    formData.append('services', JSON.stringify(data.services || []));
    formData.append('aboutMe', data.aboutMe || '');

    // Logo
    if (data.logo.file) {
        formData.append('logoFile', data.logo.file);
    } else if (data.logo.id) {
        formData.append('logoId', data.logo.id);
    }

    // Galería
    data.gallery.forEach(img => {
        if (img.file) {
            // Imagen nueva
            formData.append('galleryNewImages[]', img.file);
        } else if (img.id) {
            // Imagen existente (solo id)
            formData.append('galleryCurrentImages[]', img.id);
        }
    });

    // Imágenes eliminadas (solo en update, solo ids)
    if (isUpdate && data.deletedImages && data.deletedImages.length > 0) {
        data.deletedImages.forEach(id => {
            formData.append('deletedImages[]', id);
        });
    }

    return formData;
} 