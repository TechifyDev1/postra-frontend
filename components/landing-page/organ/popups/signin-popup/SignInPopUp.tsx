import Modal from "@/components/landing-page/tissue/modal/Modal";
import { X } from "phosphor-react";
import style from "./SignInPopUp.module.css";
import { ChangeEvent, FormEvent, MouseEvent, useContext, useState } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import XlargeText from "@/components/landing-page/cell/xlarge-text/XlargeText";
import TextField from "@/components/landing-page/tissue/textfield/TextField";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import LargeText from "@/components/landing-page/cell/large-text/LargeText";
import SmallText from "@/components/landing-page/cell/small-text/SmallText";
import { useToast } from "@/contexts/ToastContext";
import { loginUrl } from "@/utils";
import { useUserContext } from "@/hooks/use-user-context";

const SignInPopUp = () => {
    const { closeModal, modals, openModal } = useContext(ModalContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {setUser} = useUserContext();
    const { showToast } = useToast();
    const handleUsernameOrEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.includes("@")) {
            setEmail(value);
        } else {
            setUsername(value);
        }
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleLogin: (e: FormEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (password.length === 0 || !password) {
            showToast("Password must be provided", "error");
            setIsLoading(false);
            return;
        }
        if (username.length === 0 && email.length === 0) {
            showToast("Username or Email must be provided", "error");
            setIsLoading(false);
            return;
        }
        const options = {
            method: "POST",
            body: JSON.stringify({ usernameOrEmail: username.length > 0 ? username : email, password }),
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web'
            },
            credentials: 'include' as RequestCredentials
        }
        try {
            const res = await fetch(loginUrl, options);
            if (!res.ok) {
                throw new Error("Login failed");
            }
            const data = await res.json();
            console.log(data);
            showToast(data.message, "success");
            if(data.data != null) {
                setUser(data.data);
            }
            closeModal('login');
            setIsLoading(false);
        } catch (error) {
            showToast("Login failed, please try again", "error");
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
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
                            <label htmlFor="email">Email/Username</label>
                            <TextField placeholder="Input your email or username" type="text" onChange={handleUsernameOrEmailChange} value={username.length > 0 ? username : email} />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="password">Password</label>
                            <TextField placeholder="Password" type="password" onChange={handlePasswordChange} value={password} />
                        </div>
                        <div className={style.FormGroup}>
                            <LargeButton type="submit" isLoading={isLoading} onClick={handleLogin} disabled={isLoading}>
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