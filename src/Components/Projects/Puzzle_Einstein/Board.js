import React, { useState } from 'react';
import Draggable from 'react-draggable';

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
    borderRadius: '8px'
}

const squareStyle = {
    width: '25%', 
    height: '25%',
    transition: '.2s',
    // transitionTimingFunction: 'cubic-bezier(0.45, 0.25, 0.60, 0.95)'
};
const imgPieceStyle = 500 / 4;

export const Board = () => {
    const [zindex, setZindex] = useState(0);

    const onStartAction = (e) => {
        // This prevents text highlighting inside boxes, in any
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
        const x = i % 4;
        const y = Math.floor(i / 4);
        const boxIdName = "box-" + i;

        return (
            <Draggable onStart={(e) => onStartAction(e)} bounds=".container">
                <div className="boxParent" id={boxIdName} data-key={i} key={i} style={squareStyle}>
                    <div data-key={i} data-xpos={x} data-ypos={y}
                        className="box" 
                        style={{
                            ...boxStyle,
                            backgroundColor: 'green', 
                            cursor: 'move', 
                            width: imgPieceStyle,
                            height: imgPieceStyle
                        }}
                    >
                        {i}
                    </div>
                </div>
            </Draggable>
        );
    }

    const squares = [];
    for (let i = 0; i < 16; i += 1) {
        squares.push(renderSquare(i));
    }
    return <div style={boardStyle}>{squares}</div>
};
