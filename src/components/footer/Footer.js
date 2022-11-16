import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
            <Link to="/">
                    <img className="logo" src="https://us.napster.com/assets/logos/logo-napster@3x-e69a845d9d2b8fdf1f89efbd444dd9ca295cfc295c51538fcdd6fa13e4deff11.png" alt=""/>
                </Link>
                <div>
                    <img className="logo" src="https://us.napster.com/assets/logos/logo-rhapsody-gray-ca9a1908e8c2ced5adfc01c7f71718abe3e36f605f2f4986b0e4b1303392ab2e.svg" alt=""/>
                </div>
                <p>
                    © 2022 Rhapsody International, Inc., a subsidiary of Napster Group PLC. All rights reserved.</p>
            </div>            
        </footer>
    )
}