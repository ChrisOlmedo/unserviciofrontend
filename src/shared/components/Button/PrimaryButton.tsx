import React from 'react';
import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => (
  <button className={styles.primary} {...props}>{children}</button>
);

export default PrimaryButton; 