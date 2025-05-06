import { useState } from "react";
import { useServiceProvider } from "../../hooks/useServiceProvider.ts";


export const AboutForm = () => {
    const { aboutMe, updateAboutMe } = useServiceProvider().aboutMeSection();
    const [about, setAbout] = useState(aboutMe);
    const handleChange = (value: string) => {
        setAbout(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateAboutMe(about);
    };
    return (
        <div className="mb-3">
            <form onSubmit={handleSubmit} className="form-group">
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
                <button type="submit" className="btn btn-primary mt-2">Guardar</button>
            </form>
        </div>
    );
};