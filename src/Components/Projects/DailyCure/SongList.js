import React, { useState, useEffect } from 'react'
import useLocalStorage from './useLocalStorage';
import { scrollTo } from '../../GlobalScrollTo';
import FadeIn from 'react-fade-in';
import { useQuery } from './ContextProvider'
import EjectIcon from '@material-ui/icons/Eject';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SummaryFooter from './SummaryFooter'

export default function SongList({ data, albumdata }) {
    const [cureTxtStyle, setCureTxtStyle] = useLocalStorage('cureTxtStyle', '');
    const [cureTxtAlign, setCureTxtAlign] = useLocalStorage('cureTxtAlign', '');
    const [songInfo, setSongInfo] = useState(null)
    const { query, changeQuery } = useQuery()

    function clearQuery() {
        changeQuery('')
    }

    useEffect(() => {
        setSongInfo(null)
    }, [query])

    
    const getLyric = (songTitle) => {
        data.map(song => {
            return song.title === songTitle && setSongInfo({ ...song })
        })
    }

    if (songInfo !== null) {
        const lyric = songInfo.lyric.split('--')

        return (
            <FadeIn className={'songListContainer'} transitionDuration={800}>
                <div className='summary'>
                    <div>
                        <div className='summary-txtLarge'>{songInfo.title}</div> 
                        <div className='summary-txtSmall'>{songInfo.album} ({songInfo.albumYear})</div>
                    </div>
                    <div className='button-ico button' onClick={() => {setSongInfo(null)}}><QueueMusicIcon className='ico-list' style={{ fontSize: 30 }} />Song List</div>
                </div>

                <div className='lyricContainer'>
                    {lyric.map((lyricline, idx) => {
                        return (
                            <div key={idx} className={`lyrics ${cureTxtStyle} ${cureTxtAlign}`}>
                                {lyricline}<br />
                            </div>
                        )
                    })}
                </div>

                <SummaryFooter 
                    songInfo={songInfo} 
                    cureTxtStyle={cureTxtStyle} 
                    setCureTxtStyle={setCureTxtStyle} 
                    cureTxtAlign={cureTxtAlign}
                    setCureTxtAlign={setCureTxtAlign} 
                />
            </FadeIn>
        )
    } else {
        return (
            query && 
            <div className='songListContainer'>
                <div className='summary'>
                    <div>
                        <div className='summary-txtSmall'>Songs from</div>
                        <div className='summary-txtLarge'>{query}</div>
                    </div>
                    <div className='button-ico button' onClick={clearQuery}><EjectIcon className='ico-eject' style={{ fontSize: 30 }} />Clear</div>
                </div>
                {
                    albumdata.map((item) => {
                        return (
                            item.name === query && 
                            item.tracks.map((track, idx) => {
                                return (
                                    <FadeIn transitionDuration={300} key={idx}>
                                        <div className='songs' onClick={() => {getLyric(track); scrollTo(0)}}>{track}</div>
                                    </FadeIn>
                                )
                            })
                        )
                    })
                }
            </div>
        )
    }
}