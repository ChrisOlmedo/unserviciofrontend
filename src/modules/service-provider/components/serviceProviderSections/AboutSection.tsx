import React from 'react';
import styles from './AboutSection.module.css';
import EditButton from "../EditButton";
import EditButtonAbsolute from "../EditButtonAbsolute";
import { useConfig } from "../../context/ConfigFlagContext";

interface AboutSectionProps {
    aboutSection: string;
    enterpriseName: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutSection, enterpriseName }) => {
    const { isConfig } = useConfig();

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Sobre {enterpriseName}</h2>
            <div className={styles.content}>
                {aboutSection}
            </div>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="about" />
                </EditButtonAbsolute>
            )}
        </section>
    );
};

export default AboutSection;