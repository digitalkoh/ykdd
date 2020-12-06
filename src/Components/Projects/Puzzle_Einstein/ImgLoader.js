import React, { Component } from 'react';
import imgData from '../../../Data/images.json';

class ImgLoader extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        // Initial image to load
        this.props.onImgChange('ein')
    }

    // Send value to parent component via props
    handleClick = (img) => {
        this.props.onImgChange(img)
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {imgData.images.map(i =>
                    <div className="bt-imgSelect" style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/` + i + `.jpg )`}} onClick={() => this.handleClick(i)}></div>
                )}   
            </div>
        );
    }
}

export default ImgLoader;