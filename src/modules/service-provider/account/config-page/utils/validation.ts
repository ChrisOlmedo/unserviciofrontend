// utils/validation.ts
import { serviceProviderPageSchema } from "../validation/schemas";
import { ServiceProviderPageConfig, CompletionStatus } from "types";

export function isSPFormComplete(data: ServiceProviderPageConfig): {
    isValid: boolean;
    missingFields: Record<string, string>;
} {
    const result = serviceProviderPageSchema.safeParse(data);

    if (result.success) {
        return { isValid: true, missingFields: {} };
    }

    const missingFields = result.error.issues.reduce((acc, issue) => {
        const path = issue.path.join(".");
        acc[path] = issue.message;
        return acc;
    }, {} as Record<string, string>);

    return { isValid: false, missingFields };
}

export function getCompletionStatusFromData(data: ServiceProviderPageConfig): CompletionStatus {
    return {
        logo: !!data.logo && !!data.logo.url,
        about: !!data.aboutMe && data.aboutMe.trim().length > 0,
        services: Array.isArray(data.services) && data.services.length > 0,
        gallery: Array.isArray(data.gallery) && data.gallery.length > 0,
        information:
            !!data.enterpriseName &&
            !!data.phone &&
            !!data.email &&
            !!data.location,
    };
}
