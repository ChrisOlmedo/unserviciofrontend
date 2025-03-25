import { Image } from "../../types/types";
import EditButton from "../Button/EditButton";
import EditButtonAbsolute from "./EditButtonAbsolute";

const GallerySection = ({ gallery }: { gallery: Image[] }) => {

    return (

        <section className="gallery">
            <h2>Galería</h2>
            <div className="gallery-grid">
                {gallery.map((photo, index) => (
                    <img key={index} src={photo.url} alt={`Foto ${index + 1}`} />
                ))}
            </div>
            <EditButtonAbsolute>
                <EditButton context="gallery" />
            </EditButtonAbsolute>
        </section>
    )
}

export default GallerySection;