import React from 'react';
import { Service } from '../../types/service';
import ServicesGrid from '../servicesContainers/ServicesGrid/ServicesGrid';
import styles from './Section.module.css';

interface SectionProps {
    title: string;
    services: Service[];
    className?: string;
}

const Section: React.FC<SectionProps> = ({ title, services, className }) => {
    return (
        <section className={`${styles.section} ${className || ''}`}>
            <h2 className={styles.title}>{title}</h2>
            <ServicesGrid services={services} />
        </section>
    );
};

export default Section; 