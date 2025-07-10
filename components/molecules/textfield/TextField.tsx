import style from "./TextField.module.css"

interface TextFieldProps {
    placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({ placeholder }) => {
    return (
        <input type="text" className={style.TextField} placeholder={placeholder ? placeholder : "Enter text here..."} />
    )
}