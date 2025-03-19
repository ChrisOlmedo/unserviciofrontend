import { EditButtonProps } from "../../types/types";
import { useConfig } from "../../context/configServiceProviderContext";

const EditButton = ({ context }: EditButtonProps) => {
    const { isConfig, handleModalEdith } = useConfig();
    if (!isConfig) return null;

    return (
        <div style={{ height: '25px', width: 'auto', position: 'absolute', top: '-15px', right: '-15px', }} >
            <a onClick={() => handleModalEdith(context)} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" style={{ height: '100%', width: 'auto' }}>
                    <rect width="24" height="24" fill="white" />
                    <path d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
        </div>
    );
};

export default EditButton;