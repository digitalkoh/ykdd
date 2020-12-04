import React, { useState } from 'react';
import { Board } from "./Board.js";
import './css/style.css'

function ProjectPuzzleEinstein() {
    const [puzzleType, setPuzzleType] = useState('normal');
    const [showNumber, setShowNumber] = useState(false);
    const [reset, setReset] = useState(0);
    const [pic, setPic] = useState('ein');
    const [newArr, setNewArr] = useState();
    const handleClickNumber = () => setShowNumber(value => !value);
    
    const handleReset = () => {
        // First call returns boxes
        setPuzzleType('reset');
        setReset(1);

        // Second call triggers 'defaultPosition' prop in Draggable to make them movable again.
        setTimeout(function(){
           setPuzzleType('normal'); 
           setReset(0);
        }, 800); 
    }
    
    // const handleReset = () => window.location.reload(false);
    const handleShuffle = () => {
        // Auto generate array range
        let randArr = [...Array(16).keys()];

        // Randomize array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array
        };

        setPuzzleType('shuffle');
        setNewArr(shuffleArray(randArr)) 
    }

    const handleClickPic = (picname) => {
        setPic(picname);

        // Trigger reset after image change
        handleReset();
    }

    
    return (
        <>
            <Board puzzleType={puzzleType} showNumber={showNumber} newArr={newArr} pic={pic} reset={reset} />

            <div className="controls">
                <button className="bt-big" onClick={handleShuffle}>Shuffle</button>
                <button className="bt-small" onClick={handleReset}>Reset</button>
                <button className="bt-small" onClick={handleClickNumber}>Cheater's Button</button>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/ein.jpg )`}} onClick={() => handleClickPic('ein')}></div>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/bjork.jpg )`}} onClick={() => handleClickPic('bjork')}></div>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/chrome.jpg )`}} onClick={() => handleClickPic('chrome')}></div>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/bronco.jpg )`}} onClick={() => handleClickPic('bronco')}></div>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/jimi.jpg )`}} onClick={() => handleClickPic('jimi')}></div>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/sunrise.jpg )`}} onClick={() => handleClickPic('sunrise')}></div>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/books.jpg )`}} onClick={() => handleClickPic('books')}></div>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/ian.jpg )`}} onClick={() => handleClickPic('ian')}></div>
                </div>
            </div>
        </>
    )
}

export default ProjectPuzzleEinstein;