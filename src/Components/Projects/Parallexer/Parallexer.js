import React, { Component } from 'react';
import './parallexer.css';

class Parallexer extends Component {

    handleScroll() {
        const target = document.getElementsByTagName("h3");

        let i = 0, length = target.length;
        let ls = (-24) + (window.pageYOffset/5);

        for (i; i < length; i++) {

            // Divide by 2 for smaller increments
            let pos = (window.pageYOffset/2) * target[i].dataset.rate;
            
            target[i].style.transform = 'translate3d(0px, ' + pos + 'px, 0px)';
        
            // For horizontal direction
            // let posX = window.pageYOffset * target[index].dataset.ratex;
            // let posY = window.pageYOffset * target[index].dataset.ratey;
            // target[index].style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0px)';

            if(i === length-1){
                if(ls < 8) {
                    target[i].style.letterSpacing = ls + 'px';
                }
            } else {
                if(ls < 12) {
                    target[i].style.letterSpacing = ls + 'px';
                }
            }
        }

        //console.log(ls)
    }

    // moveLocation() {
    //     window.location.href = "/#/project/p1";
    // }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        // document.getElementById('home').addEventListener('click', this.moveLocation);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return(
            <div id="parallexer" style={{paddingTop: "80px"}}>
                <h3 style={{color: "#6a97a3"}} data-rate="1">Digital</h3>
                <h3 style={{color: "#6a89a3"}} data-rate="-.05">Design</h3>
                <h3 style={{color: "#6a76a3"}} data-rate="-1">&amp; Functionality</h3>
                <h3 style={{color: "#7e6aa3"}} data-rate="-2">Experiment</h3>
                {/* <h3 style={{color: "#333"}} className="clickanywhere" data-rate="-2.2">Click anywhere to continue</h3> */}
            </div>
        )
    }

}

export default Parallexer;
