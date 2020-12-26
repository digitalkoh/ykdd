import React, { Component } from 'react';

class RoverButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    // Send value to parent component via props
    handleClick = (name, reset) => {
        this.props.handleRoverSwitch(name, reset)
    }

    render() {
        return (
            <div>
                <div style={{color: '#777', paddingBottom: '8px'}}>Select Rover</div>
                <div className='buttons'>
                    <button 
                        className={this.props.roverName !== '' && this.props.roverName === 'curiosity' ? 'active' : ''}
                        style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/marsrover-curiosity.jpg )`}}
                        title='Curiosity'
                        onClick={() => this.handleClick('curiosity', true)} >Curiosity</button>
                    <button 
                        className={this.props.roverName !== '' && this.props.roverName === 'opportunity' ? 'active' : ''} 
                        style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/marsrover-opportunity.jpg )`}}
                        title='Opportunity' 
                        onClick={() => this.handleClick('opportunity', true)} >Opportunity</button>
                    <button 
                        className={this.props.roverName !== '' && this.props.roverName === 'spirit' ? 'active' : ''} 
                        style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/marsrover-spirit.jpg )`}} 
                        title='Spirit' 
                        onClick={() => this.handleClick('spirit', true)} >Spirit</button>
                </div>
            </div>
        );
    }
}

export default RoverButton;