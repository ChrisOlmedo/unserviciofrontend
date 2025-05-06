// utils/validation.ts
import { serviceProviderPageSchema } from "../validation/schemas";
import { ServiceProviderPageConfig } from "../../../../types/types";

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
