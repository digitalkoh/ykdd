import React, { useState, useEffect } from 'react'
import useLocalStorage from './useLocalStorage';
import { scrollTo } from '../../GlobalScrollTo';
import FadeIn from 'react-fade-in';
import { useQuery } from './ContextProvider'
import EjectIcon from '@material-ui/icons/Eject';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SummaryFooter from './SummaryFooter'
import { v4 as uuidV4 } from 'uuid'

export default function SongList({ data, albumdata }) {
    const [cureTxtStyle, setCureTxtStyle] = useLocalStorage('cureTxtStyle', '');
    const [cureTxtAlign, setCureTxtAlign] = useLocalStorage('cureTxtAlign', '');

    // Used when lyric is displayed
    const [songInfo, setSongInfo] = useState(null)

    // Used for summary info
    const [albumInfo, setAlbumInfo] = useState({})

    // From context provider
    const { query, queryInTitle, queryInLyric, changeQuery, forQueryInTitle, forQueryInLyric } = useQuery()

    function clearQuery() {
        changeQuery('')
        forQueryInTitle(false)
        forQueryInLyric(false)
    }

    const summaryText = () => {
        if (queryInTitle) {
            return 'Song titles containing'
        } else if (queryInLyric) {
            return 'Songs with lyrics containing'
        } else {
            return 'Songs from'
        }
    }

    useEffect(() => {
        setSongInfo(null)
    }, [query])

    const getLyric = (songTitle) => {
        data.map(song => {
            return song.title === songTitle && setSongInfo({ ...song })
        })
    }

    useEffect(() => {
        albumdata.map(item => {
            return item.name === query && setAlbumInfo({ ...item })
        })
    }, [albumdata, query])

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
                    {lyric.map(lyricline => {
                        return (
                            <div key={uuidV4()} className={`lyrics ${cureTxtStyle} ${cureTxtAlign}`}>
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
                        <div className='summary-txtSmall'>{summaryText()}</div>
                        <div className='summary-txtLarge'>
                            {queryInTitle || queryInLyric ? query : albumInfo.name} 
                            {
                                queryInTitle || queryInLyric ? null 
                                :
                                <span style={{ fontWeight: 'normal'}}> ( {albumInfo.year && `${albumInfo.year}, `} {albumInfo.type} )</span>
                            }
                        </div>
                    </div>
                    <div className='button-ico button' onClick={clearQuery}><EjectIcon className='ico-eject' style={{ fontSize: 30 }} />Clear</div>
                </div>

                {queryInTitle || queryInLyric ? 
                    // For lyric or title search
                    data.map(track => {
                        if (queryInTitle) {
                            return (
                                track.title.toUpperCase().includes(query.toUpperCase()) && 
                                <FadeIn transitionDuration={300} key={uuidV4()}>
                                    <div className='songs' onClick={() => {getLyric(track.title); scrollTo(0)}}>{track.title}</div>
                                </FadeIn>
                            )
                        } else if (queryInLyric) {
                            return (
                                track.lyric.toUpperCase().includes(query.toUpperCase()) && 
                                <FadeIn transitionDuration={300} key={uuidV4()}>
                                    <div className='songs' onClick={() => {getLyric(track.title); scrollTo(0)}}>{track.title}</div>
                                </FadeIn>
                            )
                        } else {
                            return null
                        }
                    })
                    :
                    // For album search
                    albumdata.map((item) => {
                        return (
                            item.name === query && 
                            item.tracks.map(track => {
                                return (
                                    <FadeIn transitionDuration={300} key={uuidV4()}>
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