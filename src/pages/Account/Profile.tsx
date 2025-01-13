import { useIsLogin } from "../../components/Context/IsLogin";

const Profile = () => {
    const { state } = useIsLogin();
    return (
        <div>
            <h1>{state.idClient}</h1>
            <p>Hola {state.idClient} este es tu perfil!</p>
            {/* Add more profile-related content here */}
        </div>
    );
};

export default Profile;