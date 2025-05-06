import React, { useReducer } from "react";

export const GalleryForm = () => {

    const initialGallery = [
        {
            url: '',
        },
        {
            url: '',
        },
        {
            url: '',
        }
    ];
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
    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            dispatchGallery({ type: "ADD", url });
        }
    };


    const [gallery, dispatchGallery] = useReducer(galleryReducer, initialGallery);

    return (
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
    );
}
