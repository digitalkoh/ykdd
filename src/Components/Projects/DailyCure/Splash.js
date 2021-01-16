import React from 'react'
import coverdata from './coverart.json'
import { useQuery } from './ContextProvider'

export default function Splash() {
    const { query, changeQuery } = useQuery()

    function handleClick(val) {
        changeQuery(val)
    }

    const songInfo = coverdata.map((item, idx) => {
        return (
            <div key={idx} className='coverBt' onClick={() => {handleClick(item.name)}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/${item.cover}.jpg`} />
            </div>
        )
    })

    return (
        <div className='splash'>
            {songInfo}
        </div>
    )
}
