// validation/schemas.ts
import { z } from 'zod';

export const serviceProviderPageSchema = z.object({
    slug: z.string().min(1, "Falta el slug"),
    enterpriseName: z.string().min(2, "Nombre requerido"),
    logo: z.object({
        url: z.string().url("Logo inválido").optional().or(z.literal("")),
        file: z.any().optional(),
    }).refine(
        (data) => data.url || data.file,
        { message: "Debes subir un logo o incluir una URL válida" }
    ),
    typeService: z.string().min(1, "Selecciona un tipo de servicio"),
    phone: z.string().min(10, "Teléfono inválido"),
    whatsapp: z.string().min(10, "WhatsApp requerido"),
    email: z.string().email("Correo inválido"),
    location: z.string().min(1, "Ubicación requerida"),
    coverage: z.object({
        maxDistance: z.number().positive("Distancia requerida"),
        cities: z.array(z.string()).min(1, "Agrega al menos una ciudad"),
    }),
    services: z.array(z.string(),).min(1, "Agrega al menos un servicio"),
    aboutMe: z.string().min(10, "Sobre mí muy corto"),
    gallery: z.array(z.object({
        url: z.string().url().optional().or(z.literal("")),
        file: z.any().optional(),
    }).refine(
        (data) => data.url || data.file,
        { message: "Error al subir la imagen" }
    )).min(1, "Agrega al menos una imagen"),
});

export type ServiceProviderPageData = z.infer<typeof serviceProviderPageSchema>;