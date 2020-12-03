import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { boardStyle, boxStyle, containerStyle, squareStyle } from './Style';

const PIECE_SIZE = 500 / 4;
const PIECE_GRID_SNAP = 500 / 8;
const NUMBER_OF_PIECES = 16;
const background_image = { backgroundImage: `url( ${process.env.PUBLIC_URL}/img/ein.jpg )` }
const background_color = { backgroundColor: 'rgb(12, 50, 94, .7)' }

export const Board = ({ puzzleType, showNumber}) => {
    const [zindex, setZindex] = useState(0);
    const [render, setRender] = useState(puzzleType);

    const onStartAction = (e) => {
        e.preventDefault();

        if(render !== "shuffle") {
            // Increment z-index by one on each drag.
            // This maintains nice order of z so that boxes don't disappear in awkward fashion.
            let increase = zindex + 1;
            setZindex(increase);

            // 1. Use target's data-key to find matching parent div
            // 2. Apply higher z-index
            let div = e.target.dataset.key;
            let curDiv = document.getElementById("box-"+div);
            curDiv.style.zIndex = zindex;
        }
    };

    function renderSquare(i) {
        // x, y currently not used...
        const x = i % 4;
        const y = Math.floor(i / 4);
        const boxIdName = "box-" + i;

        return (
            // React Draggable will only recognize boundary elements correctly when 'box' is passed as a child directly, instead of as component
            <Draggable onStart={(e) => onStartAction(e)} bounds=".container" key={i} grid={[PIECE_GRID_SNAP, PIECE_GRID_SNAP]}>
                <div className="boxParent" id={boxIdName} data-key={i} key={i} style={squareStyle} >
                    <div data-key={i} data-xpos={x} data-ypos={y}
                        className="box" 
                        style={{ ...boxStyle, ...background_image, ...background_color, width: PIECE_SIZE, height: PIECE_SIZE }}
                    >
                        {showNumber ? i + 1 : ''}
                    </div>
                </div>
            </Draggable>
        );
    }

    const squares = [];
    let shuffledSquares = [...Array(16).keys()];

    // ================================= Normal Puzzle  ================================== //
    function puzzleNormal() {
        for (let i = 0; i < NUMBER_OF_PIECES; i += 1) {
            squares.push(renderSquare(i));
        }
    }

    // ================================= Shuffle Puzzle ================================== //
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    };

    function puzzleShuffle() {
        shuffledSquares = shuffleArray(shuffledSquares);
        
        squares.length = 0;
        for (let i = 0; i < shuffledSquares.length; i += 1) {
            squares.push(renderSquare(shuffledSquares[i]));
        }
    }

    // Rerender puzzle each time type changes. Does nothing if puzzleType stayed the same
    useEffect(() => {
        setRender(puzzleType)
    },[puzzleType]);

    // Choose which puzzle to render based on type
    if(render === 'normal') {
        puzzleNormal() 
    } else if(render === 'shuffle') {
        puzzleShuffle()
    }

    return (
        <div className="container pzcontainer" style={containerStyle}>
            <div style={boardStyle}>
                {squares}
            </div>
        </div>
    )
};
