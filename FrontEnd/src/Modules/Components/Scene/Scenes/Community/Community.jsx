import React, { Component, Fragment } from 'react';

import './Community.css';

// import axios from "axios";

export default class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beamBox: {
                size: 50
            },
            questions:[]
        };
    }

    componentDidMount = () => {
        let questions = [
            {question:"How to toncler some mother ?", questionContent:`dddddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd
            dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddd dddddddddddddddd d ddddddddddddd
            dddddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd
            dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddd dddddddddddddddd d ddddddddddddd
            dddddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd
            dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddd dddddddddddddddd d ddddddddddddd
            dddddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd`, author:{username:"tonclure2000", time:'17:20 18/09/2020'}, 
            isClicked:false,
            comments:[
                {author:'jean-eude', time:'17:21 18/09/2020', content:'easy game, take a jus de fruit and drink like pacific sound the great did in the battle of Hulao Pass', like:12, isLiked:0},
                {author:'jean-rage', time:'17:25 18/09/2020', content:'Don`t escucha this cabron ! Go to miami and don\'t be a virgin !', like:-1, isLiked:0},
            ]}
        ];
        this.setState({questions:questions});
    }

    preparePositions = () => {
        let obj = {};
        // background
        if (true) {
            // verticalbeam
            obj.beamVertical = {
                width: Math.floor(this.state.beamBox.size * this.props.ratio),
                height: this.props.scene.height
            };
            obj.beamVertical.left2 = Math.floor(this.props.scene.width * 11 / 16 - (obj.beamVertical.width) / 2);
            obj.beamVertical.left1 = Math.floor(this.props.scene.width * 5 / 16 - (obj.beamVertical.width) / 2);
            // horizontalBeam
            obj.beamHorizontal = {
                height: Math.floor(this.state.beamBox.size * this.props.ratio),
                width1: obj.beamVertical.left1 + obj.beamVertical.width,
                width2: obj.beamVertical.left2 - (obj.beamVertical.left1 + obj.beamVertical.width),
                left1: 0,
                left2: obj.beamVertical.left1 + obj.beamVertical.width,
                left3: obj.beamVertical.left2 + obj.beamVertical.width
            };
            obj.beamHorizontal.top1 = Math.floor(this.props.scene.width * 1 / 16 - (obj.beamHorizontal.height) / 2);
            obj.beamHorizontal.top2 = Math.floor((this.props.scene.height - obj.beamHorizontal.height) / 2);
        }
        // panel
        if (true) {
            // panel
            obj.panel = {
                width:this.props.scene.width,
                height: this.props.scene.height - 50
            };
            obj.panel.left = 0;
            obj.panel.top = 50;
            // subpanel
            obj.subpanel = {
                height: obj.panel.height,
                width: obj.panel.width,
                left1:0,
                left2:obj.panel.width,
                top:0
            };
        }

        return obj;
    }

    openComment = (i) => {
        let questions = this.state.questions;
        questions[i].isClicked = !questions[i].isClicked;
        this.setState({questions:questions});
    }

    liked = (i, j, val) => {
        let questions = this.state.questions;
        questions[i].comments[j].like += val;
        questions[i].comments[j].isLiked = val;
        this.setState({questions:questions});
    }

    unliked = (i, j) => {
        let questions = this.state.questions;
        questions[i].comments[j].like -= questions[i].comments[j].isLiked;
        questions[i].comments[j].isLiked = 0;
        this.setState({questions:questions});
    }

    render() {
        let styles = this.preparePositions();

        return (
            <div id={"community"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>
                {/* beams */}
                <Fragment>
                    <div className={"verticalBeam"} style={
                        {
                            left: styles.beamVertical.left1,
                            width: styles.beamVertical.width,
                            height: styles.beamVertical.height,
                        }
                    }></div>
                    <div className={"verticalBeam"} style={
                        {
                            left: styles.beamVertical.left2,
                            width: styles.beamVertical.width,
                            height: styles.beamVertical.height,
                        }
                    }></div>
                    <div className={"horizontalBeam"} style={
                        {
                            left: styles.beamHorizontal.left1,
                            width: styles.beamHorizontal.width1,
                            height: styles.beamHorizontal.height,
                            top: styles.beamHorizontal.top1,
                        }
                    }></div>
                    <div className={"horizontalBeam"} style={
                        {
                            left: styles.beamHorizontal.left3,
                            width: styles.beamHorizontal.width1,
                            height: styles.beamHorizontal.height,
                            top: styles.beamHorizontal.top1,
                        }
                    }></div>
                    <div className={"horizontalBeam"} style={
                        {
                            left: styles.beamHorizontal.left2,
                            width: styles.beamHorizontal.width2,
                            height: styles.beamHorizontal.height,
                            top: styles.beamHorizontal.top2,
                        }
                    }></div>
                </Fragment>
                {/* Content */}
                <div id={"community-inner"}>
                    <div id={"menu"}>
                        <div className={"submenu"}>Community Questions</div>
                        <div className={"submenuSeparation"}></div>
                        <div className={"submenu"}>Ask A Question</div>
                    </div>
                    <div id={"scrollable-panel"} style={
                        {
                            height:styles.panel.height,
                            width:styles.panel.width,
                            left:styles.panel.left,
                            top:styles.panel.top,
                        }
                    }>
                        <div className={"sub-panel"} id={"community-questions"} style={
                            {
                                height:styles.subpanel.height,
                                width:styles.subpanel.width,
                                left:styles.subpanel.left1,
                                top:styles.subpanel.top,
                            }
                        }>
                            {this.state.questions.map((item, i) => 
                                <Fragment  key={i}>
                                    <div className={"question"}>
                                        <div className={"title"}><span>{item.question}</span></div>
                                        <div className={"bar"}></div>  
                                        <div className={"question-title"}><span>{item.questionContent}</span></div>  
                                        <div className={"deploy"} onClick={() => this.openComment(i)}><span>see comments ({item.comments.length})</span></div>
                                        <div className={"user-information"}>
                                            <div className={"picture"}></div>
                                            <div className={"username"}>{item.author.username}</div> 
                                            <div className={"date"}>{item.author.time}</div>
                                        </div>
                                    </div>
                                    {item.isClicked ? item.comments.map((com, j) => 
                                        <div className={"comment"} key={j}>
                                            <div className={"bar"}>
                                                <div className={"upArrow"} onClick={com.isLiked === 1 ? () => this.unliked(i,j) : () => this.liked(i,j,1)} style={{
                                                    borderColor:com.isLiked === 1 ? "white":"black",
                                                    borderStyle:"solid",
                                                    borderWidth:"0px 5px 5px 0px",
                                                    display: "inline-block",
                                                    padding: "5px",
                                                    transform: "rotate(-135deg)"
                                                }}></div> 
                                                <div className={"likes"} style={{
                                                    color:com.isLiked === 0 ? "black" : "white"
                                                }}>{com.like}</div> 
                                                <div className={"downArrow"} onClick={com.isLiked === -1 ? () => this.unliked(i,j) : () => this.liked(i,j,-1)} style={{
                                                    borderColor:com.isLiked === -1 ? "white":"black",
                                                    borderStyle:"solid",
                                                    borderWidth:"0px 5px 5px 0px",
                                                    display: "inline-block",
                                                    padding: "5px",
                                                    transform: "rotate(45deg)"
                                                }}></div> 
                                            </div>  
                                            <div className={"user"}>
                                                <div className={"picture"}></div>
                                                <div className={"username"}>{com.author}</div> 
                                                <div className={"date"}>{com.time}</div>
                                            </div>
                                            <div className={"content"}><span>{com.content}</span></div>
                                            
                                        </div>
                                    ) : ""}
                                </Fragment>
                            )}
                            
                        </div>
                        <div className={"sub-panel"} style={
                            {
                                height:styles.subpanel.height,
                                width:styles.subpanel.width,
                                left:styles.subpanel.left2,
                                top:styles.subpanel.top,
                            }
                        }>
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}