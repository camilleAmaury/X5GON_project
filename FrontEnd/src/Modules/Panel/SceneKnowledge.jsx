import React, { Component, Fragment } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import './SceneKnowledge.scss';

import getDivPosition from '../../Functions/Position/DivPosition';

import KnowledgeBehind from '../../assets/Scene/knowledge/sceneKnowledgeBehind.png';
import KnowledgeCharacter from '../../assets/Scene/knowledge/sceneKnowledgeCharacter.png';
import KnowledgeSeeking from '../../assets/Scene/knowledge/sceneKnowledgeSeeking.png';
import KnowledgeAnswer from '../../assets/Scene/knowledge/sceneKnowledgeAnswer.png';
import KnowledgeHover from '../../assets/Scene/knowledge/sceneKnowledgeHoverKnowledge.png';

export default class SceneKnowledge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveringCharacter: false,
            clickedCharacter: false,
            waitingData: false,
            isAnswering: false,
            data: []
        }
    }

    componentDidMount = () => {
        // position the character hover block at the right position
        let blockhover = document.getElementById("scene-knwoledge-block-character");
        let scene = document.getElementById("scene");
        let pos = getDivPosition(scene);
        blockhover.style.left = pos.left + 530 + "px";
        blockhover.style.top = pos.top + 69 + "px";
        // this.setState({hoveringCharacter:true});
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    hoverCharacter = () => {
        let hover = document.getElementById("scene-knwoledge-hover-character");
        hover.style.visibility = "visible";
        this.setState({ hoveringCharacter: true }, () => {
            if(this.state.isAnswering && this.props.notification){
                this.props.handleNotification(this.props.data);
            }
        });
    }

    leaveCharacter = () => {
        let hover = document.getElementById("scene-knwoledge-hover-character");
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
        this.setState({
            waitingData: true,
            isAnswering: false,
            clickedCharacter: false,
            hoveringCharacter: true
        }, () => {
            this.props.handleLoading(this.props.data);
            setTimeout(() => {
                let data = [
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
            }, 5000);
        });
    }

    render() {
        return (
            <Fragment>
                <img src={KnowledgeBehind}
                    alt={"scene-knwoledge-behind"} id={"scene-knwoledge-behind"} style={{visibility:this.props.visible ? "visible" : "hidden"}} />

                <img src={KnowledgeHover} style={{visibility:(this.props.visible && this.state.hoveringCharacter) ? "visible" : "hidden"}}
                    alt={"scene-knwoledge-hover-character"} id={"scene-knwoledge-hover-character"} />

                <img src={this.state.waitingData ? KnowledgeSeeking : this.state.isAnswering ? KnowledgeAnswer : KnowledgeCharacter}
                    alt={"scene-knwoledge-character"} id={"scene-knwoledge-character"} style={{visibility:this.props.visible ? "visible" : "hidden"}} />

                <div id={"scene-knwoledge-block-character"} onMouseEnter={this.hoverCharacter} onMouseLeave={this.state.isAnswering ? () => {} : this.leaveCharacter} style={{visibility:this.props.visible ? "visible" : "hidden"}}
                    onClick={this.state.waitingData ? () => { } : (this.state.isAnswering ? () => { this.setState({ isAnswering: false }); } : this.clickCharacter)}>

                </div>
                <Popover className={this.state.isAnswering ? "answer" : ""} id={"scene-knwoledge-block-character-popover"} placement={this.state.clickedCharacter ? "top" : "left"} isOpen={(!this.props.dismissPopover && this.props.visible && this.state.hoveringCharacter)} target={"scene-knwoledge-block-character"}>
                    <PopoverHeader>{"Librarian"}</PopoverHeader>
                    <PopoverBody>
                        {this.state.waitingData ?
                            "Let me a little more time to find what you are looking for !"
                            :
                            this.state.isAnswering ?
                                <div  className={"scrollbar"} id={"scrollbardocument"} >
                                    <div className={"list-document"} >
                                        <ol>
                                            {this.state.data.map((item, i) => <li key={i}>
                                                    <a href="#">
                                                        <span className={"list-document-title"}>{item.title}</span>
                                                        <span className={"list-document-author"}>{item.author}</span>
                                                        <span className={"list-document-keywords"}>{item.keywords.join(" ")}</span>
                                                    </a>
                                                </li>)}
                                        </ol>
                                    </div>
                                </div>
                                :
                                "Tell me what are the keywords of your needs."
                        }
                    </PopoverBody>
                </Popover>
                <Popover id={"scene-knwoledge-block-character-popover-dialog"} placement={"left"} isOpen={(!this.props.dismissPopover && this.props.visible && this.state.clickedCharacter)} target={"scene-knwoledge-block-character"}>
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