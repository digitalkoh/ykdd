import React from 'react'
import { useQuery } from './ContextProvider'

export default function Splash() {
    const { query, changeQuery } = useQuery()

    function handleClick(val) {
        changeQuery(val)
    }

    return (
        <div className='splash'>
            <div className='coverBt' onClick={() => {handleClick('Three Imaginary Boys')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_threeimaginaryboys.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('Kiss Me, Kiss Me, Kiss Me')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_kissme.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('Disintegration')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_disintegration.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('Faith')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_faith.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('Wish')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_wish.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('The Top')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_thetop.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('Pornography')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_pornography.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('Wild Mood Swings')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_wildmoodswings.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('Standing on a Beach')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_comp_standingonabeach.jpg`} />
            </div>
            <div className='coverBt' onClick={() => {handleClick('Join The Dots')}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/cover_comp_jointhedots.jpg`} />
            </div>
        </div>
    )
}
