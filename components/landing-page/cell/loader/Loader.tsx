import style from './Loader.module.css';

const Loader: React.FC = () => {
    return (
        <div className={style.LoaderContainer}>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
        </div>
    )
}

export default Loader;