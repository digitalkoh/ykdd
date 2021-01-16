import React, { useState } from 'react'
import FadeIn from 'react-fade-in';
import { useQuery } from './ContextProvider'

export default function SongList({ data }) {
    const [songInfo, setSongInfo] = useState(null)
    const { query } = useQuery()

    function getLyric(songTitle) {
        data.map(song => {
            return song.title === songTitle && setSongInfo({ ...song })
        })
    }

    if (songInfo !== null) {
        const lyric = songInfo.lyric.split('--')

        return (
            <FadeIn transitionDuration={800}>
                <div>
                    Title: {songInfo.title}, Album: {songInfo.album}, {songInfo.albumYear}
                    <br />
                    <button onClick={() => {setSongInfo(null)}}>X</button>
                    <br />
                    <div>
                        {lyric.map((lyricline, idx) => {
                            return (
                                <div key={idx} className='lyrics'>
                                    {lyricline}<br />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </FadeIn>
        )
    } else {
        return (
            <div className='songListContainer'>
                {query !== '' && 
                    data.map((song, idx) => {
                        return song.album === query && <FadeIn transitionDuration={300} key={idx}><div className='songs' onClick={() => {getLyric(song.title)}}>{song.title}</div></FadeIn>
                    })
                }
            </div>
        )
    }
}