import React, { useState, useRef, useCallback } from 'react'
import './style.css'
import useBookSearch from './useBookSearch'
import ProjectFooter from './ProjectFooter'
import { scrollTo } from '../../GlobalScrollTo';
import { LinearProgress, TextField, Button } from '@material-ui/core'
import { v4 as uuidV4 } from 'uuid'
import Modal from './Modal'
import CloseIcon from '@material-ui/icons/Close';
import Favorites from './Favorites'

export default function OpenLibrarySearch() {
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [modal, setModal] = useState(false)
    const [bookDetail, setBookDetail] = useState({})

    const {
        books,
        hasMore,
        loading,
        error
    } = useBookSearch(query, pageNumber)

    const observer = useRef()

    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
        scrollTo(0)
    }

    function openModal(bookKey, bookAuthor, bookYear, bookCover) {
        setBookDetail({ bookKey, bookAuthor, bookYear, bookCover })
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }

    return (
        <div data-scope-openlib className='container'>
            <div className='top'>
                <TextField style={{width: '60%'}} value={query} onChange={handleSearch} label="Search the library..." />
                <Button size="small" color='primary' onClick={() => {setQuery(''); scrollTo(0)}}><CloseIcon className='clearX' /></Button>
            </div>
            
            <div className='results'> 
                {books.map((book, index) => {
                    let display = 
                        <div className='book-row' onClick={() => openModal(book.key, book.author_name, book.first_publish_year, book.cover_i)}>
                            <div><img alt={`Thumbnail for ${book.title}`} src={`http://covers.openlibrary.org/b/ID/${book.cover_i}-S.jpg`} /></div>
                            <div className='book-title'>{book.title}</div>
                            <div className='book-author'><span>Author</span> {book.author_name && book.author_name.join(', ')}</div>
                            <div className='book-date'><span>First Publish Year</span> {book.first_publish_year && book.first_publish_year}</div>
                            {/* <div className='book-date'><span>Published</span> {[book.publish_date.map(d => d).join(', ')]}</div> */}
                            <div className='book-resultnum'>{index + 1}</div>
                        </div>

                    if (books.length === index + 1) {
                        return <div ref={lastBookElementRef} key={uuidV4()}>{display}</div>
                    } else {
                        return <div key={uuidV4()}>{display}</div>
                    }
                })}
                {
                    loading && 
                    query !== '' &&
                    <div style={{padding: '20px 0'}}>
                        <span style={{display: 'inline-block', padding: '8px 0'}}> Loading... </span>
                        <LinearProgress />
                    </div>
                }

                <div>
                    {error && <Button onClick={() => setPageNumber(1)}>Reset</Button>}
                </div>
                
                <div className={query === '' ? '' : 'hide'}><Favorites openModal={openModal} /></div>

            </div>

            <ProjectFooter />

            {modal && <Modal closeModal={closeModal} bookDetail={bookDetail} />}

            
        </div>
    )
}