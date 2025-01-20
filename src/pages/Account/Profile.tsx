import { useIsLogin } from "../../components/Context/IsLogin";

const Profile = () => {
    const { state } = useIsLogin();
    return (
        <div>
            <h1>{state.userData?.name}</h1>
            <p>Hola {state.userData?.name} este es tu perfil!</p>
            <p>Nombre: {state.userData?.name}</p>
            <p>Correo: {state.userData?.email}</p>
            <p>id: {state.idClient}</p>
            <p>role: {state.userData?.role} </p>
        </div>
    );
};

export default Profile;