import React, { Component } from 'react';

import './cursor.scss';

import getMousePosition from "../../Functions/Position/MousePosition";

export default class Cursor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursorInitSize:{
                width:81,
                height:81
            },
            cursorPosition:{
                top:0,
                left:0
            }
        }
    }

    componentDidMount = () => {
        window.addEventListener("mousemove", this.movement)
        this.props.cursorLoaded();
    }

    movement = event => {
        event.preventDefault();
        let circle = document.getElementById("cursor-circle");
        if(circle !== undefined && circle !== null){
            let classList = circle.classList;
            if (!classList.contains("hover-cursor") && !classList.contains("hover-out-cursor")) {
                let pos = getMousePosition(event);
                setTimeout(() => {
                    if (!classList.contains("hover-cursor") && !classList.contains("hover-out-cursor")) {
                        let width = Math.floor(this.state.cursorInitSize.width*this.props.ratio);
                        let height = Math.floor(this.state.cursorInitSize.height*this.props.ratio);
                        let left = (pos.x - width / 2);
                        let top = (pos.y - this.state.cursorPosition.height / 2);
                        if((pos.x + width / 2) >= this.props.windowSize.width){
                            left -=  (pos.x + width / 2) - this.props.windowSize.width;
                        }
                        if((pos.y + height / 2) >= this.props.windowSize.height){
                            top -= (pos.y + height / 2) - this.props.windowSize.height;
                        }
                        this.setState({
                            cursorPosition:{
                                width:width,
                                height:height,
                                top:top,
                                left:left
                            }
                        });
                    }
                }, 100);
            }
        }
        
    }

    render() {
        let cursorCircle = {
            width:Math.floor(this.state.cursorInitSize.width*this.props.ratio),
            height:Math.floor(this.state.cursorInitSize.height*this.props.ratio),
            top:this.state.cursorPosition.top || 0,
            left:this.state.cursorPosition.left || 0
        }
        return (
            <div id={"cursor-circle"} className={"base-color"} style={{
                width:cursorCircle.width,
                height:cursorCircle.height,
                top:cursorCircle.top,
                left:cursorCircle.left
            }}></div>
        );
    }
}