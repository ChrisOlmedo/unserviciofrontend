import { useUser } from "modules/user/context/userContext";

const Settings = () => {
  const { userState } = useUser();
  const { user, isLoading } = userState;

  if (isLoading) return <div>Cargando configuración...</div>;
  if (!user) return <div>No hay usuario autenticado.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
      <h2>Configuración de usuario</h2>
      <div><strong>Email:</strong> {user.email}</div>
      {/* Aquí puedes agregar opciones para cambiar contraseña, notificaciones, etc. */}
      <div style={{ marginTop: 24, color: '#888' }}>
        <em>Próximamente: cambiar contraseña, notificaciones, etc.</em>
      </div>
    </div>
  );
};

export default Settings; 