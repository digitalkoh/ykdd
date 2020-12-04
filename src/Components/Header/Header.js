import React from 'react';
import { NavLink } from "react-router-dom";
import './css/header.css';
function Header() {

    return (
        <>
            <header className="App-header">
                 <nav>
                    <ul>
                        <li><NavLink exact to='/' title='Home'>0</NavLink></li>
                        <li><NavLink to='/projects/p1'>1</NavLink></li>
                        <li><NavLink to='/projects/p2'>2</NavLink></li>
                        <li><NavLink to='/projects/p3'>3</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );

}

export default Header;
