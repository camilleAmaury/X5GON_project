import React, { Component, Fragment } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import axios from "axios";

import './SceneScholar.scss';

import ScholarBehind from '../../../assets/Scene/scholar/sceneScholarBehind.png';
import ScholarCharacter from '../../../assets/Scene/scholar/sceneScholarCharacter.png';
import ScholarSeeking from '../../../assets/Scene/scholar/sceneScholarSeeking.png';
import ScholarAnswer from '../../../assets/Scene/scholar/sceneScholarAnswer.png';
import ScholarHover from '../../../assets/Scene/scholar/sceneScholarHoverScholar.png';

export default class SceneScholar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveringCharacter: false,
            clickedCharacter: false,
            waitingData: false,
            isAnswering: false,
            answerText: "",
            hoverBlockPosition:{
                top:138,
                left:144,
                width:172,
                height:228
            }
        }
    }

    componentDidMount = () => {
    }

    hoverCharacter = () => {
        let hover = document.getElementById("scene-scholar-hover-character");
        hover.style.visibility = "visible";
        this.setState({ hoveringCharacter: true }, () => {
            if(this.state.isAnswering && this.props.notification){
                this.props.handleNotification(this.props.data);
            }
        });
    }

    leaveCharacter = () => {
        let hover = document.getElementById("scene-scholar-hover-character");
        hover.style.visibility = "hidden";
        this.setState({ hoveringCharacter: false });
    }

    clickCharacter = () => {
        this.setState({
            clickedCharacter: !this.state.clickedCharacter,
            isAnswering: false
        });
    }

    askQuestion = () => {
        // pass to a thinking state --> waiting for data
        let question = document.getElementById('question-scholar');
        let questionValue = question.value;
        if(!(questionValue === null || questionValue === undefined || questionValue === "")){
            this.props.handleLoading(this.props.data);
            this.setState({
                waitingData: true,
                isAnswering: false,
                clickedCharacter: false,
                hoveringCharacter: true
            }, () => {
                axios.get('http://185.157.246.81:5000/askquestion/' + question.value)
                .then( request => {
                    this.setState({
                        waitingData: false,
                        clickedCharacter: false,
                        hoveringCharacter: true,
                        isAnswering: true,
                        answerText: <span>Well it was hard to find out : <span style={{fontWeight:"bold"}}>{JSON.parse(request.data)[0]}</span></span>
                    }, () => {
                        this.props.handleNotification(this.props.data);
                    });
                })
                .catch( error => {
                    this.setState({
                        waitingData: false,
                        clickedCharacter: false,
                        hoveringCharacter: true,
                        isAnswering: true,
                        answerText: <span style={{fontWeight:"bold"}}>Error from server</span>
                    }, () => {
                        this.props.handleNotification(this.props.data);
                    });
                });
            });
        }
    }

    render() {
        let sceneWidth = Math.floor(this.props.innerScenePosition.width * this.props.ratio);
        let sceneHeight = Math.floor(this.props.innerScenePosition.height * this.props.ratio);
        let hoverBlockPosition = {
            top:Math.floor(this.state.hoverBlockPosition.top * this.props.ratio),
            left:Math.floor(this.state.hoverBlockPosition.left * this.props.ratio),
            width:Math.floor(this.state.hoverBlockPosition.width * this.props.ratio),
            height:Math.floor(this.state.hoverBlockPosition.height * this.props.ratio)
        }
        return (
            <Fragment>
                <img src={ScholarBehind}
                    alt={"scene-scholar-behind"} id={"scene-scholar-behind"} 
                    style={
                        {
                            width:sceneWidth,
                            height:sceneHeight,
                            visibility:this.props.visible ? "visible" : "hidden"
                        }
                    }/>

                <img src={ScholarHover}
                    alt={"scene-scholar-hover-character"} id={"scene-scholar-hover-character"} 
                    style={
                        {
                            width:sceneWidth,
                            height:sceneHeight,
                            visibility:(this.props.visible && this.state.hoveringCharacter) ? "visible" : "hidden"
                        }
                    }/>

                <img src={this.state.waitingData ? ScholarSeeking : this.state.isAnswering ? ScholarAnswer : ScholarCharacter}
                    alt={"scene-scholar-character"} id={"scene-scholar-character"}
                    style={
                        {
                            width:sceneWidth,
                            height:sceneHeight,
                            visibility:this.props.visible ? "visible" : "hidden"
                        }
                    }/>

                <div id={"scene-scholar-block-character"} onMouseEnter={this.hoverCharacter} onMouseLeave={this.leaveCharacter}
                    onClick={this.state.waitingData ? () => { } : (this.state.isAnswering ? () => { this.setState({ isAnswering: false }); } : this.clickCharacter)}
                    style={
                        {
                            top:hoverBlockPosition.top,
                            left:hoverBlockPosition.left,
                            width:hoverBlockPosition.width,
                            height:hoverBlockPosition.height,
                            visibility:this.props.visible ? "visible" : "hidden"
                        }
                    }></div>

                <Popover id={"scene-scholar-block-character-popover"} placement={this.state.clickedCharacter ? "top" : "right"} isOpen={(!this.props.dismissPopover && this.props.visible && this.state.hoveringCharacter)} target={"scene-scholar-block-character"}>
                    <PopoverHeader>{"Scholar"}</PopoverHeader>
                    <PopoverBody>
                        {this.state.waitingData ?
                            "I need to find inner peace in order to answer you."
                            :
                            this.state.isAnswering ?
                                this.state.answerText
                                :
                                "Ask me a question. I've been gathering knowledge since my childhood."
                        }
                    </PopoverBody>
                </Popover>
                <Popover id={"scene-scholar-block-character-popover-dialog"} placement={"right"} isOpen={(!this.props.dismissPopover && this.props.visible && this.state.clickedCharacter)} target={"scene-scholar-block-character"}>
                    <PopoverHeader>{"Scholar"}</PopoverHeader>
                    <PopoverBody>
                        <div>
                            <textarea id={"question-scholar"} className={"question-scholar"} placeholder={"Your question goes here ..."}></textarea>
                            <button onClick={this.askQuestion}>ask</button>
                        </div>
                    </PopoverBody>
                </Popover>
            </Fragment>
        );
    }
}