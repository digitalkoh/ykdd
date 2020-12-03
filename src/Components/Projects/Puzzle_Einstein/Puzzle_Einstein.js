import React, { useState } from 'react';
import { Board } from "./Board.js";
import './css/style.css'

function ProjectPuzzleEinstein() {
    const [puzzleType, setPuzzleType] = useState('normal');
    const [showNumber, setShowNumber] = useState(true);
    const [newArr, setNewArr] = useState();
    const handleClickNumber = () => setShowNumber(value => !value);
    const handleReset = () => window.location.reload(false);
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
    
    return (
        <>
            <Board puzzleType={puzzleType} showNumber={showNumber} newArr={newArr} />

            <div>
                <button onClick={handleClickNumber}>Num</button>
                <button onClick={handleShuffle}>Shuffle</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </>
    )
}

export default ProjectPuzzleEinstein;