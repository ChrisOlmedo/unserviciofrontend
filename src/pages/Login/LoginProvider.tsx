
const LoginProvider = () => {
    const handleUpgrade = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Upgrade', e);
    }
    return (
        <form onSubmit={handleUpgrade} className="needs-validation" noValidate>
            <div className="mb-3">
                <label htmlFor="enterpriseName" className="form-label">Nombre de empresa</label>
                <input type="text" className="form-control" id="enterpriseName" placeholder="Nombre de empresa" required />
                <div className="invalid-feedback">
                    Por favor ingrese su npmbre de empresa.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Número de teléfono</label>
                <input type="text" className="form-control" id="phoneNumber" placeholder="Número de teléfono" required />
                <div className="invalid-feedback">
                    Por favor ingrese su número de teléfono.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="service" className="form-label">Selecciona un servicio</label>
                <select className="form-select" id="service" required>
                    <option value="">Selecciona un servicio</option>
                    <option value="Plomería">Plomería</option>
                    <option value="Carpintería">Carpintería</option>
                    {/* Más opciones */}
                </select>
                <div className="invalid-feedback">
                    Por favor seleccione un servicio.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">Ubicación</label>
                <input type="text" className="form-control" id="location" placeholder="Ubicación" required />
                <div className="invalid-feedback">
                    Por favor ingrese su ubicación.
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Convertirme en prestador</button>
        </form>
    )
}

export default LoginProvider;