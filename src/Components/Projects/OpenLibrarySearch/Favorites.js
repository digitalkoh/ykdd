import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidV4 } from 'uuid'

const favBooksList = [
    'OL5749849W',   // Blink
    'OL15992072W',  // Thinking, fast and slow
    'OL16025743W',  // Emotional design
    'OL5749847W',   // Outliers
    'OL5749848W',   // The Tipping Point
    'OL15840192W',  // Stumbling on Happiness
    'OL3510333W',   // The Total Package
    'OL272375W',    // The Paradox of Choice
    'OL17156280W',  // The Design of Everyday Things
    'OL2975855W',   // How to lie with statistics
    'OL16046325W',  // I'm feeling lucky
    'OL5749846W',   // What the Dog Saw
    'OL20335406W',  // Talking to Strangers
    'OL16809805W',  // David and Goliath
    'OL16700318W',  // The Signal and the Noise
    'OL9302660W',   // Predictably Irrational
    'OL3936258W',   // Nudge
    'OL3252235W',   // The machine that changed the world
    'OL20441131W',  // Living With Complexity
    'OL15413979W',  // The price of everything
    'OL19713151W',  // The subtle art of not giving a f*ck
    'OL15999455W',  // Incognito
    'OL8454093W',   // The Halo Effect
    'OL19168915W',  // Citizen Coke: The Making of Coca-Cola Capitalism
    'OL20498896W',  // Never Split the Difference
    'OL3510570W',   // The Mythical Man-Month
    'OL4275330W',   // Your money or your life
    'OL15103175W',  // Design literacy
    'OL21163225W',  // Don't Make Me Think, Revisited
    'OL1168091W',  // 1984
    'OL16117414W',  // I want my MTV
    'OL514606W',  // The Pleasure of Finding Things Out and the Meaning of It All
]

export default function Favorites({ openModal }) {
    const [favBoook, setFavBook] = useState([])

    useEffect(() => {
        favBooksList.forEach(
            item => {
                axios({
                    method: 'GET',
                    url: 'http://openlibrary.org/search.json',
                    params: { q: item },
                }).then(res => {
                    setFavBook(prevBooks => {
                        return [...prevBooks, ...res.data.docs]
                    })
                    // console.log(res.data)
                }).catch(e => {
                    console.log(e)
                })
            }
        )
    }, [])

    function handleClick(bookKey, bookAuthor, bookYear, bookCover) {
        openModal(bookKey, bookAuthor, bookYear, bookCover)
    }

    return (
        <div className="favBook">
            {favBoook.map((book) => {
                return (
                    <div key={uuidV4()} className='book-row' onClick={() => handleClick(book.key, book.author_name, book.first_publish_year, book.cover_i)}>
                        <img alt={`Thumbnail for ${book.title}`} src={`http://covers.openlibrary.org/b/ID/${book.cover_i}-M.jpg`} />
                        {/* <div className='book-title'>{book.title}</div> */}
                        <div className='book-author'>{book.author_name && book.author_name.join(', ')}</div>
                        <div className='book-date'>{book.first_publish_year && book.first_publish_year}</div>
                    </div>
                )
            })}
        </div>
    )
}