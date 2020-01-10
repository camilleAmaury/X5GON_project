import React, { Component, Fragment } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import './SceneKnowledge.scss';

import axios from "axios";

import PopoverList from '../PopoverList';

import KnowledgeBehind from '../../../assets/Scene/knowledge/sceneKnowledgeBehind.png';
import KnowledgeCharacter from '../../../assets/Scene/knowledge/sceneKnowledgeCharacter.png';
import KnowledgeSeeking from '../../../assets/Scene/knowledge/sceneKnowledgeSeeking.png';
import KnowledgeAnswer from '../../../assets/Scene/knowledge/sceneKnowledgeAnswer.png';
import KnowledgeHover from '../../../assets/Scene/knowledge/sceneKnowledgeHoverKnowledge.png';

export default class SceneKnowledge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveringCharacter: false,
            clickedCharacter: false,
            waitingData: false,
            isAnswering: false,
            data: [],
            step:0,
            hoverBlockPosition:{
                top:69,
                left:530,
                width:165,
                height:350
            }
        }
    }

    componentDidMount = () => {
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    hoverCharacter = () => {
        let hover = document.getElementById("scene-knowledge-hover-character");
        hover.style.visibility = "visible";
        this.setState({ hoveringCharacter: true }, () => {
            if(this.state.isAnswering && this.props.notification){
                this.props.handleNotification(this.props.data);
            }
        });
    }

    leaveCharacter = () => {
        let hover = document.getElementById("scene-knowledge-hover-character");
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
        let question = document.getElementById('question-knowledge');
        let questionValue = question.value.replace(" ", "%20").replace(",","%20").replace(".","%20").replace("\n","%20");
        if(!(questionValue === null || questionValue === undefined || questionValue === "")){
            this.props.handleLoading(this.props.data);
            this.setState({
                waitingData: true,
                isAnswering: false,
                clickedCharacter: false,
                hoveringCharacter: true
            }, () => {
                axios.get('http://185.157.246.81:5000/search/' + questionValue)
                .then( request => {
                    let documents = request.data;
                    console.log(documents)
                    let data = this.state.data;
                    // for(let i = 0; i < documents.length; i++){
                    //     data.push({id:documents[i][0], title:documents[i][1], author:documents[i][2], keywords:documents[i][3]})
                    // }
                    data = [
                        {title:"Two Planes three towers", author:"Larry Silverstein", keywords:["tower", "plane", "jew", "luck"]}, 
                        {title:"Wigou Vigoula", author:"Gitan du désert", keywords:["gitan", "wesh", "derulo", "professionnel"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author And Me", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                    ];
                    this.setState({
                        waitingData: false,
                        clickedCharacter: false,
                        hoveringCharacter: true,
                        isAnswering: true,
                        data: data
                    }, () => {
                        this.props.handleNotification(this.props.data);
                    });
                })
                .catch( error => { 
                    let data = [
                        {title:"No response for those keywords", author:"", keywords:[]}
                    ];
                    this.setState({
                        waitingData: false,
                        clickedCharacter: false,
                        hoveringCharacter: true,
                        isAnswering: true,
                        data: data
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
                <img src={KnowledgeBehind}
                    alt={"scene-knowledge-behind"} id={"scene-knowledge-behind"}
                    style={
                        {
                            width:sceneWidth,
                            height:sceneHeight,
                            visibility:this.props.visible ? "visible" : "hidden"
                        }
                    } />

                <img src={KnowledgeHover}
                    alt={"scene-knowledge-hover-character"} id={"scene-knowledge-hover-character"} 
                    style={
                        {
                            width:sceneWidth,
                            height:sceneHeight,
                            visibility:(this.props.visible && this.state.hoveringCharacter) ? "visible" : "hidden"
                        }
                    }/>

                <img src={this.state.waitingData ? KnowledgeSeeking : this.state.isAnswering ? KnowledgeAnswer : KnowledgeCharacter}
                    alt={"scene-knowledge-character"} id={"scene-knowledge-character"}
                    style={
                        {
                            width:sceneWidth,
                            height:sceneHeight,
                            visibility:this.props.visible ? "visible" : "hidden"
                        }
                    } />

                <div id={"scene-knowledge-block-character"} onMouseEnter={this.hoverCharacter} onMouseLeave={this.state.isAnswering ? () => {} : this.leaveCharacter}
                    onClick={this.state.waitingData ? () => { } : (this.state.isAnswering ? () => { this.setState({ isAnswering: false }); } : this.clickCharacter)}
                    style={
                        {
                            top:hoverBlockPosition.top,
                            left:hoverBlockPosition.left,
                            width:hoverBlockPosition.width,
                            height:hoverBlockPosition.height,
                            visibility:this.props.visible ? "visible" : "hidden"
                        }
                    } >

                </div>
                <PopoverList className={this.state.isAnswering ? "answer" : ""} id={"scene-knowledge-block-character-popover"} placement={this.state.clickedCharacter ? "top" : "left"} isOpen={(!this.props.dismissPopover && this.props.visible && this.state.hoveringCharacter)} target={"scene-knowledge-block-character"}
                    title={"Librarian"} content={this.state.data.map((item, i) => <li key={i}><a href="#"><span className={"list-document-title"}>{item.title}</span><span className={"list-document-author"}>{item.author}</span><span className={"list-document-keywords"}>{item.keywords.join(" ")}</span></a></li>)}
                    isAnswering={this.state.isAnswering} waitingData={this.state.waitingData}></PopoverList>

                <Popover id={"scene-knowledge-block-character-popover-dialog"} placement={"left"} isOpen={(!this.props.dismissPopover && this.props.visible && this.state.clickedCharacter)} target={"scene-knowledge-block-character"}>
                    <PopoverHeader>{"Librarian"}</PopoverHeader>
                    <PopoverBody>
                        <div>
                            <textarea id={"question-knowledge"} placeholder={"one keyword ..."}></textarea>
                            <button onClick={this.askQuestion}>ask</button>
                        </div>
                    </PopoverBody>
                </Popover>
            </Fragment>
        );
    }
}