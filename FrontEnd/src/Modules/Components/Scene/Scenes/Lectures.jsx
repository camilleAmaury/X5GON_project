import React, { Component } from 'react';

import './Lectures.css';

import axios from "axios";

import leftsideScroll from '../../../../assets/Panel/Scene/Scholar/scrollSideLeft.png';
import rightsideScroll from '../../../../assets/Panel/Scene/Scholar/scrollSideRight.png';

export default class Lectures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents:[],
            documentContainerBox:{
                height: 250,
            },
            documentSeparatorBox:{
                height: 20,
            },
            scrollUpperBox: {
                height: 66,
            },
            scrollUpperTextureBox: {
                height: 74
            },
            scrollSideBox: {
                width: 125,
                height: 83
            },
            sideBox: {
                width: 30,
            }
        }
    }

    componentDidMount = () => {
        let documents = [
            {title:"A random title", id:"158493", content:`\n
                dqzdqzdqz
                dqzqdqdqzzzzzzzzzzzzzzzzzzz
                dqzdqzqj jd jqjzd iqzjdioq jj j jqzd qz
                d qz
                d q
                d
                q
                dqzdqzdqdqd qzd qdqz
                dq dqzq dqdqffsfqfqf q dqzdqd qd qd
                dqzdqzdqz
                dqzqdqdqzzzzzzzzzzzzzzzzzzz
                dqzdqzqj jd jqjzd iqzjdioq jj j jqzd qz
                d qz
                d q
                d
                q
                dqzdqzdqdqd qzd qdqz
                dq dqzq dqdqffsfqfqf q dqzdqd qd qd
                dqzdqzdqz
                dqzqdqdqzzzzzzzzzzzzzzzzzzz
                dqzdqzqj jd jqjzd iqzjdioq jj j jqzd qz
                d qz
                d q
                d
                q
                dqzdqzdqdqd qzd qdqz
                dq dqzq dqdqffsfqfqf q dqzdqd qd qd
            `, isScrolled:false, bgY1:150, bgY2:0, corpusTop:0},
            {title:"A random title 2", id:"158493", content:`\n
                dqzdqzdqz
                dqzqdqdqzzzzzzzzzzzzzzzzzzz
                dqzdqzqj jd jqjzd iqzjdioq jj j jqzd qz
                d qz
                d q
                d
                q
                dqzdqzdqdqd qzd qdqz
                dq dqzq dqdqffsfqfqf q dqzdqd qd qd
                dqzdqzdqz
                dqzqdqdqzzzzzzzzzzzzzzzzzzz
                dqzdqzqj jd jqjzd iqzjdioq jj j jqzd qz
                d qz
                d q
                d
                q
                dqzdqzdqdqd qzd qdqz
                dq dqzq dqdqffsfqfqf q dqzdqd qd qd
                dqzdqzdqz
                dqzqdqdqzzzzzzzzzzzzzzzzzzz
                dqzdqzqj jd jqjzd iqzjdioq jj j jqzd qz
                d qz
                d q
                d
                q
                dqzdqzdqdqd qzd qdqz
                dq dqzq dqdqffsfqfqf q dqzdqd qd qd
            `, isScrolled:false, bgY1:150, bgY2:0, corpusTop:0}
        ];
        this.setState({
            documents:documents
        }, () => {
            let list = document.getElementsByClassName("scrollUpper");
            for(let i = 0; i < list.length; i++){
                list[i].addEventListener("click", this.scrollDocument);
            }
        });
        // request which asks for document still in reading states for the user
    }

    preparePositions = () => {
        let obj = {};

        // document container
        obj.documentContainer = {
            height:[]
        };
        for(let i = 0; i < this.state.documents.length; i++){
            obj.documentContainer.height.push(this.state.documents[i].isScrolled ? this.props.scene.height : this.state.documentContainerBox.height);
        }

        if(true){
            // side scroll
            obj.scrollSide = {
                width:Math.floor(this.props.ratio*this.state.scrollSideBox.width),
                height:Math.floor(this.props.ratio*this.state.scrollSideBox.height)
            }; 
            let scrollTopWidth = Math.floor(this.props.scene.width*7/8);
            obj.scrollSideTop = Math.floor(((this.state.documentContainerBox.height - this.state.documentSeparatorBox.height) - obj.scrollSide.height)/2 - obj.scrollSide.height/2) - 5;
            obj.scrollSide.left1 = Math.floor((this.props.scene.width - scrollTopWidth)/2);
            obj.scrollSide.left2 = Math.floor((this.props.scene.width - scrollTopWidth)/2) + scrollTopWidth - obj.scrollSide.width;
            obj.scrollSideBottom = [];
            for(let i = 0; i < this.state.documents.length; i++){
                obj.scrollSideBottom.push(this.state.documents[i].isScrolled ? (obj.documentContainer.height[i] - obj.scrollSideTop - obj.scrollSide.height) : 
                    Math.floor(((this.state.documentContainerBox.height - this.state.documentSeparatorBox.height) - obj.scrollSide.height)/2 + obj.scrollSide.height/2) + 5);
            }
            // scroll upper part
            obj.upper = {
                width:obj.scrollSide.left2 - (obj.scrollSide.left1 + obj.scrollSide.width),
                height:Math.floor(this.props.ratio*this.state.scrollUpperBox.height)
            }; 
            obj.upper.left = obj.scrollSide.left1 + obj.scrollSide.width;
            obj.upper.top1 = obj.scrollSideTop + Math.floor((obj.scrollSide.height - obj.upper.height)/2);
            obj.upper.top2 = [];
            for(let i = 0; i < this.state.documents.length; i++){
                obj.upper.top2.push(this.state.documents[i].isScrolled ? (obj.documentContainer.height[i] - obj.upper.top1 - obj.upper.height) : obj.scrollSideBottom[i] + Math.floor((obj.scrollSide.height - obj.upper.height)/2));
            }
            // scroll texture
            obj.texture = {
                width:Math.floor(obj.upper.width*9/10),
                height:Math.floor(this.state.scrollUpperTextureBox.height*this.props.ratio),
                backgroundPositionY1:[],
                backgroundPositionY2:[]
            }; 
            for(let i = 0; i < this.state.documents.length; i++){
                obj.texture.backgroundPositionY1.push(this.state.documents[i].bgY1);
                obj.texture.backgroundPositionY2.push(this.state.documents[i].isScrolled ? this.state.documents[i].bgY2 + obj.upper.top2[i] : this.state.documents[i].bgY2);
            }
            obj.texture.left = Math.floor((obj.upper.width - obj.texture.width)/2);
            obj.texture.top = Math.floor((obj.upper.height - obj.texture.height)/2);
            // side corpus
            obj.sideTexture = {
                width:Math.floor(this.props.ratio * this.state.sideBox.width),
                height:obj.texture.height
            }
            obj.sideTexture.left = obj.texture.width - obj.sideTexture.width;
        }
        // corpus
        obj.center = {
            width:Math.floor(obj.texture.width*9/10),
            height:[]
        }
        for(let i = 0; i < this.state.documents.length; i++){
            obj.center.height.push(Math.floor((obj.upper.top2[i] + (obj.upper.height)/2) - (obj.upper.top1 + (obj.upper.height)/2)));
        }
        obj.center.top = Math.floor(obj.upper.top1 + (obj.upper.height)/2);
        obj.center.left = Math.floor((obj.upper.width - obj.center.width)/2) + obj.upper.left;
        // side corpus
        obj.side = {
            width:Math.floor(this.props.ratio * this.state.sideBox.width),
            height:obj.center.height
        }
        obj.side.left = obj.center.width - obj.side.width;
        // corpus text
        obj.corpus = {
            width:obj.center.width - 2*obj.side.width,
            height:[]
        };
        for(let i = 0; i < this.state.documents.length; i++){
            obj.corpus.height.push(obj.center.height[i]-obj.texture.height);
        }
        return obj;
    }

    scrollDocument = event => {
        let documents = this.state.documents;
        let nb = parseInt(event.currentTarget.dataset.key);
        documents[nb].isScrolled = !documents[nb].isScrolled;
        // dom elements
        let list = document.getElementsByClassName("scrollUpper");
        let upper_scroll = list[nb*2];
        let lower_scroll = list[nb*2 + 1];
        let lower_scroll_sideLeft = document.getElementsByClassName("scrollSide")[nb*4+2];
        let lower_scroll_sideRight = document.getElementsByClassName("scrollSide")[nb*4+3];
        let lower_texture = lower_scroll.children[0];
        let center_texture = document.getElementsByClassName("scroll-center")[nb];
        let documentContainer = document.getElementsByClassName("document-container")[nb];
        let documentSeparator = document.getElementsByClassName("document-separator")[nb];
        let corpus = document.getElementsByClassName("lectures-corpus")[nb];
        // transition
        upper_scroll.removeEventListener('click', this.scrollDocument);
        lower_scroll.removeEventListener('click', this.scrollDocument);
        lower_scroll.style.transition = "1.5s top";
        lower_texture.style.transition = "1.5s background-position-y";
        documentContainer.style.transition = "1.5s height";
        documentSeparator.style.transition = "1.5s top";
        center_texture.style.transition = "1.5s height";
        lower_scroll_sideLeft.style.transition = "1.5s top";
        lower_scroll_sideRight.style.transition = "1.5s top";
        corpus.style.transition = "1.5s height";
        document.getElementsByClassName("side1")[nb].style.transition = "1.5s height";
        document.getElementsByClassName("side2")[nb].style.transition = "1.5s height";
        this.setState({
            documents:documents
        }, () => {
            setTimeout(() => {
                document.getElementById("lectures").scrollTo(0,document.getElementsByClassName("document-container")[nb].offsetTop);
                // transition out 
                upper_scroll.addEventListener('click', this.scrollDocument);
                lower_scroll.addEventListener('click', this.scrollDocument);
                lower_scroll.style.transition = "none";
                lower_texture.style.transition = "none";
                documentContainer.style.transition = "none";
                documentSeparator.style.transition = "none";
                center_texture.style.transition = "none";
                lower_scroll_sideLeft.style.transition = "none";
                lower_scroll_sideRight.style.transition = "none";
                document.getElementsByClassName("side1")[nb].style.transition = "none";
                document.getElementsByClassName("side2")[nb].style.transition = "none";
                corpus.style.transition = "none";
            }, 1500);
        });
    }

    scrollEv = event => {
        let documents = this.state.documents;
        let nb = parseInt(event.currentTarget.dataset.key);
        // get scrolling speed
        var st = event.currentTarget.scrollTop;
        let speed = 8;
        if (st > documents[nb].corpusTop){
            speed *= 1;
        } else {
            speed *= -1;
        }
        
        let size = document.getElementsByClassName("lectures-corpus")[nb].children[0].offsetHeight;
        size -= document.getElementsByClassName("lectures-corpus")[nb].offsetHeight - 20;
        if(st > 0 && Math.sign(speed)===-1){
            documents[nb].bgY1 += speed;
            documents[nb].bgY2 += speed;
            documents[nb].corpusTop = st;
            this.setState({
                documents:documents
            });
        }else if(st < size && Math.sign(speed)===1){
            documents[nb].bgY1 += speed;
            documents[nb].bgY2 += speed;
            documents[nb].corpusTop = st;
            this.setState({
                documents:documents
            });
        }
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"lectures"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>  
                {this.state.documents.map((item, i) => 
                    <div className={"document-container"} key={i} data-id={item.id} style={
                        {
                            height:styles.documentContainer.height[i]
                        }
                    }>
                        {/* center scroll */}
                        <div className={"scroll-center"} style={
                            {
                                height:styles.center.height[i],
                                width:styles.center.width,
                                top:styles.center.top,
                                left:styles.center.left
                            }
                        }>
                            {/* text */}
                            <div className={"lectures-corpus"} data-key={i} onScroll={item.isScrolled ? this.scrollEv : () => {}} style={
                                {
                                    height:styles.corpus.height[i],
                                    width:styles.corpus.width
                                }
                            }>
                                <span>{item.content}</span>
                            </div>
                            {/* sides */}
                            <div className={"side1"} style={
                                {
                                    height:styles.side.height[i],
                                    width:styles.side.width,
                                }
                            }></div>
                            <div className={"side2"} style={
                                {
                                    height:styles.side.height[i],
                                    width:styles.side.width,
                                    left:styles.side.left
                                }
                            }></div>
                        </div>
                    
                        {/* top scroll */}
                        <div className={"scrollUpper"} data-key={i} style={
                            {
                                height:styles.upper.height,
                                width:styles.upper.width,
                                top:styles.upper.top1,
                                left:styles.upper.left,
                            }
                        }>
                            <div className={"scrollTexture"} style={
                                {
                                    height:styles.texture.height,
                                    width:styles.texture.width,
                                    left:styles.texture.left,
                                    top:styles.texture.top,
                                    backgroundPositionY:styles.texture.backgroundPositionY1[i]
                                }
                            }>
                                <span>{item.title}</span>
                            </div>
                        </div>
                        <img className={"scrollSide"} src={leftsideScroll} alt={"side-scroll"} style={
                            {
                                height:styles.scrollSide.height,
                                width:styles.scrollSide.width,
                                top:styles.scrollSideTop,
                                left:styles.scrollSide.left1,
                            }
                        }></img>
                        <img className={"scrollSide"} src={rightsideScroll} alt={"side-scroll"} style={
                            {
                                height:styles.scrollSide.height,
                                width:styles.scrollSide.width,
                                top:styles.scrollSideTop,
                                left:styles.scrollSide.left2,
                            }
                        }></img>
                        {/* bottom scroll */}
                        <div className={"scrollUpper"} data-key={i} style={
                            {
                                height:styles.upper.height,
                                width:styles.upper.width,
                                top:styles.upper.top2[i],
                                left:styles.upper.left,
                            }
                        }>
                            <div className={"scrollTexture2"} style={
                                {
                                    height:styles.texture.height,
                                    width:styles.texture.width,
                                    left:styles.texture.left,
                                    top:styles.texture.top,
                                    backgroundPositionY:styles.texture.backgroundPositionY2[i]
                                }
                            }>
                            </div>
                        </div>
                        <img className={"scrollSide"} src={leftsideScroll} alt={"side-scroll"} style={
                            {
                                height:styles.scrollSide.height,
                                width:styles.scrollSide.width,
                                top:styles.scrollSideBottom[i],
                                left:styles.scrollSide.left1
                            }
                        }></img>
                        <img className={"scrollSide"} src={rightsideScroll} alt={"side-scroll"} style={
                            {
                                height:styles.scrollSide.height,
                                width:styles.scrollSide.width,
                                top:styles.scrollSideBottom[i],
                                left:styles.scrollSide.left2
                            }
                        }></img>
                        <div className={"document-separator"} style={
                            {
                                height:this.state.documentSeparatorBox.height,
                                top:styles.documentContainer.height[i]-this.state.documentSeparatorBox.height,
                            }
                        }></div>
                    </div>
                )}
                
            </div>
        );
    }
}