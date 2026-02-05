import { CSSProperties, FC, ReactNode } from "react";
import styles from "./MediumButton.module.css";

interface MediumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  style?: CSSProperties;
  isLoading?: boolean;
  disabled?: boolean;
}

const MediumButton: FC<MediumButtonProps> = ({ children, onClick, type, style, isLoading, disabled }) => {
  return (
    <button
      className={styles.MediumButton}
      onClick={onClick}
      type={type}
      style={style}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default MediumButton;
