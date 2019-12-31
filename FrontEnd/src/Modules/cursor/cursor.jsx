import React, { Component } from 'react';

import './cursor.scss';

import getMousePosition from "../../Functions/Position/MousePosition";

export default class Cursor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
        document.addEventListener("mousemove", this.movement);
        let circle = document.getElementById("cursor-circle");
        circle.style.left = 0 + 'px';
        circle.style.top = 0 + 'px';
    }

    movement = event => {
        event.preventDefault();
        let circle = document.getElementById("cursor-circle");
        let classList = circle.classList;
        if (!classList.contains("hover-cursor") && !classList.contains("hover-out-cursor")) {
            let pos = getMousePosition(event);
            setTimeout(() => {
                if (!classList.contains("hover-cursor") && !classList.contains("hover-out-cursor")) {
                    let left = (pos.x - circle.offsetWidth / 2);
                    let right = (pos.y - circle.offsetHeight / 2);
                    if((pos.x + circle.offsetWidth / 2) >= document.documentElement.clientWidth){
                        left -=  (pos.x + circle.offsetWidth / 2) - document.documentElement.clientWidth;
                    }
                    if((pos.y + circle.offsetHeight / 2) >= document.documentElement.clientHeight){
                        right -= (pos.y + circle.offsetHeight / 2) - document.documentElement.clientHeight;
                    }
                    circle.style.left = left + 'px';
                    circle.style.top = right + 'px';
                }
            }, 100);
        }
    }

    render() {
        return (
            <div id={"cursor-circle"} className={"base-color"}></div>
        );
    }
}