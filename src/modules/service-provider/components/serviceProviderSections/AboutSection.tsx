import EditButton from "../EditButton";
import EditButtonAbsolute from "../EditButtonAbsolute";
import { useConfig } from "../../context/ConfigFlagContext";

const AboutSection = ({ aboutSection }: { aboutSection: string }) => {
    const { isConfig } = useConfig();

    return (
        <section>
            <h2>Quien soy/Quienes somos</h2>
            <p>{aboutSection}</p>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="about" />
                </EditButtonAbsolute>
            )}
        </section>
    );
}

export default AboutSection;