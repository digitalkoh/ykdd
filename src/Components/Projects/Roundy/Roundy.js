import React, { useState, useEffect } from  'react';
import { Light } from  './Light';
import './style.css'
import { ProjectFooter } from './ProjectFooter';

export default function Roundy() {
    const [start, setStart] = useState()
    const [lit, setLit] = useState()
    const [points, setPoint] = useState(0)
    const [speed, setSpeed] = useState(100)
    const [won, setWon] = useState(false)

    const LIGHTS = [
        {'width' : 60, 'height' : 60, 'posX' : 273, 'posY' : 54, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 354, 'posY' : 70, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 425, 'posY' : 117, 'value' : 20 },
        {'width' : 60, 'height' : 60, 'posX' : 472, 'posY' : 186, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 489, 'posY' : 270, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 472, 'posY' : 351, 'value' : 10 },
        {'width' : 60, 'height' : 60, 'posX' : 425, 'posY' : 422, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 356, 'posY' : 469, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 267, 'posY' : 486, 'value' : 50 },
        {'width' : 60, 'height' : 60, 'posX' : 191, 'posY' : 469, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 120, 'posY' : 422, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 73, 'posY' : 353, 'value' : 10 },
        {'width' : 60, 'height' : 60, 'posX' : 57, 'posY' : 270, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 73, 'posY' : 188, 'value' : 0 },
        {'width' : 60, 'height' : 60, 'posX' : 120, 'posY' : 117, 'value' : 20 },
        {'width' : 60, 'height' : 60, 'posX' : 189, 'posY' : 70, 'value' : 0 }
    ]

    useEffect(() => {
        let count = 0
        let max = 15
        if (lit > 0 && lit <= max) {
            count = lit + 1
        }
        if (start === false) {
            let val = 0
            if (LIGHTS[lit]) val = LIGHTS[lit].value
            
            setPoint(points + val)

            if (points > 50 && points < 100) setSpeed(80)
            if (points > 100 && points < 150) setSpeed(70)
            if (points > 150 && points < 300) setSpeed(50)
            if (points > 300) setSpeed(32)
       }

        let myTimer = setInterval(function(){
            if (start) {
                if (count < max) {
                    setLit(count)
                    count++
                } else {
                    setLit(count)
                    count = 0
                }
            }
        }, speed)

        return () => clearInterval(myTimer)
    }, [start])

    useEffect(() => {
        if (points >= 400) {
            setWon(true)
        }
    }, [points])

    function handleReset() {
        setPoint(0)
        setWon(false)
        setLit()
        setSpeed(100)
        setStart()
    }

    return (
        <div data-cssscope-roundy>
            <div className='lightboard'>
                {LIGHTS.map((light, index) => {
                    return (<Light 
                        key={index} 
                        idx={index} lit={lit} 
                        width={light.width} 
                        height={light.height} 
                        posX={light.posX} 
                        posY={light.posY} 
                        value={light.value} />
                    )})
                }
                {
                    won ? 
                    <div className='points winner'>{points}<div className='pointsTxt'>Winner!</div></div>
                    : 
                    <div className='points'>{points}<div className='pointsTxt'>Points</div></div>
                }
                    
            </div>

            <div className="Rcontrol">
                    {won ? 
                        <button onClick={handleReset}>Reset</button> 
                        :
                        (
                            start ? 
                            <button onClick={() => {setStart(false)}}>Stop</button> 
                            :
                            <button onClick={() => {setStart(true)}}>Start</button>
                        )
                    }
                    
                    <p style={{ padding: '20px', color: '#888'}}>400+ points wins</p>
            </div>

            <ProjectFooter />
        </div>
    )
}

// let handleKeyPress = (e) => {
//     if(e.key === '32'){
//         console.log('enter press here! ')
//     }
// }
// <input type='text' onKeyPress={handleKeyPress} />