import EditButton from "../EditButton";
import EditButtonAbsolute from "./EditButtonAbsolute";

const AboutSection = ({ aboutSection }: { aboutSection: string }) => {
    return (

        <section className="aboutMe">
            <h2>Quien soy/Quienes somos</h2>
            <p>{aboutSection}</p>

            <EditButtonAbsolute>
                <EditButton context="about" />
            </EditButtonAbsolute>
        </section>
    );
}

export default AboutSection;