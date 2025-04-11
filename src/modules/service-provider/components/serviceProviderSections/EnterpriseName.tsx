import EditButton from "../EditButton";
import EditButtonAbsolute from "./EditButtonAbsolute";


const EnterPriseName = ({ enterpriseName }: { enterpriseName: string }) => {
    return (
        <div className="serviceProvider-enterpriseName">
            <h1 className='text-center'>{enterpriseName}</h1>

            <EditButtonAbsolute>
                <EditButton context="information" />
            </EditButtonAbsolute>
        </div>
    );
}

export default EnterPriseName;