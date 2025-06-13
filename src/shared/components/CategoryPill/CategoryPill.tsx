import React from 'react';
import styles from './CategoryPill.module.css';

interface CategoryPillProps {
  children: React.ReactNode;
}

const CategoryPill = ({ children }: CategoryPillProps) => (
  <span className={styles.pill}>{children}</span>
);

export default CategoryPill; 