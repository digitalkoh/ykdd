import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import './css/header.css';

const showStyle={
    top: "0",
    transition: '.8s',
    opacity: 1
}
const hideStyle={
    top: "-300px",
    transition: '.6s ease-in',
    opacity: 0
}
const showHeaderStyle={
    transition: '.8s',
    opacity: 1
}
const hideHeaderStyle={
    transition: '.6s ease-in',
    opacity: 0
}

function Header() {

    const [visible, setVisible] = useState(hideStyle);
    const [HeaderVisible, setHeaderVisible] = useState(showHeaderStyle);
    //const toggleVisible = () => setVisible(value => !value);

    return (
        <>
            <header className="App-header">
                <h1 onMouseOver={() => {setVisible(showStyle); setHeaderVisible(hideHeaderStyle)}}  style={HeaderVisible}>YKDD</h1>
            </header>

            <nav onMouseLeave={() => {setVisible(hideStyle); setHeaderVisible(showHeaderStyle)}} style={visible}>
                <h2>YKDD</h2>
                <div>Young Koh Design // Digital</div>

                <ul onClick={() => setVisible(hideStyle)}>
                    <li><Link to='/' title='Home'>0</Link></li>
                    <li><NavLink to='/projects/p1'>1</NavLink></li>
                    <li><NavLink to='/projects/p2'>2</NavLink></li>
                </ul>
            </nav>
        </>
    );

}

export default Header;
