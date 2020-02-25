import React, { Component, Fragment } from 'react';

import './Community.css';

import axios from "axios";

import im1 from '../../../../../assets/Img/_1.png';
import im2 from '../../../../../assets/Img/_2.png';
import im3 from '../../../../../assets/Img/_3.png';
import im4 from '../../../../../assets/Img/_4.png';
import im5 from '../../../../../assets/Img/_5.png';
import im6 from '../../../../../assets/Img/_6.png';
import im7 from '../../../../../assets/Img/_7.png';
import im8 from '../../../../../assets/Img/_8.png';
import im9 from '../../../../../assets/Img/_9.png';
import im10 from '../../../../../assets/Img/_10.png';

export default class Community extends Component {
    _isMounted = true;
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            myQuestions: [],
            panelOpened: [true, false],
            isAnimating: false,
            server: "",
            config: {},
            images: [im1, im2, im3, im4, im5, im6, im7, im8, im9, im10]
        };
    }
    componentWillUnmount = () => {
        this._isMounted = false;
    }

    componentDidMount = () => {
        let server = (process.env.REACT_APP_DEV === "1" ? process.env.REACT_APP_SERVER_DEV : process.env.REACT_APP_SERVER);
        let server2 = process.env.REACT_APP_SERVER2;
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        if (this._isMounted) {
            this.setState({ server: server, config: config, server2: server2 }, () => {
                this._loadQuestions();
            }, () => {
                this._loadMyQuestions();
            });
        }
    }

    _loadQuestions = () => {
        if (this._isMounted) {
            axios.get(`${this.state.server}community_questions?get_comment=true&check_comment_like=${JSON.parse(localStorage.getItem("isConnected")).id}`, this.state.config)
                .then(request => {
                    let res = request.data;
                    let questions = [];
                    for (let i = 0; i < res.length; i++) {
                        questions.push({
                            question: res[i].question_title, questionContent: res[i].question,
                            author: { username: res[i].username, time: res[i].date, image: res[i].user_image },
                            isClicked: false, comments: [], id: res[i].question_id
                        });
                        for (let j = 0; j < res[i].comments.length; j++) {
                            questions[i].comments.push({
                                author: res[i].comments[j].username, time: res[i].comments[j].date,
                                content: res[i].comments[j].comment,
                                like: res[i].comments[j].like_count, isLiked: 0, hoveredArrow: 0,
                                id: res[i].comments[j].comment_id, image: res[i].comments[j].user_image
                            });
                        }
                    }
                    if (this._isMounted) {
                        this.setState({
                            questions: questions
                        });
                    }
                })
                .catch(error => {
                    //
                });
        }
    }

    _loadMyQuestions = () => {
        if (this._isMounted) {
            axios.get(`${this.state.server}community_questions?user_id=${JSON.parse(localStorage.getItem("isConnected")).id}&get_comment=true&check_comment_like=${JSON.parse(localStorage.getItem("isConnected")).id}`, this.state.config)
                .then(request => {
                    let res = request.data;
                    let myQuestions = [];
                    for (let i = 0; i < res.length; i++) {
                        myQuestions.push({
                            question: res[i].question_title, questionContent: res[i].question,
                            author: { username: res[i].username, time: res[i].date, image: res[i].user_image },
                            isClicked: false, comments: [], id: res[i].question_id
                        });
                        for (let j = 0; j < res[i].comments.length; j++) {
                            myQuestions[i].comments.push({
                                author: res[i].comments[j].username, time: res[i].comments[j].date,
                                content: res[i].comments[j].comment,
                                like: res[i].comments[j].like_count, isLiked: 0, hoveredArrow: 0,
                                id: res[i].comments[j].comment_id, image: res[i].comments[j].user_image
                            });
                        }
                    }
                    if (this._isMounted) {
                        this.setState({
                            myQuestions: myQuestions
                        });
                    }
                })
                .catch(error => {
                    //
                });
        }
    }

    preparePositions = () => {
        let obj = {};
        // panel
        if (this._isMounted) {
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
        if (this._isMounted) {
            let questions = this.state.questions;
            questions[i].isClicked = !questions[i].isClicked;
            if (this._isMounted) {
                this.setState({ questions: questions });
            }
        }
    }

    liked = (i, j, val) => {
        if (this._isMounted) {
            let questions = this.state.questions;
            questions[i].comments[j].like += questions[i].comments[j].isLiked !== 0 ? val * 2 : val;
            questions[i].comments[j].isLiked = val;
            // request
            let obj = {
                user_id: JSON.parse(localStorage.getItem("isConnected")).id,
                comment_id: questions[i].comments[j].id,
                like_value: val
            }
            axios.post(`${this.state.server}likes/`, obj, this.state.config)
                .then(request => {
                    if (request.status === 201) {
                        if (this._isMounted) {
                            this.setState({ questions: questions });
                        }
                    }
                })
                .catch(error => {
                    // nothing
                });
        }
    }

    unliked = (i, j) => {
        if (this._isMounted) {
            let questions = this.state.questions;
            questions[i].comments[j].like -= questions[i].comments[j].isLiked;
            questions[i].comments[j].isLiked = 0;
            // request
            let obj = {
                user_id: JSON.parse(localStorage.getItem("isConnected")).id,
                comment_id: questions[i].comments[j].id,
                like_value: 0
            }
            axios.post(`${this.state.server}likes/`, obj, this.state.config)
                .then(request => {
                    if (request.status === 201) {
                        if (this._isMounted) {
                            this.setState({ questions: questions });
                        }
                    }
                })
                .catch(error => {
                    // nothing
                });
        }
    }

    hoverArrow = (i, j, val) => {
        if (this._isMounted) {
            let questions = this.state.questions;
            questions[i].comments[j].hoverArrow = val;
            if (this._isMounted) {
                this.setState({ questions: questions });
            }
        }
    }

    postAnswer = (i) => {
        let answer = document.getElementById("answer-textarea-" + i);
        let answerValue = answer.value;
        if (!(answerValue === null || answerValue === undefined || answerValue === "")) {
            setTimeout(() => {
                answer.value = "";
                if (this._isMounted) {
                    let questions = this.state.questions;
                    let now = new Date();
                    let day = now.getDate().toString().length === 1 ? "0" + now.getDate().toString() : now.getDate();
                    let month = (now.getMonth() + 1).toString().length === 1 ? "0" + (now.getMonth() + 1).toString() : (now.getMonth() + 1);

                    questions[i].comments.push(
                        {
                            author: JSON.parse(localStorage.getItem("isConnected")).username,
                            time: `${now.getMinutes()}:${now.getHours()} ${day}/${month}/${now.getFullYear()}`,
                            content: answerValue,
                            like: 0,
                            isLiked: 0,
                            hoveredArrow: 0
                        }
                    );
                    // request
                    let obj = {
                        "comment": answerValue,
                        "user_id": JSON.parse(localStorage.getItem("isConnected")).id,
                        "question_id": questions[i].id
                    }
                    axios.post(`${this.state.server}community_comments/`, obj, this.state.config)
                        .then(request => {
                            if (request.status === 201) {
                                if (this._isMounted) {
                                    this.setState({ questions: questions });
                                }
                            }
                        })
                        .catch(error => {
                            // nothing
                        });
                }
            }, 50);
        }
    }

    postAnswer2 = (event, i) => {
        if (event.key === 'Enter') {
            this.postAnswer(i);
        }
    }

    postQuestion = (i) => {
        let questionTitle = document.getElementById("question-title-textarea");
        let questionTitleValue = questionTitle.value;
        let question = document.getElementById("question-textarea");
        let questionValue = question.value;
        if (!(questionValue === null || questionValue === undefined || questionValue === "") && !(questionTitleValue === null || questionTitleValue === undefined || questionTitleValue === "")) {
            setTimeout(() => {
                question.value = "";
                questionTitle.value = "";
                if (this._isMounted) {
                    // request
                    let obj = {
                        "question_title": questionTitleValue,
                        "user_id": JSON.parse(localStorage.getItem("isConnected")).id,
                        "question": questionValue
                    }
                    axios.post(`${this.state.server}community_questions/`, obj, this.state.config)
                        .then(request => {
                            if (request.status === 201) {
                                //this.setState({ myQuestions: myQuestions });
                                this._loadMyQuestions()
                            }
                        })
                        .catch(error => {
                            // nothing
                        });
                }
            }, 50);
        }
    }

    postQuestion2 = (event) => {
        if (event.key === 'Enter') {
            this.postQuestion();
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
        if (this._isMounted) {
            this.setState({ panelOpened: panelOpened, isAnimating: true }, () => {
                setTimeout(() => {
                    subp1.style.transition = "none";
                    subp2.style.transition = "none";
                    subps.style.transition = "none";
                    if (this._isMounted) {
                        this.setState({ isAnimating: false });
                    }
                }, 1500);
            });
        }
    }

    render() {
        let styles = this.preparePositions();

        return (
            <div id={"community"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>
                {this._isMounted ?
                <Fragment>
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
                                top: styles.panel.top
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
                                            <div className={"bar"}>
                                                <div className={"hor"}></div>
                                            </div>
                                            <div className={"question-title"}><span>{item.questionContent}</span></div>
                                            <div className={"deploy"} onClick={() => this.openComment(i)}><span>{item.isClicked ? "unsee comments" : "see comments"} ({item.comments.length})</span></div>
                                            <div className={"user-information"}>
                                                <div className={"picture"} style={{
                                                    backgroundImage: `url('${this.state.images[item.author.image]}')`,
                                                    backgroundSize: 'cover'
                                                }}></div>
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
                                                            borderColor: com.isLiked === 1 ? (com.hoverArrow === 1 ? "#b43120" : "#dd3636") : (com.hoverArrow === 1 ? "#dd3636" : "#b43120"),
                                                            borderStyle: "solid",
                                                            borderWidth: "0px 5px 5px 0px",
                                                            display: "inline-block",
                                                            padding: "5px",
                                                            transform: "rotate(-135deg)"
                                                        }}></div>
                                                    <div className={"likes"} style={{
                                                        color: com.isLiked === 0 ? "#b43120" : "#dd3636"
                                                    }}>{com.like}</div>
                                                    <div className={"downArrow"} onMouseEnter={() => this.hoverArrow(i, j, -1)} onMouseLeave={() => this.hoverArrow(i, j, 0)}
                                                        onClick={com.isLiked === -1 ? () => this.unliked(i, j) : () => this.liked(i, j, -1)} style={{
                                                            borderColor: com.isLiked === -1 ? (com.hoverArrow === -1 ? "#b43120" : "#dd3636") : (com.hoverArrow === -1 ? "#dd3636" : "#b43120"),
                                                            borderStyle: "solid",
                                                            borderWidth: "0px 5px 5px 0px",
                                                            display: "inline-block",
                                                            padding: "5px",
                                                            transform: "rotate(45deg)"
                                                        }}></div>
                                                </div>
                                                <div className={"user"}>
                                                    <div className={"picture"} style={{
                                                        backgroundImage: `url('${this.state.images[com.image]}')`,
                                                        backgroundSize: 'cover'
                                                    }}></div>
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

                            <div className={"sub-panel"} id={"community-ask-questions"} style={
                                {
                                    height: styles.subpanel.height,
                                    width: styles.subpanel.width,
                                    left: styles.subpanel.left2,
                                    top: styles.subpanel.top,
                                }
                            }>
                                <div className={"question"}>


                                    <div className={"textarea"} style={{
                                        gridColumn: "2 / 10",
                                        gridRow: "1",
                                        display: "flex",
                                        alignItems: "center"
                                    }}><textarea id={"question-title-textarea"} style={{ width: "100%" }}></textarea></div>
                                    <div className={"textarea"} style={{
                                        gridColumn: "2 / 10",
                                        gridRow: "2",
                                        display: "flex",
                                        alignItems: "center"
                                    }}><textarea id={"question-textarea"} style={{ width: "100%" }}
                                        onKeyPress={event => this.postQuestion2(event)}></textarea>
                                    </div>
                                    <div className={"send"} style={{
                                        gridColumn: "10 / 12",
                                        gridRow: "1/3",
                                        display: "flex",
                                        alignItems: "center"
                                    }}><div className={"arrow"} onClick={() => this.postQuestion()}></div></div>
                                </div>
                                {this.state.myQuestions.map((item, i) =>
                                    <Fragment key={i}>
                                        <div className={"question"}>
                                            <div className={"title"}><span>{item.question}</span></div>
                                            <div className={"bar"}>
                                                <div className={"hor"}></div>
                                            </div>
                                            <div className={"question-title"}><span>{item.questionContent}</span></div>
                                            <div className={"deploy"} onClick={() => this.openComment(i)}><span>{item.isClicked ? "unsee comments" : "see comments"} ({item.comments.length})</span></div>
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
                                                            borderColor: com.isLiked === 1 ? (com.hoverArrow === 1 ? "#b43120" : "#dd3636") : (com.hoverArrow === 1 ? "#dd3636" : "#b43120"),
                                                            borderStyle: "solid",
                                                            borderWidth: "0px 5px 5px 0px",
                                                            display: "inline-block",
                                                            padding: "5px",
                                                            transform: "rotate(-135deg)"
                                                        }}></div>
                                                    <div className={"likes"} style={{
                                                        color: com.isLiked === 0 ? "#b43120" : "#dd3636"
                                                    }}>{com.like}</div>
                                                    <div className={"downArrow"} onMouseEnter={() => this.hoverArrow(i, j, -1)} onMouseLeave={() => this.hoverArrow(i, j, 0)}
                                                        onClick={com.isLiked === -1 ? () => this.unliked(i, j) : () => this.liked(i, j, -1)} style={{
                                                            borderColor: com.isLiked === -1 ? (com.hoverArrow === -1 ? "#b43120" : "#dd3636") : (com.hoverArrow === -1 ? "#dd3636" : "#b43120"),
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
                        </div>
                    </div>
                </Fragment>
                : ""}
            </div>
        );
    }
}