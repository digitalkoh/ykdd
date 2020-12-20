import * as React from  'react'
const { useState } = React;
const { useEffect } = React;

export const Light = ({start, value, color, size, xpos, ypos, idx, lit}) => {
    console.log(start)
    const [blink, setBlink] = useState(lit);
    
    const bgcolor = 
        color === 'red' ? 'radial-gradient(circle, red, yellow)' :
        color === 'green' ? 'radial-gradient(circle, green, yellow)' : 
        color === 'blue' ? 'radial-gradient(circle, blue, yellow)' : 'radial-gradient(circle, red, yellow)';

    const lightSyles = {
        transform: 'translate(' + xpos + 'px, ' + ypos + 'px)',
        backgroundColor: blink ? color : '#fff',
        width: size + 'px',
        height: size + 'px',
        border: 'solid 4px #ccc',
        backgroundImage: blink ? bgcolor : 'none',
        position: 'absolute',
        borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '24px', fontFamily: 'arial'
    };

    
    

    const lightup = () => {
        if(start) {
            var interval1 = setInterval(function(){setBlink(false)}, 500);
            var interval2 = setInterval(function(){setBlink(true)}, 1000);
        } else {
            clearInterval(interval1);
            clearInterval(interval2);
            setBlink(false)
        }
    }
    

    useEffect(() => {
        lightup();
    }, [start])


    return (
        <>
            <div data-key={idx} className="lightBulb" style={{...lightSyles}}>{'$' + value}</div>
        </>
    )
}