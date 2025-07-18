import Modal from "@/components/landing-page/tissue/modal/Modal";
import { X } from "phosphor-react";
import style from "./SignInPopUp.module.css";
import { ChangeEvent, FormEvent, MouseEvent, useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import XlargeText from "@/components/landing-page/cell/xlarge-text/XlargeText";
import TextField from "@/components/landing-page/tissue/textfield/TextField";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import LargeText from "@/components/landing-page/cell/large-text/LargeText";
import SmallText from "@/components/landing-page/cell/small-text/SmallText";
import { useToast } from "@/contexts/ToastContext";

const SignInPopUp = () => {
    const { closeModal, modals, openModal } = useContext(ModalContext);
    const { showToast } = useToast();
    const handleClick = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        showToast("Testing Toast", "error");
    }
    return (
        <Modal show={modals.login} onClose={() => closeModal('login')}>
            <div className={style.signInPopUp} onClick={(e) => e.stopPropagation()}>
                <div className={style.closeHeader}>
                    <X size={24} className={style.closeIcon} onClick={() => closeModal('login')} />
                </div>
                <div className={style.Content}>
                    <XlargeText align="alignCenter">Welcome Back.</XlargeText>
                    <form action="" className={style.Form} onSubmit={handleClick}>
                        <div className={style.FormGroup}>
                            <label htmlFor="email">Email/Username</label>
                            <TextField placeholder="Input your email or username" type="text" />
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
                    <SmallText align='center'>
                        No account?
                        <a
                            href='/login'
                            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                                e.preventDefault();
                                openModal('signUp');
                            }}
                            style={{ marginLeft: 4 }}
                        >
                            Create one
                        </a>
                    </SmallText>
                </div>
            </div>
        </Modal>
    );
}

export default SignInPopUp;