import React, { Component } from 'react';

import './3dbutton.scss';

export default class ThreeDButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
        let twist = document.getElementsByClassName("twist");
        for(let i = 0; i < twist.length; i++){
            twist[i].width="25%";
            twist[i].width = twist[i].width + "3px";
        }
    }

    render() {
        return (
            <div>
                <div href="#" className={"boton"} onClick={this.props.onSubmit}>
                    
                    <div className={"botontext"}>{this.props.text}</div>
                    <div className={"botontext"}>{this.props.text}</div>

                    <span className={"twist"}></span>
                    <span className={"twist"}></span>
                    <span className={"twist"}></span>
                    <span className={"twist"}></span>
                </div>
            </div>
        );
    }
}