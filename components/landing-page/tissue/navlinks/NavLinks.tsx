"use client";

import NavLink from "@/components/landing-page/cell/navlink/NavLink";
import style from "./NavLinks.module.css";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { ModalContext } from "@/contexts/ModalContext";
import { useContext } from "react";

const NavLinks: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  return (
    <ul className={style.NavLinks}>
      <NavLink title="Our Story" href="/" />
      <NavLink title="Pricing" href="/" />
      <NavLink title="Write" href="/" name="signUp" />
      <NavLink title="Login" href="/" name="login" />
      <MediumButton onClick={() => openModal("signUp")}>
        <p style={{ margin: "0", padding: "0" }}>Get Started</p>
      </MediumButton>
    </ul>
  );
};

export default NavLinks;
