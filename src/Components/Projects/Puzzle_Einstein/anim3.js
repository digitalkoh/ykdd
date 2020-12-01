import React from 'react';
import Draggable from 'react-draggable';

const boxStyle={
    width: '100px',
    height: '100px'
}

const DraggableComponent2 = () => {
    return (
        <div>
            <Draggable
                // grid={[25, 25]}
                bounds=".container"
            >
                <div 
                    className="box" 
                    style={{
                        ...boxStyle, 
                        padding: '100px', 
                        backgroundColor: 'green', 
                        cursor: 'move', 
                        //transition: '.2s'
                        // transitionTimingFunction: 'cubic-bezier(0.45, 0.25, 0.60, 0.95)'
                    }}>

                    <h3>1</h3>
                </div>
            </Draggable>

            <Draggable
                defaultPosition={{x: 0, y: 0}}
                // bounds={{top: -130, left: -130, right: 130, bottom: 130}}
            >
                <div className="box" style={{...boxStyle, padding: '100px', backgroundColor: 'red', cursor: 'move'}}>
                    <h3>2</h3>
                    <div>This<br />is<br />handle</div>
                </div>
            </Draggable>


        </div>
    );
}

export default DraggableComponent2