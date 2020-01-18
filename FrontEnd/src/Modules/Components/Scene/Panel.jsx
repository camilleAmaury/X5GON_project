import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';

import './Panel.css';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PanelBox:{
                width:0,
                height:0
            }
        }
    }

    componentDidMount = () => {
        let panel = document.getElementById("Panel");
        this.setState({
            PanelBox:{
                width:panel.clientWidth,
                height:panel.clientHeight
            }
        });
    }

    render() {
        console.log(this.state.PanelBox)
        return (
            <div id={"Panel"}>
                <Navbar PanelBox={this.state.PanelBox}></Navbar>
            </div>
        );
    }
}