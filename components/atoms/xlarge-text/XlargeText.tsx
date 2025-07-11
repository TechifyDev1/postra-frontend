import style from "./XlargeText.module.css";

const XlargeText: React.FC<{ children: React.ReactNode , align: 'alignCenter' | 'alignLeft' | 'alignRight' }> = ({ children , align }) => {
    return (
        <h1 className={`${style.xlargeText} ${style[align]}`}>
            {children}
        </h1>
    );
}

export default XlargeText;
