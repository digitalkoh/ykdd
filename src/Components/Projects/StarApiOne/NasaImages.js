import React, { Component } from 'react';

class NasaImages extends Component {

    render() {
        return (
            <div id="nasaimages">
                {
                    this.props.roverInfo.map((roverInfo, idx) => (
                        <div className='imgContainer' key={idx}>
                            {/* <div>{roverInfo.camera.full_name}</div> */}
                            <img alt="NASA" src={roverInfo.img_src} />
                        </div>
                    ))
                }

                {this.props.noImg && <p className='message'>{this.props.clickedWith}</p>}
            </div>
        );
    }
}

export default NasaImages;