
interface HandleModalConfigProps {
    status: string;
    setDatos: React.Dispatch<React.SetStateAction<{ nombre: string; descripcion: string; contacto: string }>>;
    datos: { nombre: string; descripcion: string; contacto: string };
}

const HandleModalConfig = ({ status, setDatos, datos }: HandleModalConfigProps) => {
    switch (status) {
        case "nombre":
            return (<input placeholder="Nombre" type="text" value={datos.nombre} onChange={(e) => setDatos({ ...datos, nombre: e.target.value })} />);
        case "descripcion":
            return (<textarea
                value={datos.descripcion}
                onChange={(e) =>
                    setDatos({ ...datos, descripcion: e.target.value })
                }
            />);
        case "contacto":
            return (<input
                type="text"
                value={datos.contacto}
                onChange={(e) => setDatos({ ...datos, contacto: e.target.value })}
            />);
    }
}

export default HandleModalConfig;
