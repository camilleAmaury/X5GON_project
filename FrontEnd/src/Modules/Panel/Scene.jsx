import React, { Component } from 'react';

import './Scene.scss';

import intersects from '../../Functions/Position/intersects';

import SceneScholar from './Scene/SceneScholar';
import SceneKnowledge from './Scene/SceneKnowledge';
import ScenePagoda from './Scene/ScenePagoda';
// import Document from './Scene/Document';

import sceneImage from '../../assets/Scene/scene_openPNG.png';
import sceneImageClose from '../../assets/Scene/scene_closePNG.png';
import openSceneAnimation from '../../assets/Scene/scene_openGIF.gif';
import closeSceneAnimation from '../../assets/Scene/scene_closeGIF.gif';

export default class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            innerScenePosition: {
                width: 848,
                height: 480
            },
            leaveScene: false,
            hovering: false,
            scenePosition: {
                width: 0,
                height: 0
            },
            sceneTop: 0
        }
    }

    componentDidMount = () => {
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

    cursorManagement = (div) => {
        if(this.props.cursorLoaded){
            let cursor = document.getElementById("cursor-circle");
            console.log(this.props.mousePosition)
            console.log(div)
            console.log(intersects(this.props.mousePosition, div))
            if(intersects(this.props.mousePosition, div)){
                cursor.style.zIndex = 1;
            }else{
                cursor.style.zIndex = 12;
            }
        }
    }

    render() {
        let sceneWidth = Math.floor(this.state.innerScenePosition.width * this.props.ratio);
        let sceneHeight = Math.floor(this.state.innerScenePosition.height * this.props.ratio);
        let scenePosition = {
            left: isNaN((this.props.windowSize.width - sceneWidth) / 2) ? 0 : (this.props.windowSize.width - sceneWidth) / 2,
            top: isNaN((this.props.windowSize.height - sceneHeight) - 100) ? 0 : (this.props.windowSize.height - sceneHeight) - 100,
            width: sceneWidth,
            height: sceneHeight
        };
        this.cursorManagement(scenePosition);
        let condOpen = (!this.props.isOpened && !this.props.closeAnimationExec) || (this.props.isOpened && this.props.openAnimationExec && !this.props.closeAnimationExec);
        let condClose = (this.props.isOpened && !this.props.openAnimationExec) || (!this.props.isOpened && !this.props.openAnimationExec && this.props.closeAnimationExec);
        return (
            <div id={"scene"} style={{ left: scenePosition.left, top: scenePosition.top }} onMouseOver={this.changeCursor}
                onMouseLeave={this.changeCursor2}>
                {/* Temporaire */}
                {/* <Document></Document> */}
                {/* Temporaire */}

                <img id={"scene-background"} src={this.props.isOpened ? sceneImage : sceneImageClose} alt={"scene-background"} style={
                    {
                        width: scenePosition.width,
                        height: scenePosition.height
                    }
                } />

                <img src={(condOpen ? openSceneAnimation : (condClose ? closeSceneAnimation : "")) + "?id=" + this.props.number}
                    alt={"scene-animation"} id={"scene-animation"}
                    style={
                        {
                            width: scenePosition.width,
                            height: scenePosition.height
                        }
                    } />

                <SceneScholar data={1} handleLoading={this.props.handleLoading} handleNotification={this.props.handleNotification} visible={this.props.opened[1]}
                    notification={this.props.notification[1]} dismissPopover={this.props.dismissPopover} mousePosition={this.props.mousePosition}></SceneScholar>


                <SceneKnowledge data={0} handleLoading={this.props.handleLoading} handleNotification={this.props.handleNotification} visible={this.props.opened[0]}
                    notification={this.props.notification[0]} dismissPopover={this.props.dismissPopover}></SceneKnowledge>

                <ScenePagoda data={2} visible={this.props.opened[2]} dismissPopover={this.props.dismissPopover}></ScenePagoda>
            </div>
        );
    }
}