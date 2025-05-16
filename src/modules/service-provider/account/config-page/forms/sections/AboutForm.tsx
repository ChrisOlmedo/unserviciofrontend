import { useState } from "react";
import { useServiceProvider } from "../../hooks/useServiceProvider.ts";
//import { routePaths } from "../../../../../../router/routePaths.ts";

import { useTriggerListener } from "../../hooks/useTriggerListener.ts";

export const AboutForm = () => {

    const { aboutMe, updateAboutMe } = useServiceProvider().aboutMeSection()
    const { hasChangesForm, setHasChangesForm } = useServiceProvider().hasChangesForm();
    const [about, setAbout] = useState(aboutMe);
    const [message, setMessage] = useState("");
    const handleChange = (value: string) => {
        setAbout(value);
        !hasChangesForm && setHasChangesForm(true);
    };

    useTriggerListener({
        validate: () => about.length > 30,
        onError: () => setMessage("La descripción debe tener al menos 30 caracteres."),
        onSave: () => {
            updateAboutMe(about);
        },
    });

    return (
        <div className="mb-3">
            <label htmlFor="aboutMe" className="form-label">Descripción sobre tu servicio</label>
            <textarea
                id="aboutMe"
                name="aboutMe"
                placeholder="Descripción sobre tu servicio"
                value={about}
                onChange={(e) => handleChange(e.target.value)}
                className="form-control"
                required
            />
            {message && <div className="text-danger">{message}</div>}
        </div>
    );
};