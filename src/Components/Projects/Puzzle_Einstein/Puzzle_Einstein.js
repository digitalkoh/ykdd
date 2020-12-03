// import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { Board } from "./Board.js";
import './css/style.css'

function ProjectPuzzleEinstein() {

    const [puzzleType, setPuzzleType] = useState('normal');
    const [showNumber, setShowNumber] = useState(true);

    const handleClickNumber = () => setShowNumber(value => !value);
    const handleShuffle = () => setPuzzleType('shuffle');
    const handleReset = () => window.location.reload(false);

    return (
        <>
            <Board puzzleType={puzzleType} showNumber={showNumber} />

            <div>
                <button onClick={handleClickNumber}>Num</button>
                <button onClick={handleShuffle}>Shuffle</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </>
    )
}

export default ProjectPuzzleEinstein;