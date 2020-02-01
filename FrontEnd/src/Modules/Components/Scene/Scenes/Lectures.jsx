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
            scrollSideBox: {
                width: 125,
                height: 83
            },
            sideBox: {
                width: 30,
            },
        }
    }

    componentDidMount = () => {
        // request which asks for document still in reading states for the user
    }

    preparePositions = () => {
        let obj = {};
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
            obj.scrollSideBottom = Math.floor(((this.state.documentContainerBox.height - this.state.documentSeparatorBox.height) - obj.scrollSide.height)/2 + obj.scrollSide.height/2) + 5;
            // scroll upper part
            obj.upper = {
                width:obj.scrollSide.left2 - (obj.scrollSide.left1 + obj.scrollSide.width),
                height:Math.floor(this.props.ratio*this.state.scrollUpperBox.height)
            }; 
            obj.upper.left = obj.scrollSide.left1 + obj.scrollSide.width;
            obj.upper.top1 = obj.scrollSideTop + Math.floor((obj.scrollSide.height - obj.upper.height)/2);
            obj.upper.top2 = obj.scrollSideBottom + Math.floor((obj.scrollSide.height - obj.upper.height)/2);
            // scroll texture
            obj.texture = {
                width:Math.floor(obj.upper.width*9/10),
                height:obj.upper.height
            }; 
            obj.texture.left = Math.floor((obj.upper.width - obj.texture.width)/2);
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
            height:Math.floor((obj.upper.top2 + (obj.upper.height)/2) - (obj.upper.top1 + (obj.upper.height)/2))
        }
        obj.center.top = Math.floor(obj.upper.top1 + (obj.upper.height)/2);
        obj.center.left = Math.floor((obj.upper.width - obj.center.width)/2) + obj.upper.left;
        // side corpus
        obj.side = {
            width:Math.floor(this.props.ratio * this.state.sideBox.width),
            height:obj.center.height
        }
        obj.side.left = obj.center.width - obj.side.width;
        return obj;
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"lectures"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>
                <div className={"document-container"} style={
                    {
                        height:this.state.documentContainerBox.height
                    }
                }>
                    {/* center scroll */}
                    <div className={"scroll-center"} style={
                        {
                            height:styles.center.height,
                            width:styles.center.width,
                            top:styles.center.top,
                            left:styles.center.left
                        }
                    }>
                        {/* text */}

                        {/* sides */}
                        <div className={"side1"} style={
                            {
                                height:styles.side.height,
                                width:styles.side.width,
                            }
                        }></div>
                        <div className={"side2"} style={
                            {
                                height:styles.side.height,
                                width:styles.side.width,
                                left:styles.side.left
                            }
                        }></div>
                    </div>
                
                    {/* top scroll */}
                    <div className={"scrollUpper"} style={
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
                            }
                        }>
                            <span>A random document</span>
                            <div className={"side1"} style={
                                {
                                    height:styles.sideTexture.height,
                                    width:styles.sideTexture.width,
                                }
                            }></div>
                            <div className={"side2"} style={
                                {
                                    height:styles.sideTexture.height,
                                    width:styles.sideTexture.width,
                                    left:styles.sideTexture.left
                                }
                            }></div>
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
                    <div className={"scrollUpper"} style={
                        {
                            height:styles.upper.height,
                            width:styles.upper.width,
                            top:styles.upper.top2,
                            left:styles.upper.left,
                        }
                    }>
                        <div className={"scrollTexture2"} style={
                            {
                                height:styles.texture.height,
                                width:styles.texture.width,
                                left:styles.texture.left,
                            }
                        }>
                            <div className={"side1"} style={
                                {
                                    height:styles.sideTexture.height,
                                    width:styles.sideTexture.width,
                                }
                            }></div>
                            <div className={"side2"} style={
                                {
                                    height:styles.sideTexture.height,
                                    width:styles.sideTexture.width,
                                    left:styles.sideTexture.left
                                }
                            }></div>
                        </div>
                    </div>
                    <img className={"scrollSide"} src={leftsideScroll} alt={"side-scroll"} style={
                        {
                            height:styles.scrollSide.height,
                            width:styles.scrollSide.width,
                            top:styles.scrollSideBottom,
                            left:styles.scrollSide.left1,
                        }
                    }></img>
                    <img className={"scrollSide"} src={rightsideScroll} alt={"side-scroll"} style={
                        {
                            height:styles.scrollSide.height,
                            width:styles.scrollSide.width,
                            top:styles.scrollSideBottom,
                            left:styles.scrollSide.left2,
                        }
                    }></img>
                    <div className={"document-separator"} style={
                        {
                            height:this.state.documentSeparatorBox.height,
                            top:this.state.documentContainerBox.height-this.state.documentSeparatorBox.height,
                        }
                    }></div>
                </div>
            </div>
        );
    }
}