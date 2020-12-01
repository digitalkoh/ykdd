import React from 'react';
import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { moveKnight } from './Game';
import { ItemTypes } from './ItemTypes';
import { Overlay } from './Overlay';

export const BoardSquare = ({ x, y, children, }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.KNIGHT,
        //canDrop: () => canMoveKnight(x, y),
        drop: () => moveKnight(x, y),
        // collect: (monitor) => ({
        //     isOver: !!monitor.isOver(),
        //     canDrop: !!monitor.canDrop(),
        // }),
    });

    const black = (x + y) % 2 === 1;

    return (
        <div ref={drop} style={{
            position: 'relative',
            width: '100%',
            height: '100%',
        }}>
			<Square black={black}>{children}</Square>
			{/* {isOver && !canDrop && <Overlay color="red"/>} */}
			{/* {!isOver && canDrop && <Overlay color="yellow"/>} */}
			{isOver && <Overlay color="green"/>}
		</div>);
};
