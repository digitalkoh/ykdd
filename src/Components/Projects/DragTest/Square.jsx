import React from 'react';
const squareStyle = {
    width: '100%',
    height: '100%',
    border: '1px solid #ddd',
    color: 'black',
    backgroundColor: 'white'
};
export const Square = ({ black, children }) => {
    // const backgroundColor = black ? 'black' : 'white';
    // const color = black ? 'white' : 'black';
    return (<div style={{
        ...squareStyle
    }}>
			{children}
		</div>);
};
