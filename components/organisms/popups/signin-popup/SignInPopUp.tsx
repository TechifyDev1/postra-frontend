import Modal from "@/components/molecules/modal/Modal";
import { X } from "phosphor-react";
import style from "./SignInPopUp.module.css";
import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import XlargeText from "@/components/atoms/xlarge-text/XlargeText";
import TextField from "@/components/molecules/textfield/TextField";
import LargeButton from "@/components/atoms/large-button/LargeButton";
import LargeText from "@/components/atoms/large-text/LargeText";

const SignInPopUp = () => {
    const { closeModal, modals } = useContext(ModalContext);
    return (
        <Modal show={modals.login} onClose={() => closeModal('login')}>
            <div className={style.signInPopUp} onClick={(e) => e.stopPropagation()}>
                <div className={style.closeHeader}>
                    <X size={24} className={style.closeIcon} onClick={() => closeModal('login')} />
                </div>
                <div className={style.Content}>
                    <XlargeText align="alignCenter">Welcome Back.</XlargeText>
                    <form action="" className={style.Form}>
                        <div className={style.FormGroup}>
                            <label htmlFor="email">Email</label>
                            <TextField placeholder="Email" type="email" />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="password">Password</label>
                            <TextField placeholder="Password" type="password" />
                        </div>
                        <div className={style.FormGroup}>
                            <LargeButton type="submit" isLoading={false}>
                                <LargeText>Sign In</LargeText>
                            </LargeButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default SignInPopUp;