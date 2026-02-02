import React, { FC, ReactNode } from "react";
import style from "./MediumButton.module.css";

interface MediumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined
}

const MediumButton: FC<MediumButtonProps> = ({ children, onClick, type }) => {
  return (
    <button className={style.MediumButton} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default MediumButton;
