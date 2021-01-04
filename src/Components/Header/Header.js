import React from 'react';
import { NavLink } from "react-router-dom";
import './css/header.css';
import { scrollTo } from '../GlobalScrollTo';
const { useState } = React;

export default function Header() {
    const [navState, setNavState] = useState(false);

    const handleNavState = () => setNavState(value => !value);

    return (
        <>
            <header className="App-header">
                <div id='navOpen' onClick={() => {handleNavState()}}>Projects</div>
                 <nav className={navState ? 'active' : ''}>
                    <ul onClick={() => {handleNavState(); scrollTo(0) }}>
                        <li><NavLink exact to='/' title='Home'>Index</NavLink></li>
                        <li><NavLink to='/project/image-puzzle'>Picture Puzzle</NavLink></li>
                        <li><NavLink to='/project/nasa-rover-photos'>NASA Mars Photos</NavLink></li>
                        <li><NavLink to='/project/open-library-search'>Open Library Search</NavLink></li>
                        <li><NavLink to='/project/p3'>Scroll Behaviors</NavLink></li>
                    </ul>
                    <div id='navClose' onClick={() => {handleNavState()}}>Close</div>
                </nav>
            </header>
        </>
    );

}