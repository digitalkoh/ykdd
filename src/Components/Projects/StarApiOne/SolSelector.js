import React, { Component } from 'react';

class SolSelector extends Component {
    constructor(props) {
        super(props);
        this.handleSolMax = this.handleSolMax.bind(this);
        this.handleSolNav = this.handleSolNav.bind(this);
        this.jumpToInput = React.createRef();
    };

     // Jump to Sol ==========================================================
    jumpToSol = e => {
        e.preventDefault();
        const path = this.props.manifestInfo[0];
        const maxsol = path.max_sol;
        let gotonum = parseInt(this.jumpToInput.current.value);
        gotonum > maxsol && alert(`Sol date cannot be greater than the total number of sol days ${path.name} was on Mars. ${path.name} was on mars for ${maxsol} sol days.`);
        gotonum <= maxsol && this.handleJSolump(gotonum, true);
    }

    // =============== Send value to parent component via props ============
    handleJSolump = (num, reset) => {
        this.props.handleSolJump(num, reset);
        this.jumpToInput.current.value = null
    }

    handleSolMax = (sol, reset) => {
        this.props.handleSolMax(sol, reset)
    }

    handleSolNav = (sol, reset, msg) => {
        this.props.handleSolNav(sol, reset, msg)
    }

    render() {
        return (
            <div className='solSelect'>
                <div><label>Sol</label> {this.props.sol} <span>Solar day on Mars (24h, 39m, 35s)</span></div>
                <div style={{display: 'flex'}}>
                    {
                        this.props.sol > 0 ?  
                        <button onClick={() => this.handleSolNav(this.props.sol - 1, true, `No photo taken on sol ${this.props.sol-1}.`)}>Previous Sol</button> 
                        : 
                        <button disabled >Previous Sol</button>
                    }
                    {   
                        this.props.manifestInfo.length > 0 && 
                        this.props.sol < this.props.manifestInfo[0].max_sol ? 
                        <button onClick={() => this.handleSolNav(this.props.sol + 1, true, `No photo taken on sol ${this.props.sol+1}.`)}>Next Sol</button> 
                        : 
                        <button disabled >Next Sol</button>
                    }
                    <button onClick={() => this.handleSolMax(this.props.manifestInfo[0].max_sol, true)}>Most Recent Photos</button>

                    <div>
                        <form onSubmit={this.jumpToSol}>
                            <input type='number' placeholder='Sol #' ref={this.jumpToInput} className='jumpto' />
                            <button>Go</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SolSelector;