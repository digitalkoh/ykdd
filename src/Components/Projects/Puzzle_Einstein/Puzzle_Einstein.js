// import React, { useState } from 'react';

const PuzzleWrapperStyle={
    display: "flex", 
    flexWrap: "wrap", 
    width: "300px", 
    height: "300px"
}

const pieceStyle={
    width: "100px",
    height: "100px",
    backgroundColor: "#777",
    border: "solid 1px #888"
}

function Puzzle_Einstein() {

  return (
      <>
        <div id="puzzle" style={PuzzleWrapperStyle}>
            <div className="piece" style={pieceStyle}> 1 </div>
            <div className="piece" style={pieceStyle}> 2 </div>
            <div className="piece" style={pieceStyle}> 3 </div>
            <div className="piece" style={pieceStyle}> 4 </div>
            <div className="piece" style={pieceStyle}> 5 </div>
            <div className="piece" style={pieceStyle}> 6 </div>
            <div className="piece" style={pieceStyle}> 7 </div>
            <div className="piece" style={pieceStyle}> 8 </div>
            <div className="piece" style={pieceStyle}> 9 </div>
        </div>
      </>
  );

}

export default Puzzle_Einstein;
