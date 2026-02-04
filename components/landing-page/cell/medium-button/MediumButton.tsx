import { CSSProperties, FC, ReactNode } from "react";
import styles from "./MediumButton.module.css";

interface MediumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined
  style?: CSSProperties
}

const MediumButton: FC<MediumButtonProps> = ({ children, onClick, type, style }) => {
  return (
    <button className={styles.MediumButton} onClick={onClick} type={type} style={style}>
      {children}
    </button>
  );
};

export default MediumButton;
