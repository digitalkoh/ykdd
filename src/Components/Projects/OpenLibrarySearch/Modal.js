import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';

export default function Modal({ closeModal, bookDetail }) {
    const [moreDetail, setMoreDetail] = useState({})

    // Object destructuring.
    const {
        bookKey,
        bookAuthor,
        bookYear,
        bookCover
    } = bookDetail

    function handleClose() {
        closeModal()
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://openlibrary.org${bookKey}.json`
        }).then(res => {
            // returns '/works/OLxxxxxxx'
            setMoreDetail({ ...res.data })
        }).catch((err) => {
            console.log(err)
        })
    }, [bookKey])

    return (
        <div className="book-modalContainer" onClick={handleClose}>
            <div className="book-modal" onClick={e => e.stopPropagation()}>
                <div className='modalHeader'><button className='closeBt' type="button" onClick={handleClose}><CloseIcon className='closeX' /></button></div>

                <div className='book-detail-wrapper'>
                    <div className='book-cover'><img alt={`Thumbnail for ${moreDetail.title && moreDetail.title}`} src={`http://covers.openlibrary.org/b/ID/${bookCover}-L.jpg`} /></div>
                    {moreDetail.title && <div className='book-title'>{moreDetail.title}</div>}
                    {moreDetail.subtitle && <div className='book-sub'>{moreDetail.subtitle}</div>}
                    {bookAuthor && <div className='book-author'><span>Author</span> {bookAuthor.join(', ')}</div>}
                    {bookYear && <div className='book-date'><span>First Publish Year</span> {bookYear}</div>}
                    {moreDetail.description && <div className='book-desc'><span>Description</span> {moreDetail.description.value}</div>}
                    {moreDetail.subjects && <div className='book-subject'><span>Subjects</span> {moreDetail.subjects.join(', ')}</div>}
                    {/* <div className='book-link'><a href={`https://openlibrary.org${moreDetail.key}/`} >Open Library Link</a></div> */}
                </div>
            </div>
        </div>
    );
}
