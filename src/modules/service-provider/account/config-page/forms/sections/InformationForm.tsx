import { useState } from "react";
import styles from './InformationForm.module.css';
import { useServiceProvider } from "../../hooks/useServiceProvider"
import { InformationFormData } from "types"
import { useTriggerListener } from "../../hooks/useTriggerListener";
import ErrorMessage from "components/ErrorInput/ErrorMessage";

// Lista de áreas de servicio predefinidas
const SERVICE_AREAS = [
    "Electricidad",
    "Fontanería",
    "Carpintería",
    "Pintura",
    "Jardinería",
    "Limpieza",
    "Mecánica",
    "Albañilería",
    "Herrería",
    "Aire Acondicionado",
    "Electrónica",
    "Gas",
    "Vidriería",
    "Cerrajería",
    "Otro"
];


const InformationForm = () => {
    const { information, updateInformation } = useServiceProvider().informationSection();
    const { hasChangesForm, setHasChangesForm } = useServiceProvider().hasChangesForm();
    const [formData, setFormData] = useState<InformationFormData>(information);


    const [errors, setErrors] = useState<Partial<Record<keyof InformationFormData, string>>>({});
    const [newArea, setNewArea] = useState("");
    const [newCity, setNewCity] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof InformationFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
        !hasChangesForm && setHasChangesForm(true);
    };

    const handleAddArea = () => {
        if (newArea.trim() && !formData.serviceCategories.includes(newArea.trim())) {
            setFormData(prev => ({
                ...prev,
                serviceCategories: [...prev.serviceCategories, newArea.trim()]
            }));
            setNewArea("");
        }
    };

    const handleRemoveArea = (areaToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            serviceCategories: prev.serviceCategories.filter(area => area !== areaToRemove)
        }));
    };

    const handleAddCity = () => {
        if (newCity.trim() && !formData.coverage.cities.includes(newCity.trim())) {
            setFormData(prev => ({
                ...prev,
                coverage: {
                    ...prev.coverage,
                    cities: [...prev.coverage.cities, newCity.trim()]
                }
            }));
            setNewCity("");
        }
    };

    const handleRemoveCity = (cityToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            coverage: {
                ...prev.coverage,
                cities: prev.coverage.cities.filter(city => city !== cityToRemove)
            }
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof InformationFormData, string>> = {};

        if (!formData.enterpriseName.trim()) {
            newErrors.enterpriseName = "El nombre de la empresa es requerido";
        }

        if (formData.serviceCategories.length === 0) {
            newErrors.serviceCategories = "Debes agregar al menos un área de servicio";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "El teléfono es requerido";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Ingresa un número de teléfono válido a 10 dígitos sin lada";
        }

        if (!formData.whatsapp.trim()) {
            newErrors.whatsapp = "El WhatsApp es requerido";
        } else if (!/^\d{10}$/.test(formData.whatsapp)) {
            newErrors.whatsapp = "Ingresa un número de WhatsApp válido a 10 dígitos sin lada";
        }

        if (!formData.email.trim()) {
            newErrors.email = "El correo electrónico es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Ingresa un correo electrónico válido";
        }

        if (!formData.location.trim()) {
            newErrors.location = "La ubicación es requerida";
        }

        if (formData.coverage.maxDistance < 0) {
            newErrors.coverage = "La distancia máxima no puede ser negativa";
        }

        if (formData.coverage.cities.length === 0) {
            newErrors.coverage = "Debes agregar al menos una ciudad de cobertura";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useTriggerListener(
        {
            validate: validateForm,
            onError: () => console.error("Errores en el formulario", errors),
            onSave: () => {
                updateInformation(formData);
            }
        }
    )
    return (
        <div className={styles.formContainer}>
            {/* Sección de Información Básica */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Información Básica</h2>
                {/* Nombre de la empresa */}
                <div className={styles.formGroup}>
                    <label htmlFor="enterpriseName" className={styles.label}>
                        Nombre de la empresa
                    </label>
                    <input
                        type="text"
                        id="enterpriseName"
                        name="enterpriseName"
                        value={formData.enterpriseName}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Nombre de la empresa"
                        disabled={!information.canEditEnterpriseName}
                    />
                    {!information.canEditEnterpriseName && (
                        <ErrorMessage message="Solo puedes editar el nombre de la empresa cada 30 días" />
                    )}
                    {errors.enterpriseName && (
                        <ErrorMessage message={errors.enterpriseName} />
                    )}
                </div>
                {/* Áreas de servicio */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Áreas de servicio
                    </label>
                    <div className={styles.tagsContainer}>
                        <div className={styles.tagsList}>
                            {formData.serviceCategories.map(area => (
                                <div key={area} className={styles.tag}>
                                    <span>{area}</span>
                                    <button
                                        onClick={() => handleRemoveArea(area)}
                                        className={styles.removeButton}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.addTagContainer}>
                            <select
                                value={newArea}
                                onChange={(e) => setNewArea(e.target.value)}
                                className={styles.input}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddArea()}
                            >
                                <option value="">Selecciona un área</option>
                                {SERVICE_AREAS.map(area => (
                                    <option key={area} value={area}>
                                        {area}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddArea}
                                className={styles.addButton}
                                disabled={!newArea.trim()}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                    {errors.serviceCategories && (
                        <ErrorMessage message={errors.serviceCategories} />
                    )}
                </div>
            </div>

            {/* Sección de Contacto */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Información de Contacto</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Ej. 123 456 7890"
                    />
                    {errors.phone && (
                        <ErrorMessage message={errors.phone} />
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="whatsapp" className={styles.label}>
                        WhatsApp
                    </label>
                    <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Ej. 123 456 7890"
                    />
                    {errors.whatsapp && (
                        <ErrorMessage message={errors.whatsapp} />
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="correo@ejemplo.com"
                    />
                    {errors.email && (
                        <ErrorMessage message={errors.email} />
                    )}
                </div>
            </div>

            {/* Sección de Ubicación y Cobertura */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Ubicación y Cobertura</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="location" className={styles.label}>
                        Ubicación
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Ciudad, Estado"
                    />
                    {errors.location && (
                        <ErrorMessage message={errors.location} />
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="maxDistance" className={styles.label}>
                        Distancia máxima de cobertura (km)
                    </label>
                    <input
                        type="number"
                        id="maxDistance"
                        name="maxDistance"
                        value={formData.coverage.maxDistance}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFormData(prev => ({
                                ...prev,
                                coverage: {
                                    ...prev.coverage,
                                    maxDistance: value === "" ? 0 : parseInt(value)
                                }
                            }))
                        }}
                        className={styles.input}
                        min="0"
                        placeholder="0"
                    />
                    {errors.coverage && (
                        <ErrorMessage message={errors.coverage} />
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Ciudades de cobertura
                    </label>
                    <div className={styles.tagsContainer}>
                        <div className={styles.tagsList}>
                            {formData.coverage.cities.map(city => (
                                <div key={city} className={styles.tag}>
                                    <span>{city}</span>
                                    <button
                                        onClick={() => handleRemoveCity(city)}
                                        className={styles.removeButton}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.addTagContainer}>
                            <input
                                type="text"
                                value={newCity}
                                onChange={(e) => setNewCity(e.target.value)}
                                className={styles.input}
                                placeholder="Agregar ciudad"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCity()}
                            />
                            <button
                                onClick={handleAddCity}
                                className={styles.addButton}
                                disabled={!newCity.trim()}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                    {errors.coverage && (
                        <ErrorMessage message={errors.coverage} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default InformationForm;