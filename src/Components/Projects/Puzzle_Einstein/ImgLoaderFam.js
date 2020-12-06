import React, { Component } from 'react';
import imgData from '../../../Data/imagesFam.json';

class ImgLoader extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        // Initial image to load
        this.props.onImgChange('f1')
    }

    // Send value to parent component via props
    handleClick = (img) => {
        this.props.onImgChange(img)
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                {imgData.images.map(i => 
                    {
                        let activeClass = i === this.props.pic ? 'bt-imgSelect active' : 'bt-imgSelect';
                        return <div className={activeClass} style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/` + i + `.jpg )`}} onClick={() => this.handleClick(i)}></div>
                    }
                )}
            </div>
        );
    }
}

export default ImgLoader;