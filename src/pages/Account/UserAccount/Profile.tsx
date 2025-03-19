import { useUser } from "../../../context/userContext";

const Profile = () => {
    const { userState } = useUser();
    return (
        <div>
            <h1>{userState.user?.name}</h1>
            <p>Hola {userState.user?.name} este es tu perfil!</p>
            <p>Nombre: {userState.user?.name}</p>
            <p>Correo: {userState.user?.email}</p>
            <p>role: {userState.user?.role} </p>
        </div>
    );
};

export default Profile;