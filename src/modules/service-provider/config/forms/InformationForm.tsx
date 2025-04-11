import { useState } from "react";

const InformationForm = () => {
    const [formData, setFormData] = useState({
        enterpriseName: "",
        typeService: "",
        phone: "",
        location: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="enterpriseName" className="form-label">Nombre de la empresa</label>
                <input
                    type="text"
                    id="enterpriseName"
                    name="enterpriseName"
                    placeholder="Nombre de la empresa"
                    value={formData.enterpriseName}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="typeService" className="form-label">Tipo de servicio</label>
                <input
                    type="text"
                    id="typeService"
                    name="typeService"
                    placeholder="Tipo de servicio"
                    value={formData.typeService}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="location" className="form-label">Ubicación</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Ubicación"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

        </div>
    );
}
export default InformationForm;