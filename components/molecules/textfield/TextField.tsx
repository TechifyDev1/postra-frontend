import style from "./TextField.module.css"

interface TextFieldProps {
    placeholder?: string;
    type?: string;
}

const TextField: React.FC<TextFieldProps> = ({ placeholder, type }) => {
    return (
        <input type={type ? type : "text"} className={style.TextField} placeholder={placeholder ? placeholder : "Enter text here..."} />
    )
}

export default TextField;