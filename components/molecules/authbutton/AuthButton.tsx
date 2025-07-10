import LargeButton from '@/components/atoms/large-button/LargeButton';
import style from './AuthButton.module.css';
import { FacebookLogo, GoogleLogo } from 'phosphor-react';

interface AuthButtonProps {
    label: string;
    onClick?: () => void;
}

const facebookSignIn = {
    text: "Sign in with Facebook",
    icon: FacebookLogo,
}

const googleSignIn = {
    text: "Sign in with Google",
    icon: GoogleLogo
}

const AuthButton: React.FC<AuthButtonProps> = ({ label, onClick }) => {
    return (
        <LargeButton onClick={onClick}>{label}</LargeButton>
    )
}