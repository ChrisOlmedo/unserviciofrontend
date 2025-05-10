import { useServiceProviderContext } from '../context/ServiceProviderConfigContext.tsx';
import { CompletionStatus } from '../../../../../types/types'; // Adjust the path as needed


export const useServiceProvider = () => {

    const { serviceProviderState, ServiceProviderDispatch } = useServiceProviderContext();

    const aboutMeSection = () => {
        const { aboutMe } = serviceProviderState;
        return {
            aboutMe,
            updateAboutMe: (value: string) => {
                ServiceProviderDispatch({ type: 'UPDATE_ABOUT_ME', aboutMe: value });
            },
        };
    }

    const completionStatus = () => {
        const { completionStatus } = serviceProviderState;
        return {
            completionStatus,
            updateCompletionStatus: (field: keyof CompletionStatus, value: boolean) => {
                ServiceProviderDispatch({ type: 'MARK_SECTION_COMPLETE', section: field, completed: value });
            },
        };
    }


    return {
        serviceProviderState,
        ServiceProviderDispatch,
        aboutMeSection,
        completionStatus,
    }

} 