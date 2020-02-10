import React, { Component } from 'react';

import Knowledge from './Scenes/Knowledge';
import Lectures from './Scenes/Lectures/Lectures';
import Scholar from './Scenes/Scholar/Scholar';

import './Scene.css';

export default class Scene extends Component {
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
            }>
                <Knowledge isOpen={this.props.sceneOpened[1]} scene={styles.scene} ratio={this.props.ratio} setSearch={this.props.setSearch} ref={"knowledge"}></Knowledge>
                <Scholar isOpen={this.props.sceneOpened[3]} scene={styles.scene} ratio={this.props.ratio}></Scholar>
                <Lectures isOpen={this.props.sceneOpened[4]} scene={styles.scene} ratio={this.props.ratio}></Lectures>

            </div>
        );
    }
}