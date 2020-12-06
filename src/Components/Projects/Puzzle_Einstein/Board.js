import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { boardStyle, boxStyle, containerStyle, squareStyle } from './Style';

const PIECE_SIZE = 500 / 4;
const PIECE_GRID_SNAP = 500 / 8;
const NUMBER_OF_PIECES = 16
const background_color = { backgroundColor: 'rgb(12, 50, 94, .7)' }

export const Board = ({ puzzleType, showNumber, newArr, pic, reset}) => {
    // console.log("puzzleType: " + puzzleType + ", reset: " + reset);
    const [zindex, setZindex] = useState(0);
    const [render, setRender] = useState(puzzleType);
    const background_image = { backgroundImage: `url( ${process.env.PUBLIC_URL}/img/` + pic + `.jpg )` }

    const onStartAction = (e) => {
        e.preventDefault();
        // Increment z-index by one on each drag.
        // This maintains nice order of z so that boxes don't disappear in awkward fashion.
        let increase = zindex + 1;
        setZindex(increase);

        // 1. Use target's data-key to find matching parent div
        // 2. Apply higher z-index
        let div = e.target.dataset.key;
        let curDiv = document.getElementById("box-"+div);
        curDiv.style.zIndex = zindex; 
    };

    function renderSquare(i) {
        // x, y currently not used...
        const x = i % 4;
        const y = Math.floor(i / 4);
        const boxIdName = "box-" + i;
        
        // Draggable keys need to be different on render after reset... 'undefined' keys somehow works???
        const keys = undefined;

        return (
            // React Draggable will only recognize boundary elements correctly when 'box' is passed as a child directly, instead of as component.
            // Drggable 'position' returns all boxes to original pos (but they're not movable). 
            // Call another render in 800ms (from parent) that uses 'defaultPosition' which makes it movable.
            reset === 0 ?
            <Draggable onStart={(e) => onStartAction(e)} bounds=".container" key={keys} grid={[PIECE_GRID_SNAP, PIECE_GRID_SNAP]} defaultPosition={{x: 0, y: 0}}>
                <div className="boxParent" id={boxIdName} data-key={i} key={keys} style={squareStyle} >
                    <div data-key={i} data-xpos={x} data-ypos={y}
                        className="box"
                        style={{ ...boxStyle, ...background_image, ...background_color, width: PIECE_SIZE, height: PIECE_SIZE }}
                    >
                        {showNumber ? i + 1 : ''}
                    </div>
                </div>
            </Draggable>
            :
            <Draggable onStart={(e) => onStartAction(e)} bounds=".container" key={i} grid={[PIECE_GRID_SNAP, PIECE_GRID_SNAP]} position={{x: 0, y: 0}}>
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

    // Normal puzzle
    function puzzleNormal() {
        for (let i = 0; i < NUMBER_OF_PIECES; i += 1) {
            squares.push(renderSquare(i));
        }
    }

    // Shuffle puzzle - use shuffled array passed via useState
    function puzzleShuffle() {
        for (let i = 0; i < newArr.length; i += 1) {
            squares.push(renderSquare(newArr[i]));
        }
    }

    // Rerender puzzle when type changes or reset.
    useEffect(() => {
        setRender(puzzleType)

        // return function cleanup() {
        //     console.log()
        // };
    },[puzzleType, reset]);

    // Choose which puzzle to render based on type
    if(render === 'normal') {
        puzzleNormal()
    } else if(render === 'shuffle') {
        puzzleShuffle()
    } else {
        puzzleNormal()
    }

    return (
        <div className="container pzcontainer" style={containerStyle}>
            <div style={boardStyle}>
                {squares}
            </div>
        </div>
    )
}