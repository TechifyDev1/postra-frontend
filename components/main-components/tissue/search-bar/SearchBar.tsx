'use client';
import { MagnifyingGlass } from "phosphor-react";
import { FC } from "react";
import style from './SearchBar.module.css';

const SearchBar: FC = () => {
    return (
        <div className={style.SearchBar}>
            <MagnifyingGlass size={24} weight="thin" />
            <input type="text" placeholder="Search" />
        </div>
    );
}

export default SearchBar;
