import EditButton from "../Button/EditButton";
import EditButtonAbsolute from "./EditButtonAbsolute";


const EnterPriseName = ({ enterpriseName }: { enterpriseName: string }) => {
    return (
        <div className="serviceProvider-enterpriseName">
            <h1 className='text-center'>{enterpriseName}</h1>

            <EditButtonAbsolute>
                <EditButton context="contact" />
            </EditButtonAbsolute>
        </div>
    );
}

export default EnterPriseName;