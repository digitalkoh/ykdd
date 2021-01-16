import React from 'react'
import SearchBar from './SearchBar'
import Carousel from './Carousel'

export default function Header() {
    return (
        <div className='header'>
            <SearchBar />
            <Carousel />
        </div>
    )
}
