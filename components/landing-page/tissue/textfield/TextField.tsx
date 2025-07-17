import { ChangeEvent } from "react";
import style from "./TextField.module.css"

interface TextFieldProps {
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ placeholder, type, value, onChange }) => {
    return (
        <input type={type ? type : "text"} className={style.TextField} placeholder={placeholder ? placeholder : "Enter text here..."} onChange={onChange} value={value ? value : ""} />
    )
}

export default TextField;