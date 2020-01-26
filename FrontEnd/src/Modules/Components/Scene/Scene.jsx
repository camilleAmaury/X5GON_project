import React, { Component } from 'react';

import './Scene.css';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    preparePositions = () => {
        let obj = {};
        // floor
        obj.scene = {
            width: this.props.style.width,
            height: this.props.style.height,
            left: this.props.style.left,
            top: this.props.style.top,
        };
        return obj;
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"scene"} style={
                {
                    top: styles.scene.top,
                    width: styles.scene.width,
                    height: styles.scene.height,
                    left:styles.scene.left
                }
            }></div>
        );
    }
}