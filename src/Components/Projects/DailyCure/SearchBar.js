import React from 'react'
import { TextField, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

export default function SearchBar() {
    return (
        <div className='search'>
            <TextField className='searchInput' style={{width: '50%'}} value='Search' label="Search..." />
            <Button size="small"><CloseIcon className='clearX' style={{ fontSize: 40 }} /></Button>
        </div>
    )
}
