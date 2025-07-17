'use client';
import Modal from '@/components/landing-page/tissue/modal/Modal';
import style from './SignUpPopUp.module.css';
import { X } from 'phosphor-react';
import XlargeText from '@/components/landing-page/cell/xlarge-text/XlargeText';
import TextField from '@/components/landing-page/tissue/textfield/TextField';
import LargeButton from '@/components/landing-page/cell/large-button/LargeButton';
import LargeText from '@/components/landing-page/cell/large-text/LargeText';
import { ModalContext } from '@/contexts/ModalContext';
import { useContext, MouseEvent, useState } from 'react';
import SmallText from '@/components/landing-page/cell/small-text/SmallText';
import { useToast } from '@/contexts/ToastContext';
import { createUserUrl } from '@/utils';

const SignUpPopUp: React.FC = () => {

    const { closeModal, modals, openModal } = useContext(ModalContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    const { showToast } = useToast();
    const handleSignUp: () => Promise<void> = async () => {
        if (password.length === 0 || !password) {
            showToast("Password must be provided", "error");
            return;
        }
        if (username.length === 0 || !username) {
            showToast("Username can't be blank", "error");
            return;
        }
        if (email.length === 0 || !email) {
            showToast("Email must be provided", "error");
            return;
        }
        if (password !== confirmPass) {
            showToast("Password not matched, please try again", "error");
            return;
        }
        if (fullName !== fullName) {
            showToast("Your full name is required", "error");
            return;
        }
        const options = {
            method: "POST",
            body: JSON.stringify({ username, password, fullName, email })
        }
        try {
            const res = await fetch(createUserUrl, options);
            if (res.ok) {
                console.log(res.body)
                showToast("Signed Up successfully...", "success")
            }
        } catch (error) {
            if (error instanceof Error) {
                showToast(error.message, "error")
                console.log(error);
                return;
            }
            showToast("Signup unsuccessfull", 'error')
        }
    }

    return (
        <Modal show={modals.signUp} onClose={() => { closeModal('signUp') }}>
            <div className={style.signUpPopUp} onClick={(e) => e.stopPropagation()}>
                <div className={style.closeHeader}>
                    <X size={24} className={style.closeIcon} onClick={() => { closeModal('signUp') }} />
                </div>
                <div className={style.Content}>
                    <XlargeText align='alignCenter'>Join Postra.</XlargeText>
                    <form action="" className={style.Form} onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                        <div className={style.FormGroup}>
                            <label htmlFor="email">Email</label>
                            <TextField placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="fullname">FullName</label>
                            <TextField placeholder="FullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="username">Username</label>
                            <TextField placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="password">Password</label>
                            <TextField placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <TextField placeholder="Confirm Password" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                        </div>
                        <div className={style.FormGroup}>
                            <LargeButton type="submit" isLoading={false}>
                                <LargeText>Sign Up</LargeText>
                            </LargeButton>
                        </div>
                    </form>
                    <SmallText align='center'>
                        Already have an account?
                        <a
                            href='/login'
                            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                                e.preventDefault();
                                openModal('login');
                            }}
                            style={{ marginLeft: 4 }}
                        >
                            Sign in
                        </a>
                    </SmallText>
                </div>
            </div>
        </Modal>
    )
}

export default SignUpPopUp;