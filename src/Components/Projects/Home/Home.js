import React, { Component } from 'react';
import Header from '../../Header/Header';
import './home.css';

const divstyle = {
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat-y',
    backgroundPosition: '50%',
    position: 'absolute',
    top: '0'
};

class Home extends Component {
    handleScroll() {
        const target = document.querySelectorAll(".pdiv");

        let i = 0, length = target.length;

        for (i; i < length; i++) {
            // Divide by 2 for smaller increments
            let pos = (window.pageYOffset) * target[i].dataset.rate;
            target[i].style.transform = 'translate3d(0px, ' + pos + 'px, 0px)';
            target[1].style.opacity = 'translate3d(0px, ' + pos + 'px, 0px)';
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return(
            <div id="home">
                <h1>Young Koh Design</h1>
                <h2>UI Designer &amp; Engineer</h2>
                <p>React, Javascript, ES6, JSX, Node, CSS, SASS, HTML, Polymer, Angular, Typescript, XML, JSON, PHP, MYSQL, Sketch, Photoshop, Illustrator, InDesign, Figma, Jira</p>
                <Header />
                <div className='pdiv' style={{...divstyle, backgroundImage: `url( ${process.env.PUBLIC_URL}/img/intro_img2.jpg)`}} data-rate=".6"></div>
                <div className='pdiv' style={{...divstyle, backgroundImage: `url( ${process.env.PUBLIC_URL}/img/intro_img1.png)`, opacity: '.7'}} data-rate=".8"></div>
                
                <div style={{height: '1000px'}}></div>
            </div>
        )
    }

}

export default Home;
