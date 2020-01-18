import React, { Component } from 'react';

import './Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NavbarBox:{
                height:0,
                width:300,
            }
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <div id={"Navbar"} style={
                {
                    height:this.props.PanelBox.height,
                    width:this.state.NavbarBox.width,
                }
            }>
            </div>
        );
    }
}