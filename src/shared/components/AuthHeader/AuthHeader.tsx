import UnServicioLogo from "components/UnServicio-logo/UnServicioLogo";
import styles from "./AuthHeader.module.css";

const AuthHeader = () => (
  <div className={styles.headerContainer}>
    <UnServicioLogo height="64px" />
  </div>
);

export default AuthHeader; 