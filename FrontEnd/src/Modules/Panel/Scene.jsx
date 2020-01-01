import React, { Component } from 'react';

import './Scene.scss';

import SceneScholar from './SceneScholar';

import sceneImage from '../../assets/Scene/scene_openPNG.png';
import sceneImageClose from '../../assets/Scene/scene_closePNG.png';
import openSceneAnimation from '../../assets/Scene/scene_openGIF.gif';
import closeSceneAnimation from '../../assets/Scene/scene_closeGIF.gif';

export default class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaveScene:false,
            hovering: false
        }
    }

    componentDidMount = () => {
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    changeCursor = () => {
        this.setState({
            hovering: true
        }, () => {
            let circle = document.getElementById("cursor-circle");
            circle.classList.remove("base-color");
            circle.classList.add("none-color");
        });
    }
    changeCursor2 = () => {
        this.setState({
            hovering: false
        }, () => {
            let circle = document.getElementById("cursor-circle");
            circle.classList.remove("none-color");
            circle.classList.add("base-color");
        });
    }

    render() {
        let condOpen = (!this.props.isOpened && !this.props.closeAnimationExec) || (this.props.isOpened && this.props.openAnimationExec && !this.props.closeAnimationExec);
        let condClose = (this.props.isOpened && !this.props.openAnimationExec) || (!this.props.isOpened && !this.props.openAnimationExec && this.props.closeAnimationExec);
        return (
            <div id={"scene"}>
                <img id={"scene-background"} src={this.props.isOpened ? sceneImage : sceneImageClose} alt={"scene-background"} onMouseOver={this.changeCursor}
                    onMouseLeave={this.changeCursor2} />

                <img src={(condOpen ? openSceneAnimation : (condClose ? closeSceneAnimation : "")) + "?id=" + this.props.number}
                    alt={"scene-animation"} id={"scene-animation"} />

                <SceneScholar data={1} handleLoading={this.props.handleLoading} handleNotification={this.props.handleNotification} visible={this.props.opened[1]} 
                    notification={this.props.notification[1]} dismissPopover={this.props.dismissPopover}></SceneScholar>

            </div>
        );
    }
}