import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

// Combined all nested elements here to make it easy to pass size parameters

const boardStyle = {
    width: '500px',
    height: '500px',
    display: 'flex',
    flexWrap: 'wrap',
    border: 'solid 1px #ddd'
};

const boxStyle={
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontSize: '3em',
    color: '#fff',
    fontWeight: 'bold',
    border: 'solid 1px #fff',
    borderRadius: '8px',
    backgroundImage: `url( ${process.env.PUBLIC_URL}/img/ein.jpg )`
};

const containerStyle={
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', 
    width: '750px', 
    height: '750px', 
    border: 'solid 1px #ccc'
};

// Cubic-Bezier ain't got nuthin' on me.
// Go wild...!
const squareStyle = {
    width: '25%', 
    height: '25%',
    transition: '.4s',
    transitionTimingFunction: 'cubic-bezier(0.45, 0.25, 0.60, 0.95)'
};
const imgPieceStyle = 500 / 4;
const pieceGridSnap = 500 / 8;
const numberOfSquares = 16;

export const Board = ({ puzzleType, showNumber }) => {
    const [zindex, setZindex] = useState(0);
    const [render, setRender] = useState(puzzleType);

    const onStartAction = (e) => {
        // This prevents text highlighting inside boxes, in any
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
        const x = i % 4;
        const y = Math.floor(i / 4);
        const boxIdName = "box-" + i;

        return (
            // Wanted to separate out the 'boxParent' and/or the 'box', but React Draggable will only
            // recognize boundary elements correctly when the actual div is used as a child.
            // Few other Draggable behavior got funky when component was passed as ca child.
            <Draggable onStart={(e) => onStartAction(e)} bounds=".container" key={i} grid={[pieceGridSnap, pieceGridSnap]}>
                <div className="boxParent" id={boxIdName} data-key={i} key={i} style={squareStyle}>
                    <div data-key={i} data-xpos={x} data-ypos={y}
                        className="box" 
                        style={{
                            ...boxStyle,
                            backgroundColor: 'rgb(12, 50, 94, .7)', 
                            cursor: 'move', 
                            width: imgPieceStyle,
                            height: imgPieceStyle
                        }}
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
        for (let i = 0; i < numberOfSquares; i += 1) {
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
        //console.log(squares);
    }

    // function maintainRender() {
    //     squares.length = 0;
    //     for (let i = 0; i < shuffledSquares.length; i += 1) {
    //         squares.push(renderSquare(shuffledSquares[i]));
    //     }
    // }

    useEffect(() => {
        setRender(puzzleType)
    },[puzzleType]);

    // useEffect(() => {
    //     setRender('')
    // },[showNumber]);


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
