import React, { Component } from 'react';
import $ from 'jquery';

import './3dbutton.scss';

export default class ThreeDButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
        $(".twist").css("width", "25%").css("width", "+=3px");
    }

    render() {
        return (
            <div>
                <a href="#" className={"boton"} onClick={this.props.onSubmit}>
                    
                    <div className={"botontext"}>{this.props.text}</div>
                    <div className={"botontext"}>{this.props.text}</div>

                    <span className={"twist"}></span>
                    <span className={"twist"}></span>
                    <span className={"twist"}></span>
                    <span className={"twist"}></span>
                </a>
            </div>
        );
    }
}