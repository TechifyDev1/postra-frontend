import style from "./TextField.module.css"

const TextField: React.FC = () => {
    return (
        <input type="text" className={style.TextField} placeholder="Enter text here..." />
    )
}