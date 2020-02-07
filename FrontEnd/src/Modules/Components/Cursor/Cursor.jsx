import React, { Component } from 'react';

import './Cursor.css';

import getMousePosition from "../../Functions/MousePosition";

export default class Cursor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursorInitSize: {
                width: 50,
                height: 50
            },
            cursorPosition: {
                top: 0,
                left: 0
            }
        }
    }

    componentDidMount = () => {
        window.addEventListener("mousemove", this.movement)
    }

    movement = event => {
        event.preventDefault();
        let circle = document.getElementById("cursor-circle");
        if (circle !== undefined && circle !== null) {
            let pos = getMousePosition(event);
            setTimeout(() => {
                let width = this.state.cursorInitSize.width;
                let height = this.state.cursorInitSize.height;
                let left = (pos.x - width / 2);
                let top = (pos.y - (this.state.cursorPosition.height) / 2);
                if ((pos.x + width / 2) >= this.props.windowSize.width) {
                    left -= (pos.x + width / 2) - this.props.windowSize.width;
                }
                if ((pos.y + height / 2) >= this.props.windowSize.height) {
                    top -= (pos.y + height / 2) - this.props.windowSize.height;
                }
                this.setState({
                    cursorPosition: {
                        width: width,
                        height: height,
                        top: top-2,
                        left: left-2
                    }
                });
            }, 100);
        }

    }

    render() {
        let cursorCircle = {
            width: this.state.cursorInitSize.width,
            height: this.state.cursorInitSize.height,
            top: this.state.cursorPosition.top || 0,
            left: this.state.cursorPosition.left || 0
        }
        return (
            <div id={"cursor-circle"} className={"base-color"} style={{
                width: cursorCircle.width,
                height: cursorCircle.height,
                top: cursorCircle.top,
                left: cursorCircle.left
            }}></div>
        );
    }
}