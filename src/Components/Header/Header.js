import React, { useState } from 'react';
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

function Header() {

    const [visible, setVisible] = useState(hideStyle);
    //const toggleVisible = () => setVisible(value => !value);

    return (
        <>
            <header className="App-header">
                <h1 onMouseOver={() => setVisible(showStyle)}>YKDD</h1>
            </header>

            <nav onMouseLeave={() => setVisible(hideStyle)}  style={visible}>
                <h2>YKDD</h2>
                <div>Young Koh Design // Digital</div>
            </nav>
        </>
    );

}

export default Header;
