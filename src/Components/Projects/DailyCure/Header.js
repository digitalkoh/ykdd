import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useQuery } from './ContextProvider'

export default function Header() {
    const [term, setTerm] = useState('')
    const [warning, setWarning] = useState({display: 'none'})

    // From context provider
    const { queryInTitle, queryInLyric, changeQuery, forQueryInTitle, forQueryInLyric } = useQuery()

    function handleSearchTtile() {
        if (term !== '' && term.length > 2) {
            changeQuery(term)
            forQueryInTitle(true)
            forQueryInLyric(false)
            setWarning({display: 'none'})
        } else {
            setWarning({display: 'block'})
        }
    }

    function handleSearchLyric() {
        if (term !== '' && term.length > 2) {
            changeQuery(term)
            forQueryInLyric(true)
            forQueryInTitle(false)
            setWarning({display: 'none'})
        } else {
            setWarning({display: 'block'})
        }
    }

    useEffect(() => {
        !queryInTitle && !queryInLyric && setTerm('')
    }, [queryInTitle, queryInLyric])

    // console.log(`q: ${query}, title search: ${queryInTitle}, lyric search: ${queryInLyric}`)

    return (
        <div className='header'>
            <div className='search'>
                    <TextField className='searchInput' value={term} onChange={e => {setTerm(e.target.value)}} label="Search..." />
                    <div className='alert' style={warning}>Please type more than two letters.</div>
                    <div className='searchHelper'>
                        <div className='button' onClick={handleSearchTtile}>In Song Title</div>
                        <div className='button' onClick={handleSearchLyric}>In Song Lyric</div>
                    </div>
                {
                term === '' ? 
                <CloseIcon 
                    onClick={() => {setWarning({display: 'none'})}} 
                    className='clearX' 
                    style={{ fontSize: 40 }} 
                />
                :
                <CloseIcon 
                    onClick={() => {
                            forQueryInTitle(false); forQueryInLyric(false); setTerm(''); changeQuery(''); setWarning({display: 'none'})
                        }
                    } 
                    className='clearX' 
                    style={{ fontSize: 40 }} 
                />
                }
            </div>
        </div>
    )
}