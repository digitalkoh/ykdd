import React, { Component } from 'react';

class Paginator extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    // Send value to parent component via props
    handleClick = (num, msg) => {
        this.props.handlePaginate(num, msg)
    }

    render() {
        return (
            <div className='pagination'>
                <div><label>Page</label> {this.props.roverInfo.length > 0 ? this.props.nextPageNumber : 'unavailable'}</div>
                {
                    this.props.nextPageNumber > 1 ? 
                    <button onClick={() => this.handleClick(this.props.nextPageNumber - 1, 'No images available on this page.')}>Previous Page</button> 
                    : 
                    <button disabled >Previous Page</button>
                }
                {
                    this.props.roverInfo.length > 0 ? 
                    <button onClick={() => this.handleClick(this.props.nextPageNumber + 1, `End of images on sol ${this.props.sol}.`)}>Next Page</button>
                    : 
                    <button disabled >Next Page</button>
                }
            </div>
        );
    }
}

export default Paginator;