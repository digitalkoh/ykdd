import React from 'react';
import { NavLink } from "react-router-dom";
import './css/header.css';
const { useState } = React;

function Header() {
    const [navState, setNavState] = useState(false);

    const handleNavState = () => setNavState(value => !value);

    return (
        <>
            <header className="App-header">
                <div id='navOpen' onClick={() => {handleNavState()}}>Projects</div>
                 <nav className={navState && 'active'}>
                    <ul onClick={() => {handleNavState()}}>
                        <li><NavLink exact to='/' title='Home'>Index</NavLink></li>
                        <li><NavLink to='/project/p1'>Picture Puzzle</NavLink></li>
                        <li><NavLink to='/project/p2'>NASA Mars Photos</NavLink></li>
                        <li><NavLink to='/project/p3'>Scroll Behaviors</NavLink></li>
                    </ul>
                    <div id='navClose' onClick={() => {handleNavState()}}>Close</div>
                </nav>
            </header>
        </>
    );

}

export default Header;