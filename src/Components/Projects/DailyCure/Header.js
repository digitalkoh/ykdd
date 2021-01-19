import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useQuery } from './ContextProvider'

export default function Header() {
    const [term, setTerm] = useState('')

    // From context provider
    const { queryInTitle, queryInLyric, changeQuery, forQueryInTitle, forQueryInLyric } = useQuery()

    function handleSearchTtile() {
        changeQuery(term)
        forQueryInTitle(true)
        forQueryInLyric(false)
    }

    function handleSearchLyric() {
        changeQuery(term)
        forQueryInLyric(true)
        forQueryInTitle(false)
    }

    useEffect(() => {
        !queryInTitle && !queryInLyric && setTerm('')
    }, [queryInTitle, queryInLyric])

    // console.log(`q: ${query}, title search: ${queryInTitle}, lyric search: ${queryInLyric}`)

    return (
        <div className='header'>
            <div className='search'>
                    <TextField className='searchInput' style={{width: '40%'}} value={term} onChange={e => {setTerm(e.target.value)}} label="Search..." />
                    <br /><button onClick={handleSearchTtile}>In Song Title</button>
                    <br /><button onClick={handleSearchLyric}>In Song Lyric</button>
                <Button size="small"><CloseIcon className='clearX' style={{ fontSize: 40 }} /></Button>
            </div>
        </div>
    )
}