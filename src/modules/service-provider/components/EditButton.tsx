import { useConfig } from "../context/ConfigFlagContext";
import { useNavigate } from 'react-router-dom';
import { RouteSection } from "types"; // Ajusta la ruta
import { useRoutes } from '../account/config-page/hooks/useRoutes';
import { useServiceProvider } from "../account/config-page/hooks/useServiceProvider";
import { FiEdit2 } from 'react-icons/fi';
import styles from './EditButton.module.css';

type EditButtonProps = {
    context: RouteSection; // Asegúrate que coincida con RouteSection
};


const EditButton = ({ context }: EditButtonProps) => {
    const navigate = useNavigate();
    const { getSectionEdit } = useRoutes();
    const { isConfig } = useConfig();
    const { completionStatus } = useServiceProvider();
    const isComplete = completionStatus().completionStatus[context];

    if (!isConfig) return null

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(getSectionEdit(context));
    };

    return (
        <button 
            onClick={handleEditClick} 
            className={`${styles.editButton} ${isComplete ? styles.complete : styles.incomplete}`}
            aria-label={`Editar ${context}`}
        >
            <FiEdit2 size={20} />
        </button>
    );
};

export default EditButton;