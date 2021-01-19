import React from 'react'
import data from './data.json'
import albumdata from './coverart.json'
import './style.css'
// import Header from './Header'
import DisplayMain from './DisplayMain'
import { QueryProvider } from './ContextProvider'
import Carousel from './Carousel'
import SongList from './SongList'

export default function DailyCure() {

    return (
        <div data-scope-cure className='bgimg' style={{ backgroundImage: `url( ${process.env.PUBLIC_URL}/img/cure/curebgf.png )` }}>
            {/* <Header /> */}
            
            <QueryProvider>
                <Carousel />
                <DisplayMain>
                    <SongList data={data} albumdata={albumdata} />
                </DisplayMain>
            </QueryProvider>
                
        </div>
    )
}

// const songInfo = data.map((song, idx) => {
//     // JS Split converts sections between the char into new array
//     let lyric = song.lyric.split('--')
//     return (
//         <div key={idx} className='songInfo' style={{padding: '20px', borderBottom: 'solid 1px #ccc'}}>
//             <div style={{fontWeight: 'bold'}}>{song.title}</div>
//             <div style={{fontWeight: 'bold'}}>{song.album} ({song.albumType}, {song.albumYear})</div>
//             <div style={{fontWeight: 'bold'}}>Original year: {song.songYear}</div>
//             <div style={{fontWeight: 'bold'}}>Note: {song.note}</div>
//             <div>
//                 {lyric.map((lyricline, idx) => {
//                     return (
//                         <div key={idx} className='lyrics'>
//                             {lyricline}<br />
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// })