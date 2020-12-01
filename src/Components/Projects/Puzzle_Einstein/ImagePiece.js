import React, { useState } from 'react';
import Draggable from 'react-draggable';

const boxStyle={
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontSize: '3em',
    color: '#fff',
    fontWeight: 'bold',
    border: 'solid 1px #fff'
}

export const ImagePiece = ({ title, width }) => {
    const [zindex, setZindex] = useState();

    const onStartAction = () => {
        setZindex();
    };

    // onStop = () => {
    //      setZindex(zindex + 100);
    // };

    return (
        <div>
            <Draggable onStart={onStartAction}
                // grid={[25, 25]}
                // bounds=".pzcontainer"
            >
                <div 
                    className="box" 
                    style={{
                        ...boxStyle,
                        backgroundColor: 'green', 
                        cursor: 'move', 
                        width: width,
                        height: width,
                        zIndex: zindex
                        //transition: '.2s'
                        // transitionTimingFunction: 'cubic-bezier(0.45, 0.25, 0.60, 0.95)'
                    }}>

                    <div>{title}</div>
                </div>
            </Draggable>
        </div>
    );
}