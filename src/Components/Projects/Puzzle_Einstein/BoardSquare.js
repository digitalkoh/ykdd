import React from 'react';

const squareStyle = {
    width: '100%',
    height: '100%',
    border: '1px solid #ddd',
    color: 'black',
    backgroundColor: 'transparant'
};

const Square = ({ children }) => {
    return (
    <div style={{...squareStyle}}>
	    {children}
	</div>);
};

export const BoardSquare = ({ x, y, children, }) => {
    return (
        <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }} 
            data-xpos={x}
            data-ypos={y}
        >
			<Square>{children}</Square>
		</div>
    )
}
