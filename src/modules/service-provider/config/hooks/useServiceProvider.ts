import { useServiceProviderContext } from '../context/ServiceProviderConfigContext.tsx';


export const useServiceProvider = () => {

    const { serviceProviderState, ServiceProviderDispatch } = useServiceProviderContext();

    const aboutMeSection = () => {
        const { aboutMe } = serviceProviderState;
        return {
            aboutMe,
            updateAboutMe: (value: string) => {
                ServiceProviderDispatch({ type: 'UPDATE_ABOUT_ME', aboutMe: value });
            }
        };
    }



    return {
        serviceProviderState,
        ServiceProviderDispatch,
        aboutMeSection
    }

} 