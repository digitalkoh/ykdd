// import React, { useState } from 'react';

// const PuzzleWrapperStyle={
//     display: "flex", 
//     flexWrap: "wrap", 
//     width: "300px", 
//     height: "300px"
// }

// const pieceStyle={
//     width: "100px",
//     height: "100px",
//     backgroundColor: "#777",
//     border: "solid 1px #888"
// }

// function Puzzle_Einstein() {

//   return (
//       <>
//         <div id="puzzle" style={PuzzleWrapperStyle}>
//             <div className="piece" style={pieceStyle}> 1 </div>
//             <div className="piece" style={pieceStyle}> 2 </div>
//             <div className="piece" style={pieceStyle}> 3 </div>
//             <div className="piece" style={pieceStyle}> 4 </div>
//             <div className="piece" style={pieceStyle}> 5 </div>
//             <div className="piece" style={pieceStyle}> 6 </div>
//             <div className="piece" style={pieceStyle}> 7 </div>
//             <div className="piece" style={pieceStyle}> 8 </div>
//             <div className="piece" style={pieceStyle}> 9 </div>
//         </div>
//       </>
//   );

// }
// 
// export default Puzzle_Einstein;

import './css/style_square.css';
import './helpers/array_helpers';
// import React, { Component, PropTypes }  from 'react';
import React, { Component }  from 'react';
// import moment                           from 'moment';
import { times }                        from 'lodash';
import classNames                       from 'classnames';
import throttle                         from './helpers/throttle';

import FlipMove from 'react-flip-move';


const SQUARES_WIDTH   = 4;
const SQUARES_HEIGHT  = 4;
const NUM_SQUARES     = SQUARES_WIDTH * SQUARES_HEIGHT;
const RED_SQUARE      = Math.floor(NUM_SQUARES / 2);

const FLIP_DURATION   = 750;
const [ LEFT, UP, RIGHT, DOWN ] = [37, 38, 39, 40];


class Puzzle_Einstein extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: times(NUM_SQUARES, i => ({
        id: i,
        red: i === RED_SQUARE
      }))
    };

    this.move = throttle(this.move, { context: this });
  }

  componentDidMount() {
    window.addEventListener('keydown', this.move);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.move);
  }

  renderSquares() {
    return this.state.squares.map( square => {
      const classes = classNames({
        square: true,
        red: square.red,
      });

      return (
        <div
          key={square.id}
          className={classes}
          onClick={this.move}
          {...square}
        />
      );
    });
  }

  move(event) {
    event.preventDefault();

    const currentIndex = this.state.squares.findIndex( square => square.red );
    let newIndex;

    switch (event.which) {
      case UP:
        newIndex = currentIndex - SQUARES_WIDTH;
        break;
      case DOWN:
        newIndex = currentIndex + SQUARES_WIDTH;
        break;
      case LEFT:
        newIndex = currentIndex - 1;
        break;
      case RIGHT:
        newIndex = currentIndex + 1;
        break;
      default:
        // This could be a click event, not a keyboard arrow event.
        newIndex = this.state.squares.findIndex( square => {
          return square.id === parseInt(event.target.id);
        });
        break;
    }

    // If it wasn't a click or an arrow key, do nothing.
    if ( !newIndex ) return;

    this.setState({
      squares: this.state.squares.slice().swap(currentIndex, newIndex)
    });
  }

  paintSquare(element, node) {
    // For visual flair, we're going to colour the tiles as they pass under us.
    // We'll do this by adding a state to the square, and we'll delay it so
    // that it happens while the Fuscia Square is covering it.

    // Don't paint the Fuscia square!
    if ( element.props.red ) return;

    // Wait half the duration of the FlipMove animation, and then paint it!
    setTimeout(() => node.classList.add('painted'), FLIP_DURATION / 6)
  }

  startMove(element, node) {
    this.paintSquare(element, node);
  }

  render() {
    return (
      <div id="square">
        <div className="board">
          <FlipMove
            duration={FLIP_DURATION}
            easing="cubic-bezier(.12, .36, .14, 1.2)"
            onStart={this.startMove.bind(this)}
          >
            { this.renderSquares() }
          </FlipMove>
        </div>
      </div>
    );
  }
};


export default Puzzle_Einstein;
