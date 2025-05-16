import { useServiceProvider } from "../../hooks/useServiceProvider";
import { useEffect } from "react";

export const LogoForm = () => {

    const { serviceProviderState } = useServiceProvider();
    const { saveForm } = useServiceProvider();
    const gallery = {
        url: '',
    }
    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            gallery.url = url;
        }
    };
    useEffect(() => {
        if (saveForm().shouldSave) {
            saveForm().resetShouldSave();
            console.log(serviceProviderState);
        }

    }, [saveForm().shouldSave]);

    return (
        <>
            <div className="mb-3">
                <label htmlFor="logo" className="form-label">Logo</label>
                <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleAddImage}
                    className="form-control"
                />
                {gallery && <img src={gallery.url} alt="Logo" className="img-thumbnail mt-2" />}
            </div>
        </>
    );
}
