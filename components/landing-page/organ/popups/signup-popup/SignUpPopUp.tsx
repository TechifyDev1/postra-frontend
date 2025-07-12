import Modal from '@/components/landing-page/tissue/modal/Modal';
import style from './SignUpPopUp.module.css';
import { X } from 'phosphor-react';
import XlargeText from '@/components/landing-page/cell/xlarge-text/XlargeText';
import TextField from '@/components/landing-page/tissue/textfield/TextField';
import LargeButton from '@/components/landing-page/cell/large-button/LargeButton';
import LargeText from '@/components/landing-page/cell/large-text/LargeText';
import { ModalContext } from '@/contexts/ModalContext';
import { useContext, MouseEvent } from 'react';
import SmallText from '@/components/landing-page/cell/small-text/SmallText';

const SignUpPopUp: React.FC = () => {

    const { closeModal, modals, openModal } = useContext(ModalContext);

    return (
        <Modal show={modals.signUp} onClose={() => { closeModal('signUp') }}>
            <div className={style.signUpPopUp} onClick={(e) => e.stopPropagation()}>
                <div className={style.closeHeader}>
                    <X size={24} className={style.closeIcon} onClick={() => { closeModal('signUp') }} />
                </div>
                <div className={style.Content}>
                    <XlargeText align='alignCenter'>Join Postra.</XlargeText>
                    <form action="" className={style.Form}>
                        <div className={style.FormGroup}>
                            <label htmlFor="email">Email</label>
                            <TextField placeholder="Email" type="email" />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="username">Username</label>
                            <TextField placeholder="Username" type="text" />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="password">Password</label>
                            <TextField placeholder="Password" type="password" />
                        </div>
                        <div className={style.FormGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <TextField placeholder="Confirm Password" type="password" />
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
                                style={{marginLeft: 4}}
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