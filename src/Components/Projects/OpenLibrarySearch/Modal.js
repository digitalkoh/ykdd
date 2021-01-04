import React, { useEffect } from 'react'
import axios from 'axios'

export default function Modal({ closeModal, bookKey }) {

    function handleClose() {
        closeModal()
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://openlibrary.org${bookKey}.json`
        }).then(res => {

            // return [...new Set([...prevBooks, ...res.data.docs])]

            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [bookKey])

    return (
        <div className="book-modalContainer"
            onClick={handleClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: "rgba(0, 0, 0, 0.24)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                className="book-modal"
                style={{
                    position: "absolute",
                    background: "#fff",
                    padding: '20px',
                    border: "2px solid #444",
                }}
            >
                <h1>Test Modal</h1>
                {bookKey}
                {console.log(`https://openlibrary.org${bookKey}.json`)}
                <button type="button" onClick={handleClose}>
                Close
                </button>
            </div>
        </div>
    );
}
