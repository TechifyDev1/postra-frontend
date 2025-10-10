import React, { FC, ReactNode } from "react";
import style from "./MediumButton.module.css";

interface MediumButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const MediumButton: FC<MediumButtonProps> = ({ children, onClick }) => {
  return (
    <button className={style.MediumButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default MediumButton;
