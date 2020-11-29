import React from 'react'
// import ReactDOM from 'react-dom'
import Example from './example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function DragTest() {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>
        </div>
    )
}
