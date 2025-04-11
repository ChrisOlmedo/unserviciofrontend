
const LogoForm = () => {
    const gallery = {
        url: '',
    }
    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            gallery.url = url;
        }
    };

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

export default LogoForm;