import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { Board } from "./Board.js";
import './css/style.css'

function ProjectPuzzleEinstein() {

    const [puzzleType, setPuzzleType] = useState('normal');
    const [showNumber, setShowNumber] = useState(true);

    const handleClickNumber = () => setShowNumber(value => !value)
    const handleShuffle = () => setPuzzleType('shuffle')
    const handleReset = () => setPuzzleType('normal')

    return (
        <>
            <Board puzzleType={puzzleType} showNumber={showNumber} />

            <div>
                <Link onClick={handleClickNumber}>Num</Link>
                <Link onClick={handleShuffle}>Shuffle</Link>
                <Link onClick={handleReset}>Reset</Link>
            </div>
        </>
    )
}

export default ProjectPuzzleEinstein;