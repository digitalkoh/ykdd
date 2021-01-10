import React from 'react';
import { NavLink } from "react-router-dom";
import './css/header.css';
import { scrollTo } from '../GlobalScrollTo';
import navdata from '../navdata.json'
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
                        {navdata.map((nav, idx) => {
                            return (
                                idx !== navdata.length - 1
                                ? <li key={idx}><NavLink to={nav.path}>{nav.name}</NavLink></li>
                                : null
                            )
                        })}
                    </ul>
                    <div id='navClose' onClick={() => {handleNavState()}}>Close</div>
                </nav>
            </header>
        </>
    );

}