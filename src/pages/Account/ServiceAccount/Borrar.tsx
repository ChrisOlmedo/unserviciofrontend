import { useState, useReducer } from "react";
import { ServiceProviderDataPage } from "../../../types/types";


export default function ServiceProviderForm() {
    const [formData, setFormData] = useState<ServiceProviderDataPage>({
        enterpriseName: "",
        logo: "",
        typeService: "",
        rating: 0,
        phone: "",
        location: "",
        providerPageData: {
            services: [],
            aboutMe: "",
            gallery: [],
        },
    });

    // Reducer para manejar la galería de imágenes
    function galleryReducer(state: { url: string }[], action: { type: string; url?: string }) {
        switch (action.type) {
            case "ADD":
                return action.url ? [...state, { url: action.url }] : state;
            case "REMOVE":
                return state.slice(0, -1);
            default:
                return state;
        }
    }

    const [gallery, dispatchGallery] = useReducer(galleryReducer, formData.providerPageData.gallery);

    // Manejar cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangePPD = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            providerPageData: {
                ...prev.providerPageData,
                [name]: value,
            },
        }));
    };

    // Manejar cambios en la galería
    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            dispatchGallery({ type: "ADD", url });
        }
    };

    // Manejar envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);
    };
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Registro de Prestador de Servicios</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                    <label htmlFor="logo" className="form-label">Logo</label>
                    <input
                        type="file"
                        id="logo"
                        accept="image/*"
                        onChange={handleAddImage}
                        className="form-control"
                    />
                    {gallery.length > 0 && <img src={gallery[0].url} alt="Logo" className="img-thumbnail mt-2" />}
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

                <div className="mb-3">
                    <label htmlFor="aboutMe" className="form-label">Descripción sobre tu servicio</label>
                    <textarea
                        id="aboutMe"
                        name="aboutMe"
                        placeholder="Descripción sobre tu servicio"
                        value={formData.providerPageData.aboutMe}
                        onChange={handleChangePPD}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="gallery" className="form-label">Galería de imágenes</label>
                    <input
                        type="file"
                        id="gallery"
                        accept="image/*"
                        onChange={handleAddImage}
                        className="form-control"
                    />
                    <div className="row mt-2">
                        {gallery.map((img, index) => (
                            <div key={index} className="col-4">
                                <img src={img.url} alt="Galería" className="img-thumbnail" />
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
}
