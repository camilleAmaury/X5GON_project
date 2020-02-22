import React, { Component, Fragment } from 'react';

import './Community.css';

// import axios from "axios";

export default class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            panelOpened: [true, false],
            isAnimating: false
        };
    }

    componentDidMount = () => {
        let questions = [
            {
                question: "How to toncler some mother ?", questionContent: `dddddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd
            dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddd dddddddddddddddd d ddddddddddddd
            dddddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd
            dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddd dddddddddddddddd d ddddddddddddd
            dddddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd
            dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddddd dddddddddddddddddddd dddddddddddddddd d ddddddddddddd
            dddddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd`, author: { username: "tonclure2000", time: '17:20 18/09/2020' },
                isClicked: false,
                comments: [
                    { author: 'jean-eude', time: '17:21 18/09/2020', content: 'easy game, take a jus de fruit and drink like pacific sound the great did in the battle of Hulao Pass', like: 12, isLiked: 0, hoveredArrow: 0 },
                    { author: 'jean-rage', time: '17:25 18/09/2020', content: 'Don`t escucha this cabron ! Go to miami and don\'t be a virgin !', like: -1, isLiked: 0, hoveredArrow: 0 },
                ]
            }
        ];
        this.setState({ questions: questions });
    }

    preparePositions = () => {
        let obj = {};
        // panel
        if (true) {
            // panel
            obj.panel = {
                width: this.props.scene.width,
                height: this.props.scene.height - 50
            };
            obj.panel.left = 0;
            obj.panel.top = 50;
            // subpanel
            obj.subpanel = {
                height: obj.panel.height,
                width: obj.panel.width,
                left1: this.state.panelOpened[0] ? 0 : (- obj.panel.width - 20),
                left2: this.state.panelOpened[1] ? 0 : (20 + obj.panel.width),
                top: 0,
                left3: this.state.panelOpened[1] ? -20 : obj.panel.width
            };
        }

        return obj;
    }

    openComment = (i) => {
        let questions = this.state.questions;
        questions[i].isClicked = !questions[i].isClicked;
        this.setState({ questions: questions });
    }

    liked = (i, j, val) => {
        let questions = this.state.questions;
        questions[i].comments[j].like += questions[i].comments[j].isLiked !== 0 ? val * 2 : val;
        questions[i].comments[j].isLiked = val;
        this.setState({ questions: questions });
    }

    unliked = (i, j) => {
        let questions = this.state.questions;
        questions[i].comments[j].like -= questions[i].comments[j].isLiked;
        questions[i].comments[j].isLiked = 0;
        this.setState({ questions: questions });
    }

    hoverArrow = (i, j, val) => {
        let questions = this.state.questions;
        questions[i].comments[j].hoverArrow = val;
        this.setState({ questions: questions });
    }

    postAnswer = (i) => {
        let answer = document.getElementById("answer-textarea-" + i);
        let answerValue = answer.value;
        if (!(answerValue === null || answerValue === undefined || answerValue === "")) {
            setTimeout(() => {
                answer.value = "";
                let questions = this.state.questions;
                let now = new Date();
                let day = now.getDate().toString().length === 1 ? "0" + now.getDate().toString() : now.getDate();
                let month = (now.getMonth() + 1).toString().length === 1 ? "0" + (now.getMonth() + 1).toString() : (now.getMonth() + 1);
                questions[i].comments.push(
                    {
                        author: 'Tonclure2000',
                        time: `${now.getMinutes()}:${now.getHours()} ${day}/${month}/${now.getFullYear()}`,
                        content: answerValue,
                        like: 0,
                        isLiked: 0,
                        hoveredArrow: 0
                    }
                );
                this.setState({
                    questions: questions
                });
            }, 50);
        }
    }

    postAnswer2 = (event, i) => {
        if (event.key === 'Enter') {
            this.postAnswer(i);
        }
    }

    changePanel = (i) => {
        let panelOpened = [false, false];
        panelOpened[i] = true;
        // animation
        let subp1 = document.getElementsByClassName("sub-panel")[0];
        let subp2 = document.getElementsByClassName("sub-panel")[1];
        let subps = document.getElementsByClassName("sub-panel-separator")[0];
        subp1.style.transition = "1.5s left";
        subp2.style.transition = "1.5s left";
        subps.style.transition = "1.5s left";
        this.setState({ panelOpened: panelOpened, isAnimating: true }, () => {
            setTimeout(() => {
                subp1.style.transition = "none";
                subp2.style.transition = "none";
                subps.style.transition = "none";
                this.setState({ isAnimating: false });
            }, 1500);

        });
    }

    render() {
        let styles = this.preparePositions();

        return (
            <div id={"community"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>
                {/* Content */}
                <div id={"community-inner"}>
                    <div id={"menu"}>
                        <div className={this.state.panelOpened[0] ? "submenu active" : "submenu"} onClick={this.state.isAnimating ? () => { } : () => this.changePanel(0)}>Community Questions</div>
                        <div className={"submenuSeparation"}></div>
                        <div className={this.state.panelOpened[1] ? "submenu active" : "submenu"} onClick={this.state.isAnimating ? () => { } : () => this.changePanel(1)}>Ask A Question</div>
                    </div>
                    <div id={"scrollable-panel"} style={
                        {
                            height: styles.panel.height,
                            width: styles.panel.width,
                            left: styles.panel.left,
                            top: styles.panel.top,
                        }
                    }>
                        <div className={"sub-panel"} id={"community-questions"} style={
                            {
                                height: styles.subpanel.height,
                                width: styles.subpanel.width,
                                left: styles.subpanel.left1,
                                top: styles.subpanel.top,
                            }
                        }>
                            {this.state.questions.map((item, i) =>
                                <Fragment key={i}>
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
                                    {item.isClicked ?
                                        <div className={"answer"}>
                                            <div className={"bar"}></div>
                                            <div className={"send"}><div className={"arrow"} onClick={() => this.postAnswer(i)}></div></div>
                                            <div className={"textarea"}><textarea id={"answer-textarea-" + i}
                                                onKeyPress={event => this.postAnswer2(event, i)}></textarea>
                                            </div>
                                        </div>
                                        : ""}
                                    {item.isClicked ? item.comments.map((com, j) =>
                                        <div className={"comment"} key={j}>
                                            <div className={"bar"}>
                                                <div className={"upArrow"} onMouseEnter={() => this.hoverArrow(i, j, 1)} onMouseLeave={() => this.hoverArrow(i, j, 0)}
                                                    onClick={com.isLiked === 1 ? () => this.unliked(i, j) : () => this.liked(i, j, 1)} style={{
                                                        borderColor: com.isLiked === 1 ? (com.hoverArrow === 1 ? "black" : "white") : (com.hoverArrow === 1 ? "white" : "black"),
                                                        borderStyle: "solid",
                                                        borderWidth: "0px 5px 5px 0px",
                                                        display: "inline-block",
                                                        padding: "5px",
                                                        transform: "rotate(-135deg)"
                                                    }}></div>
                                                <div className={"likes"} style={{
                                                    color: com.isLiked === 0 ? "black" : "white"
                                                }}>{com.like}</div>
                                                <div className={"downArrow"} onMouseEnter={() => this.hoverArrow(i, j, -1)} onMouseLeave={() => this.hoverArrow(i, j, 0)}
                                                    onClick={com.isLiked === -1 ? () => this.unliked(i, j) : () => this.liked(i, j, -1)} style={{
                                                        borderColor: com.isLiked === -1 ? (com.hoverArrow === -1 ? "black" : "white") : (com.hoverArrow === -1 ? "white" : "black"),
                                                        borderStyle: "solid",
                                                        borderWidth: "0px 5px 5px 0px",
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

                        <div className={"sub-panel-separator"} style={
                            {
                                height: styles.panel.height,
                                width: 20,
                                left: styles.subpanel.left3,
                                top: 0
                            }
                        }></div>

                        <div className={"sub-panel"} style={
                            {
                                height: styles.subpanel.height,
                                width: styles.subpanel.width,
                                left: styles.subpanel.left2,
                                top: styles.subpanel.top,
                            }
                        }>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}