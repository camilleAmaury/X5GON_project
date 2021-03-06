import React, { Component, Fragment } from 'react';

import axios from "axios";

import scholar from '../../../assets/Panel/Scene/Scholar/Scholar.png';
import scholarSeeking from '../../../assets/Panel/Scene/Scholar/ScholarSeeking.png';
import scholarAnswering from '../../../assets/Panel/Scene/Scholar/ScholarAnswering.png';
import leftsideScroll from '../../../assets/Panel/Scene/Scholar/scrollSideLeft.png';
import rightsideScroll from '../../../assets/Panel/Scene/Scholar/scrollSideRight.png';

import './ScholarPopover.css';

export default class ScholarPopover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bubbleBox: 160,
            scholarbox: {
                width: 105,
                height: 140
            },
            scrollTotalBox: {
                width: 1450,
                height: 105,
                topHeight: 75
            },
            scrollSideBox: {
                width: 150,
                height: 105
            },
            scrollBox: {
                height: 700
            },
            scrollSideDecorationBox: 50,
            sessionChat: [],
            scholarState: 0,
            isOpen: false,
            corpusHoverEvent:false,
            server: "",
            config: {}
        }
    }

    componentDidMount = () => {
        let server = (process.env.REACT_APP_DEV === "1" ? process.env.REACT_APP_SERVER_DEV : process.env.REACT_APP_SERVER);
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        };
        this.setState({ server: server, config: config });
    }

    preparePositions = () => {
        let obj = {};
        // bubble
        if (true) {
            // bubble
            let size = Math.floor(this.props.ratio * this.state.bubbleBox);
            obj.bubble = {
                width: size,
                height: size
            };
            obj.bubble.top = this.props.windowSize.height - (size + 15);
            obj.bubble.left = this.props.windowSize.width - (size + 15);
            // scolar
            obj.scholar = {
                width: Math.floor(this.props.ratio * this.state.scholarbox.width),
                height: Math.floor(this.props.ratio * this.state.scholarbox.height)
            };
        }
        // scroll top part
        if (true) {
            // scroll side
            obj.leftScroll = {
                width: Math.floor(this.props.ratio * this.state.scrollSideBox.width),
                height: Math.floor(this.props.ratio * this.state.scrollSideBox.height)
            }
            obj.leftScroll.top = Math.floor(this.props.ratio * 60);
            obj.leftScroll.left = Math.floor((
                (this.props.windowSize.width - this.props.NavbarBox.width)
                - Math.floor(this.props.ratio * this.state.scrollTotalBox.width)) / 2)
                + this.props.NavbarBox.width;
            obj.rightScroll = {
                width: obj.leftScroll.width,
                height: obj.leftScroll.height
            }
            obj.rightScroll.top = obj.leftScroll.top;
            obj.rightScroll.left = obj.leftScroll.left + Math.floor(this.props.ratio * this.state.scrollTotalBox.width) - 2 * obj.rightScroll.width;
            // scroll top
            let gap = Math.floor(this.props.ratio * 40 / 2);
            obj.topScroll = {
                width: obj.rightScroll.left - (obj.leftScroll.width + obj.leftScroll.left) + gap * 2,
                height: Math.floor(this.props.ratio * this.state.scrollTotalBox.topHeight)
            }
            obj.topScroll.top = obj.leftScroll.top + Math.floor((obj.leftScroll.height - obj.topScroll.height) / 2);
            obj.topScroll.left = obj.leftScroll.width + obj.leftScroll.left - gap;
            // scroll texture
            obj.topScrolltexture = {
                width: Math.floor(obj.topScroll.width - 2*gap - obj.topScroll.width/10),
                height: obj.topScroll.height + 10
            }
            obj.topScrolltexture.top = obj.topScroll.top - 5;
            obj.topScrolltexture.left = Math.floor((obj.topScroll.width - obj.topScrolltexture.width)/2) + obj.topScroll.left;
        }
        // scroll corpus part
        if (true) {
            // corpus
            let gap = Math.floor(this.props.ratio * 80 / 2);
            obj.scroll = {
                width: obj.topScrolltexture.width - 2*gap,
                height: Math.floor(this.props.ratio * this.state.scrollBox.height)
            }
            obj.scroll.top = obj.topScroll.top + Math.floor(obj.topScroll.height / 2);
            obj.scroll.left = obj.topScrolltexture.left + Math.floor((obj.topScrolltexture.width - obj.scroll.width)/2);
            // corpus side
            obj.scrollSide = {
                width: Math.floor(this.props.ratio * this.state.scrollSideDecorationBox),
                height: obj.scroll.height
            }
            obj.scrollSide.left = obj.scroll.width - obj.scrollSide.width + 1;
            // scrolling corpus
            let scrollwritting = 80;
            obj.scrollingCorpus = {
                width: obj.scrollSide.left - obj.scrollSide.width,
                height: obj.scroll.height - Math.floor(obj.topScroll.height / 2) - scrollwritting  - 20
            }
            obj.scrollingCorpus.left = obj.scrollSide.width;
            obj.scrollingCorpus.top = Math.floor(obj.topScroll.height / 2) + 20;
            // writting corpus
            obj.writtingCorpus = {
                width: obj.scrollingCorpus.width,
                height: scrollwritting
            }
            obj.writtingCorpus.left = obj.scrollSide.width;
            obj.writtingCorpus.top = obj.scrollingCorpus.top + obj.scrollingCorpus.height;
        }

        return obj;
    }

    isRead = () => {
        this.setState({
            scholarState:0,
            corpusHoverEvent:false
        }, () => {
            document.getElementById("Scholar-scroll-ask").addEventListener("click", this.state.scholarState === 0 ? this.askQuestion : () => { });
        });
    }

    askQuestion = () => {
        let question = document.getElementById('Scholar-scroll-question');
        let questionValue = question.value;
        if (!(questionValue === null || questionValue === undefined || questionValue === "")) {
            document.getElementById("Scholar-scroll-ask").removeEventListener("click", this.state.scholarState === 0 ? this.askQuestion : () => { });
            let chat = this.state.sessionChat;
            chat.push({ message: questionValue, scholar: "own" });
            question.value = "";
            this.setState({
                scholarState: 1,
                sessionChat: chat
            }, () => {
                axios.get(`http://185.157.246.81:5000/askquestion/${questionValue}`)
                    .then(request => {
                        question.value = "";
                        let chat = this.state.sessionChat;
                        let answer = JSON.parse(request.data)[0] === "empty" ? "" : JSON.parse(request.data)[0];
                        chat.push(
                            { message: "Well, it was a hard time to remember this ...", scholar: "scholar" },
                            { message: answer, scholar: "scholar" }
                        );
                        this.setState({
                            sessionChat: chat,
                            scholarState: 2,
                            corpusHoverEvent:true
                        }, () => {
                            if(answer !== "" && answer !== undefined){
                                let obj = {question: questionValue, answer: answer}
                                let fun = function(server, obj, config, i){
                                    axios.post(`${server}users/${JSON.parse(localStorage.getItem("isConnected")).id}/scholar_questions`, obj, config)
                                    .catch(error => {
                                        // retry max 3 times
                                        if(i < 3){
                                            fun(server, obj, config, i+1);
                                        }
                                    });
                                }
                                fun(this.state.server, obj, this.state.config, 0);
                            }
                        });
                    })
                    .catch(error => {
                        question.value = "";
                        let chat = this.state.sessionChat;
                        chat.push({ message: "I also have limits, I can clearly tell you that I don't know !", scholar: "scholar" });
                        this.setState({
                            sessionChat: chat,
                            scholarState: 2,
                            corpusHoverEvent:true
                        });
                    });
            });
        }
    }

    handleKeyEnter = event => {
        if(event.key === 'Enter'){
            this.askQuestion();
        }
    }

    popover = () => {
        this.setState({
            isOpen: !this.state.isOpen
        }, () => {
            if(this.state.isOpen){
                document.getElementById("Scholar-scroll-ask").addEventListener("click", this.state.scholarState === 0 ? this.askQuestion : () => { });
                this.setState({
                    scholarState:0
                })
            }
        });
    }

    render() {
        let styles = this.preparePositions();
        return (
            <Fragment>
                {this.state.isOpen ?
                    <div id={"Scholar-layout"} onClick={this.popover}></div>
                    :
                    ""
                }
                <div id={"ScholarBubble"} onClick={this.popover} style={
                    {
                        width: styles.bubble.width,
                        height: styles.bubble.height,
                        top: styles.bubble.top,
                        left: styles.bubble.left,
                        borderRadius: (Math.floor(styles.bubble.width / 2)) + "px"
                    }
                }>
                    <img src={this.state.scholarState === 0 ? scholar : this.state.scholarState === 1 ? scholarSeeking : this.state.scholarState === 2 ? scholarAnswering : ""}
                        alt={"scholar-bubble"} style={
                            {
                                width: styles.scholar.width,
                                height: styles.scholar.height
                            }
                        }></img>
                </div>

                {this.state.isOpen ?
                    <Fragment>
                        <div id={"Scholar-scroll"} onKeyPress={this.handleKeyEnter} onMouseOver={this.state.corpusHoverEvent ? this.isRead : () => {}} style={
                            {
                                width: styles.scroll.width,
                                height: styles.scroll.height,
                                top: styles.scroll.top,
                                left: styles.scroll.left
                            }
                        }>
                            <div id={"Scholar-scroll-side"} style={
                                {
                                    width: styles.scrollSide.width,
                                    height: styles.scrollSide.height,
                                    top: 0,
                                    left: 0
                                }
                            }></div>
                            <div id={"Scholar-scroll-side-inv"} style={
                                {
                                    width: styles.scrollSide.width,
                                    height: styles.scrollSide.height,
                                    top: 0,
                                    left: styles.scrollSide.left
                                }
                            }></div>
                            <div id={"Scholar-scroll-corpus"} style={
                                {
                                    width: styles.scrollingCorpus.width,
                                    height: styles.scrollingCorpus.height,
                                    top: styles.scrollingCorpus.top,
                                    left: styles.scrollingCorpus.left
                                }
                            }>
                                {this.state.sessionChat.map((chat, i) =>
                                    <div className={"chat-container-" + chat.scholar} key={i}>
                                        <div className={"chat-bubble-" + chat.scholar}>{chat.message}</div>
                                    </div>
                                )}
                            </div>
                            <div id={"Scholar-scroll-corpus-write"} style={
                                {
                                    width: styles.writtingCorpus.width,
                                    height: styles.writtingCorpus.height,
                                    top: styles.writtingCorpus.top,
                                    left: styles.writtingCorpus.left
                                }
                            }>
                                <textarea id={"Scholar-scroll-question"} placeholder={"Ask me a question ..."}></textarea>
                                <div id={"Scholar-scroll-ask"}></div>
                            </div>
                        </div>
                        <div id={"Scholar-scrollTop"} style={
                            {
                                width: styles.topScroll.width,
                                height: styles.topScroll.height,
                                top: styles.topScroll.top,
                                left: styles.topScroll.left
                            }
                        }></div>
                        <div id={"Scholar-scrollTop-texture"} style={
                            {
                                width: styles.topScrolltexture.width,
                                height: styles.topScrolltexture.height,
                                top: styles.topScrolltexture.top,
                                left: styles.topScrolltexture.left
                            }
                        }></div>
                        <img className={"Scholar-scrollSide"} src={leftsideScroll} alt={"scroll-side"} style={
                            {
                                width: styles.leftScroll.width,
                                height: styles.leftScroll.height,
                                top: styles.leftScroll.top,
                                left: styles.leftScroll.left,
                            }
                        }></img>
                        <img className={"Scholar-scrollSide"} src={rightsideScroll} alt={"scroll-side"} style={
                            {
                                width: styles.rightScroll.width,
                                height: styles.rightScroll.height,
                                top: styles.rightScroll.top,
                                left: styles.rightScroll.left,
                            }
                        }></img>
                    </Fragment>
                    :
                    ""
                }

            </Fragment>

        );
    }
}