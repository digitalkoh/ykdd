
import React from 'react';

export default function ProjectFooter() {
    return  (
        <div className='projectDesc' style={{borderTop: 'solid 1px #333', color: '#777'}}>
            Built with: React / Open Library API / Material UI / Axios
            <div>
                Thanks to <a href="https://openlibrary.org/">Open Library</a> and its <a href="https://openlibrary.org/developers">API</a>.
            </div>
        </div>
    )
}

