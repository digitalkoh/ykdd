import React, { useState } from 'react';
import { NavLink, Link} from "react-router-dom";
import './css/header.css';

// const showStyle={
//     top: "0",
//     transition: '.8s',
//     opacity: 1
// }
// const hideStyle={
//     top: "-300px",
//     transition: '.6s ease-in',
//     opacity: 0
// }
// const showHeaderStyle={
//     transition: '.8s',
//     opacity: 1
// }
// const hideHeaderStyle={
//     transition: '.6s ease-in',
//     opacity: 0
// }

function Header() {

    //const [visible, setVisible] = useState(hideStyle);
    //const [HeaderVisible, setHeaderVisible] = useState(showHeaderStyle);
    //const toggleVisible = () => setVisible(value => !value);
    useState()
    
    return (
        <>
            <header className="App-header">
                <h1><Link to='/'>YKDD</Link></h1>

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
