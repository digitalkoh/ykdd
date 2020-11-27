import React, { Component } from 'react';
import './home.css';

class Home extends Component {

    handleScroll() {
        const target = document.getElementsByTagName("h3");

        let index = 0, length = target.length;
        let ls = (-24) + (window.pageYOffset/5);

        for (index; index < length; index++) {
            // Divide by 2 for smaller increments
            let pos = (window.pageYOffset/2) * target[index].dataset.rate;

            target[index].style.transform = 'translate3d(0px, ' + pos + 'px, 0px)';

            // For horizontal direction
            // let posX = window.pageYOffset * target[index].dataset.ratex;
            // let posY = window.pageYOffset * target[index].dataset.ratey;
            // target[index].style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0px)';

            if(index === length-1){
                if(ls < 8) {
                    target[index].style.letterSpacing = ls + 'px';
                }
            } else {
                if(ls < 12) {
                    target[index].style.letterSpacing = ls + 'px';
                }
            }
        }

        //console.log(ls)
    }

    moveLocation() {
        window.location.href = "/#/projects/p1";
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        document.getElementById('home').addEventListener('click', this.moveLocation);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return(
            <div id="home">
                <h3 style={{color: "#6a97a3"}} data-rate="1">Digital</h3>
                <h3 style={{color: "#6a89a3"}} data-rate="-.05">Design</h3>
                <h3 style={{color: "#6a76a3"}} data-rate="-1">&amp; Functionality</h3>
                <h3 style={{color: "#7e6aa3"}} data-rate="-2">Experiment</h3>
                <h3 style={{color: "#333"}} className="clickanywhere" data-rate="-2.2">Click anywhere to continue</h3>
            </div>
        )
    }

}

export default Home;
