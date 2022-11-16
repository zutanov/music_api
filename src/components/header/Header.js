import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { HeaderSearch } from "./HeaderSearch";

export const Header = () => {

    const store = useSelector(store => store?.playlistReducer?.playlist)

    return (
        <header className="header">
            <div className="container header__container">
                <div className="logo">
                    <Link to="/">
                    <img className="logo" src="https://us.napster.com/assets/logos/logo-napster@3x-e69a845d9d2b8fdf1f89efbd444dd9ca295cfc295c51538fcdd6fa13e4deff11.png" alt=""/>
                    </Link>
                </div>
                <nav className="header__info">
                    <NavLink to='/' className="header__link">Music</NavLink>
                    <NavLink to='/artist' className="header__link">Artist</NavLink>
                    <NavLink to='/album' className="header__link">Album</NavLink>
                </nav>
                <NavLink to='/playlist' className="header__link">Playlist {store.length || ""}</NavLink>
                <HeaderSearch/>
            </div>
        </header>

        
    )
}