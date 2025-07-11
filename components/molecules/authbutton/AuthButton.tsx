import LargeButton from '@/components/atoms/large-button/LargeButton';
import style from './AuthButton.module.css';
import { FacebookLogo, GoogleLogo } from 'phosphor-react';

interface AuthButtonProps {
    label: string;
    onClick?: () => void;
    type: 'signIn' | 'signUp';
}


const AuthButton: React.FC<AuthButtonProps> = ({ label, onClick, type }) => {
    const facebookSignIn = {
        text: "Sign in with Facebook",
        icon: FacebookLogo,
    }
    
    const googleSignIn = {
        text: "Sign in with Google",
        icon: GoogleLogo
    }
    
    const facebookSignUp = {
        text: "Sign up with Facebook",
        icon: FacebookLogo,
    }
    
    const googleSignUp = {
        text: "Sign up with Google",
        icon: GoogleLogo
    }
    return (
        <LargeButton onClick={onClick}>
            <div className={style.authButton}>
                {
                    type === 'signIn' && label === 'facebook' ? (<>facebookSignIn.icon <p>{facebookSignIn.text}</p></>) :
                        type === 'signIn' && label === 'google' ? (<>googleSignIn.icon <p>{googleSignIn.text}</p></>) :
                            type === 'signUp' && label === 'facebook' ? (<>facebookSignUp.icon <p>{facebookSignUp.text}</p></>) :
                                type === 'signUp' && label === 'google' ? (<>googleSignUp.icon <p>{googleSignUp.text}</p></>) : null
                }
            </div>
        </LargeButton>
    )
}

export default AuthButton;