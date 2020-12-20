import React from  'react';
import { Light } from  './Light';
import './roundy.css';

const { useState } = React;
// const { useRef } = React;
// const { useEffect } = React;



const Roundy = () => {

    const [start, setStart] = useState(false);

    const startRoll = () => {
        setStart(value => !value);
    };

    return (
        <div data-cssscope-roundy>
            <div className='lightboard' style={{position: 'relative', width: '600px', height: '540px', border: '1px #ccc solid'}}>
                <Light start={start} lit={false} idx={1} value={50} color={'green'} size={60} xpos={270} ypos={0} />
                <Light start={start} lit={false} idx={2} value={0} color={'red'} size={60} xpos={390} ypos={100} />
                <Light start={start} lit={false} idx={3} value={0} color={'red'} size={60} xpos={490} ypos={250} />
                <Light start={start} lit={false} idx={4} value={0} color={'red'} size={60} xpos={390} ypos={350} />
                <Light start={start} lit={false} idx={5} value={50} color={'green'} size={60} xpos={270} ypos={450} />
                <Light start={start} lit={false} idx={6} value={0} color={'red'} size={60} xpos={150} ypos={350} />
                <Light start={start} lit={false} idx={7} value={0} color={'red'} size={60} xpos={60} ypos={250} />
                <Light start={start} lit={false} idx={8} value={0} color={'red'} size={60} xpos={150} ypos={100} />
            </div>

            <div className="controls">
                <button onClick={() => startRoll()}>Start</button>
                <div clasName="testing">xxx</div>
            </div>
        </div>
    )
}

export default Roundy;