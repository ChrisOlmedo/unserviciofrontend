import { useUser } from "modules/user/context/userContext";

const Profile = () => {
  const { userState } = useUser();
  const { user, isLoading } = userState;

  if (isLoading) return <div>Cargando perfil...</div>;
  if (!user) return <div>No hay usuario autenticado.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
      <h2>Perfil de usuario</h2>
      <div><strong>Nombre:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Rol:</strong> {user.role}</div>
      {user.slug && <div><strong>Slug:</strong> {user.slug}</div>}
      {/* Aquí puedes agregar botones para editar datos, cambiar contraseña, etc. */}
    </div>
  );
};

export default Profile; 