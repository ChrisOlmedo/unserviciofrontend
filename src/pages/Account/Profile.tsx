import { useIsLogin } from "../../context/userContext";

const Profile = () => {
    const { state } = useIsLogin();
    return (
        <div>
            <h1>{state.user?.name}</h1>
            <p>Hola {state.user?.name} este es tu perfil!</p>
            <p>Nombre: {state.user?.name}</p>
            <p>Correo: {state.user?.email}</p>
            <p>id: {state.id}</p>
            <p>role: {state.user?.role} </p>
        </div>
    );
};

export default Profile;