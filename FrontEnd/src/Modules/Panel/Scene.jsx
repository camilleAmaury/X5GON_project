import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import './Scene.scss';

import getDivPosition from '../../Functions/Position/DivPosition';

import sceneImage from '../../assets/Scene/scene_openPNG.png';
import sceneImageClose from '../../assets/Scene/scene_closePNG.png';
import openSceneAnimation from '../../assets/Scene/scene_openGIF.gif';
import closeSceneAnimation from '../../assets/Scene/scene_closeGIF.gif';

import ScholarBehind from '../../assets/Scene/scholar/sceneScholarBehind.png';
import ScholarCharacter from '../../assets/Scene/scholar/sceneScholarCharacter.png';
import ScholarSeeking from '../../assets/Scene/scholar/sceneScholarSeeking.png';
import ScholarAnswer from '../../assets/Scene/scholar/sceneScholarAnswer.png';
import ScholarHover from '../../assets/Scene/scholar/sceneScholarHoverScholar.png';

export default class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false,
            hoveringCharacter: false,
            clickedCharacter: false,
            waitingData: false,
            isAnswering: false,
            answerText: ""
        }
    }

    componentDidMount = () => {
        // position the character hover block at the right position
        let blockhover = document.getElementById("scene-block-character");
        let scene = document.getElementById("scene");
        let pos = getDivPosition(scene);
        blockhover.style.left = pos.left + 138 + "px";
        blockhover.style.top = pos.top + 144 + "px";
        // this.setState({hoveringCharacter:true});
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

    hoverCharacter = () => {
        let hover = document.getElementById("scene-hover-character");
        hover.style.visibility = "visible";
        this.setState({ hoveringCharacter: true });
    }

    leaveCharacter = () => {
        let hover = document.getElementById("scene-hover-character");
        hover.style.visibility = "hidden";
        this.setState({ hoveringCharacter: false });
    }

    clickCharacter = () => {
        this.setState({
            clickedCharacter: !this.state.clickedCharacter,
            isAnswering: false
        });
    }

    leaveScene = () => {
        this.setState({
            clickedCharacter: false
        });
    }

    askQuestion = () => {
        // pass to a thinking state --> waiting for data
        this.setState({
            waitingData: true,
            isAnswering: false,
            clickedCharacter: false,
            hoveringCharacter: true
        }, () => {
            // delete on click

            setTimeout(() => {
                this.setState({
                    waitingData: false,
                    clickedCharacter: false,
                    hoveringCharacter: false,
                    isAnswering: true,
                    answerText: "No server response - error"
                }, () => {
                    // add on click
                });
            }, 5000);
        });
    }

    render() {
        let condOpen = (!this.props.isOpened && !this.props.closeAnimationExec) || (this.props.isOpened && this.props.openAnimationExec && !this.props.closeAnimationExec);
        let condClose = (this.props.isOpened && !this.props.openAnimationExec) || (!this.props.isOpened && !this.props.openAnimationExec && this.props.closeAnimationExec);
        return (
            <div id={"scene"} onMouseLeave={this.leaveScene}>
                <img id={"scene-background"} src={this.props.isOpened ? sceneImage : sceneImageClose} alt={"scene-background"} onMouseOver={this.changeCursor}
                    onMouseLeave={this.changeCursor2} />

                <img src={(condOpen ? openSceneAnimation : (condClose ? closeSceneAnimation : "")) + "?id=" + this.props.number}
                    alt={"scene-animation"} id={"scene-animation"} />

                <img src={ScholarBehind}
                    alt={"scene-behind"} id={"scene-behind"} />

                <img src={ScholarHover}
                    alt={"scene-hover-character"} id={"scene-hover-character"} />

                <img src={this.state.waitingData ? ScholarSeeking : this.state.isAnswering ? ScholarAnswer : ScholarCharacter}
                    alt={"scene-character"} id={"scene-character"} />

                <div id={"scene-block-character"} onMouseEnter={this.hoverCharacter} onMouseLeave={this.leaveCharacter} onClick={this.clickCharacter}>
                    <Popover id={"scene-block-character-popover"} placement={this.state.clickedCharacter ? "top" : "right"} isOpen={this.state.hoveringCharacter} target={"scene-block-character"} style={{ zIndex: 6 }}>
                        <PopoverHeader>{"Scholar"}</PopoverHeader>
                        <PopoverBody>
                            {this.state.waitingData ?
                                "I need to find inner peace in order to answer you."
                                :
                                this.state.isAnswering ?
                                    "Well it was hard to find out : " + this.state.answerText
                                    :
                                    "Ask me a question. I've been gathering knowledge since my childhood."
                            }
                        </PopoverBody>
                    </Popover>
                </div>
                <Popover id={"scene-block-character-popover-dialog"} placement={"right"} isOpen={this.state.clickedCharacter} target={"scene-block-character"} style={{ zIndex: 7 }}>
                    <PopoverHeader>{"Scholar"}</PopoverHeader>
                    <PopoverBody>
                        <div>
                            <textarea id={"question-scholar"} placeholder={"Your question goes here ..."}></textarea>
                            <button onClick={this.askQuestion}>ask</button>
                        </div>
                    </PopoverBody>
                </Popover>

            </div>
        );
    }
}