import React, { Component, Fragment } from 'react';

import './Scene.scss';

import SceneScholar from './Scene/SceneScholar';
import SceneKnowledge from './Scene/SceneKnowledge';
import ScenePagoda from './Scene/ScenePagoda';
import Document from './Scene/Document';


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
        let container = document.getElementById("container-panel");
        let centerdiv = {
            height: container.offsetHeight,
            width: container.offsetWidth,
            top:0,
            left:0
        }
        // set scene position
        let scene = document.getElementById("scene");
        let scene_pos = {
            left:(centerdiv.width - scene.offsetWidth)/2,
            top:(centerdiv.height - scene.offsetHeight) - 100,
            width: scene.offsetWidth,
            height: scene.offsetHeight
        }
        scene.style.left = scene_pos.left + "px";
        scene.style.top = scene_pos.top + "px";
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
                    {/* Temporaire */}
                    {/* <Document></Document> */}
                    {/* Temporaire */}

                    <img id={"scene-background"} src={this.props.isOpened ? sceneImage : sceneImageClose} alt={"scene-background"} onMouseOver={this.changeCursor}
                        onMouseLeave={this.changeCursor2} />

                    <img src={(condOpen ? openSceneAnimation : (condClose ? closeSceneAnimation : "")) + "?id=" + this.props.number}
                        alt={"scene-animation"} id={"scene-animation"} />

                    <SceneKnowledge data={0} handleLoading={this.props.handleLoading} handleNotification={this.props.handleNotification} visible={this.props.opened[0]} 
                        notification={this.props.notification[0]} dismissPopover={this.props.dismissPopover}></SceneKnowledge>

                    <SceneScholar data={1} handleLoading={this.props.handleLoading} handleNotification={this.props.handleNotification} visible={this.props.opened[1]} 
                        notification={this.props.notification[1]} dismissPopover={this.props.dismissPopover}></SceneScholar>

                    <ScenePagoda data={2} visible={this.props.opened[2]} dismissPopover={this.props.dismissPopover}></ScenePagoda>
                </div>
            
        );
    }
}