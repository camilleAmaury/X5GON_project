import React, { Component } from 'react';

import './cursor.scss';

import getMousePosition from "../../Functions/Position/MousePosition";

export default class Cursor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x : 0,
            y : 0
        }
    }

    componentDidMount = () => {
        document.addEventListener("mousemove", this.movement);
        let circle = document.getElementById("cursor-circle");
        circle.style.left = this.state.x+ 'px';
        circle.style.top = this.state.y +'px';
    }

    movement = event => {
        event.preventDefault();
        let circle = document.getElementById("cursor-circle");
        let classList = circle.classList;
        if(!classList.contains("hover-cursor") && !classList.contains("hover-out-cursor")){
            let pos = getMousePosition(event);
            this.setState({
                x:pos.x,
                y:pos.y
            }, () =>{
                circle.style.left = (this.state.x - circle.offsetWidth/2) +'px';
                circle.style.top = (this.state.y - circle.offsetHeight/2) +'px';
            });
        }
    }

    render() {
        return (
            <div id={"cursor-circle"}></div>
        );
    }
}