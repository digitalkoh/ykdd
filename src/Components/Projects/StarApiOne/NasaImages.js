import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const hoverInfoStyle = {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .6))',
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: '-12px',
    padding: '22px',
    color: '#bbb',
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: '.96em',
    transition: '.4s',
    opacity: '0',
    cursor: 'pointer'
};

class NasaImages extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgIndex: 0,
            isOpen: false
        };
        this.handleHover = this.handleHover.bind(this);
    }

    handleHover(id, entered){
        let curDiv = document.querySelector(`#imgdiv${id}`);
        if(entered) {
            curDiv.style.opacity = '1';
            curDiv.style.bottom = '0';
        } else {
            curDiv.style.opacity = '0';
            curDiv.style.bottom = '-12px';
        }
    }

    render() {
        // So I don't have to type this.state all the time...
        const { imgIndex, isOpen } = this.state;
        const imglist = this.props.roverInfo.map((roverInfo) => (
                [roverInfo.img_src]
        ));

        return (
            <div id="nasaimages">
                {
                    this.props.roverInfo.map((roverInfo, idx) => (
                        <div 
                            className='imgContainer' 
                            key={idx} 
                            onMouseEnter={() => {this.handleHover(idx, true)}} 
                            onMouseLeave={() => {this.handleHover(idx, false)}}
                            onClick={() => {
                                this.setState({ isOpen: true });
                                this.setState({ imgIndex: idx });
                                // console.log(roverInfo)
                            }}
                        >
                            <div id={`imgdiv${idx}`} style={{...hoverInfoStyle}}>
                                {roverInfo.camera.full_name}<br />({roverInfo.camera.name})<br />Image ID: {roverInfo.id}
                            </div>
                            <img alt="NASA" src={roverInfo.img_src} />
                        </div>  
                    ))
                }
                {isOpen && (
                    <Lightbox
                        wrapperClassName={'NasaModalWrapper'}
                        mainSrc={imglist[imgIndex]}
                        nextSrc={imglist[(imgIndex + 1) % imglist.length]}
                        prevSrc={imglist[(imgIndex + imglist.length - 1) % imglist.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                imgIndex: (imgIndex + imglist.length - 1) % imglist.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                imgIndex: (imgIndex + 1) % imglist.length,
                            })
                        }
                        animationOnKeyInput={true}
                        imageTitle={
                            [
                                this.props.roverInfo[imgIndex].camera.full_name,
                                ` (${this.props.roverInfo[imgIndex].camera.name}),`,
                                ` ID: ${this.props.roverInfo[imgIndex].id},`,
                                ` SOL: ${this.props.roverInfo[imgIndex].sol},`,
                                ` Earth Date: ${this.props.roverInfo[imgIndex].earth_date},`,
                                ` Rover: ${this.props.roverInfo[imgIndex].rover.name}`
                            ]
                        }
                    />
                )}

                {this.props.noImg && <p className='message'>{this.props.clickedWith}</p>}
            </div>
        );
    }
}

export default NasaImages;