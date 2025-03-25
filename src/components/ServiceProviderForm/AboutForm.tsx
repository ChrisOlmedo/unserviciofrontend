import { useState } from "react";
const AboutForm = () => {
    const [about, setAbout] = useState("Acerca de")
    const handleChangePPD = (value: string) => {
        setAbout(value);
    };
    return (
        <div className="mb-3">
            <label htmlFor="aboutMe" className="form-label">Descripción sobre tu servicio</label>
            <textarea
                id="aboutMe"
                name="aboutMe"
                placeholder="Descripción sobre tu servicio"
                value={about}
                onChange={(e) => handleChangePPD(e.target.value)}
                className="form-control"
                required
            />
        </div>
    );
};

export default AboutForm;