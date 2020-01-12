import React, { Component } from 'react';

import './Document.scss';

import axios from "axios";


export default class Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollPosition: {
                width: 1082,
                height: 95
            },
            scrollTexturePosition: {
                width: 738,
                height: 93,
                backgroundY: 1238
            },
            lowerScrollPosition: {
                top: 111
            },
            upperScrollTexture: {
                backgroundPositionY: 0
            },
            lowerScrollTexture: {
                backgroundPositionY: 150
            },
            documentContainerPosition: {
                width: 1200
            },
            centerScrollPosition: {
                width: 705,
                height: 111,
                backgroundY: 1184,
                backgroundPositionY: 0
            },
            textPosition:{
                top:0
            },
            isOpen: false,
            content:""
        }
    }

    componentDidMount = () => {
        axios.get(`https://platform.x5gon.org/api/v1/oer_materials/${this.props.idDocument}/contents/`)
        .then( request => {
            let content = request.data.oer_contents[0].value.value;
            document.getElementById("upper_scroll").addEventListener('click', ()=>{this.handleScroll()});
            document.getElementById("lower_scroll").addEventListener('click', ()=>{this.handleScroll()});
            this.setState({content:content});
        })
        .catch( error => { 
            console.log(error)
            console.log("this doesn't work");
        });

    }

    handleScroll = () => {
        document.getElementById("upper_scroll").removeEventListener('click', this.handleScroll);
        document.getElementById("lower_scroll").removeEventListener('click', this.handleScroll);
        document.getElementById("lower_scroll").style.transition = "2s top";
        document.getElementById("lower_scroll_texture").style.transition = "2s background-position-y";
        document.getElementById("scroll_center").style.transition = "2s height";
        
        // open scroll
        let bgY = this.state.isOpen ? -500 : 500;
        this.setState({
            lowerScrollPosition: {
                top: (this.state.isOpen ? 111 : (this.props.windowSize.height + Math.floor(800 * this.props.ratio)) / 2)
            },
            centerScrollPosition: {
                width: 705,
                height: (this.state.isOpen ? 111 : (this.props.windowSize.height + Math.floor(800 * this.props.ratio)) / 2),
                backgroundY: 1184,
                backgroundPositionY: 0
            },
            lowerScrollTexture: {
                backgroundPositionY: this.state.lowerScrollTexture.backgroundPositionY + bgY
            }
        }, () => {
            setTimeout(() => {
                this.setState({
                    isOpen: !this.state.isOpen
                }, () => {
                    document.getElementById("upper_scroll").addEventListener('click', this.handleScroll);
                    document.getElementById("lower_scroll").addEventListener('click', this.handleScroll);
                    document.getElementById("lower_scroll").style.transition = "none";
                    document.getElementById("lower_scroll_texture").style.transition = "none";
                    document.getElementById("scroll_center").style.transition = "none";
                });
            }, 2000);
        });
        
    }


    scroll = event => {

        // get scrolling speed
        let speed = event.deltaY / 10;
        // scrolling textures
        let textdiv = document.getElementById('scroll-text');
        let condUp = Math.abs(this.state.textPosition.top) > 0;
        let condDown = textdiv.offsetHeight >= Math.abs(this.state.textPosition.top) + this.state.centerScrollPosition.height /2;
        let condfinal = (condUp && condDown) || (condUp && Math.sign(speed) === -1) || (condDown && Math.sign(speed) === 1);
        if(condfinal){
            this.setState({
                upperScrollTexture: {
                    backgroundPositionY: this.state.upperScrollTexture.backgroundPositionY + speed
                },
                lowerScrollTexture: {
                    backgroundPositionY: this.state.lowerScrollTexture.backgroundPositionY + speed
                },
                centerScrollPosition: {
                    width: this.state.centerScrollPosition.width,
                    height: this.state.centerScrollPosition.height,
                    backgroundY: this.state.centerScrollPosition.backgroundY,
                    backgroundPositionY: this.state.centerScrollPosition.backgroundPositionY - speed
                },
                textPosition:{
                    top:this.state.textPosition.top - speed
                }
            });
        }
    }

    render() {
        let documentContainerPosition = {
            top: isNaN(this.props.windowSize.height) ? 0 : (this.props.windowSize.height - Math.floor(800 * this.props.ratio)) / 2,
            left: isNaN(this.props.windowSize.width) ? 0 : (this.props.windowSize.width - Math.floor(this.state.documentContainerPosition.width * this.props.ratio)) / 2,
            width: Math.floor(this.state.documentContainerPosition.width * this.props.ratio)
        };
        let UpperScrollPosition = {
            top: 0,
            left: (documentContainerPosition.width - Math.floor(this.state.scrollPosition.width * this.props.ratio)) / 2,
            width: Math.floor(this.state.scrollPosition.width * this.props.ratio),
            height: Math.floor(this.state.scrollPosition.height * this.props.ratio)
        };
        let UpperScrollTexturePosition = {
            top: (UpperScrollPosition.height - Math.floor(this.state.scrollTexturePosition.height * this.props.ratio)) / 2,
            left: (UpperScrollPosition.width - Math.floor(this.state.scrollTexturePosition.width * this.props.ratio)) / 2,
            width: Math.floor(this.state.scrollTexturePosition.width * this.props.ratio),
            height: Math.floor(this.state.scrollTexturePosition.height * this.props.ratio),
            backgroundY: Math.floor(this.state.scrollTexturePosition.backgroundY * this.props.ratio)
        };
        let LowerScrollPosition = {
            top: Math.floor(this.state.lowerScrollPosition.top * this.props.ratio),
            left: (documentContainerPosition.width - Math.floor(this.state.scrollPosition.width * this.props.ratio)) / 2,
            width: Math.floor(this.state.scrollPosition.width * this.props.ratio),
            height: Math.floor(this.state.scrollPosition.height * this.props.ratio)
        };
        let LowerScrollTexturePosition = {
            top: (LowerScrollPosition.height - Math.floor(this.state.scrollTexturePosition.height * this.props.ratio)) / 2,
            left: (LowerScrollPosition.width - Math.floor(this.state.scrollTexturePosition.width * this.props.ratio)) / 2,
            width: Math.floor(this.state.scrollTexturePosition.width * this.props.ratio),
            height: Math.floor(this.state.scrollTexturePosition.height * this.props.ratio),
            backgroundY: Math.floor(this.state.scrollTexturePosition.backgroundY * this.props.ratio)
        };
        let centerScrollPosition = {
            top: (UpperScrollPosition.height) / 2,
            left: (documentContainerPosition.width - Math.floor(this.state.centerScrollPosition.width * this.props.ratio)) / 2,
            width: Math.floor(this.state.centerScrollPosition.width * this.props.ratio),
            height: Math.floor(this.state.centerScrollPosition.height * this.props.ratio),
            backgroundY: Math.floor(this.state.centerScrollPosition.backgroundY * this.props.ratio)
        };
        return (
            <div id={"document_open"} onWheel={this.scroll} style={
                {
                    top: documentContainerPosition.top,
                    left: documentContainerPosition.left,
                    width: documentContainerPosition.width,
                    height: documentContainerPosition.height
                }
            }>
                {/* center scroll */}
                <div id={"scroll_center"} style={
                    {
                        top: centerScrollPosition.top,
                        left: centerScrollPosition.left,
                        width: centerScrollPosition.width,
                        height: centerScrollPosition.height,
                        backgroundSize: `${centerScrollPosition.width}px ${centerScrollPosition.backgroundY}px`,
                        backgroundPositionY: this.state.centerScrollPosition.backgroundPositionY
                    }
                }>
                    <span id={"scroll-text"} style={
                        {
                            top:this.state.textPosition.top
                        }
                    }>{this.state.content}</span>
                </div>

                {/* Upper scroll */}
                <div id={"upper_scroll"} className={"scroll"} style={
                    {
                        top: UpperScrollPosition.top,
                        left: UpperScrollPosition.left,
                        width: UpperScrollPosition.width,
                        height: UpperScrollPosition.height,
                        backgroundSize: `${UpperScrollPosition.width}px ${UpperScrollPosition.height}px`
                    }
                }>
                    <div id={"upper_scroll_texture"} className={"scroll_texture"} style={
                        {
                            top: UpperScrollTexturePosition.top,
                            left: UpperScrollTexturePosition.left,
                            width: UpperScrollTexturePosition.width,
                            height: UpperScrollTexturePosition.height,
                            backgroundSize: `${UpperScrollTexturePosition.width}px ${UpperScrollTexturePosition.backgroundY}px`,
                            backgroundPositionY: this.state.upperScrollTexture.backgroundPositionY
                        }
                    }></div>
                </div>

                {/* Lower scroll */}
                <div id={"lower_scroll"} className={"scroll"} style={
                    {
                        top: LowerScrollPosition.top,
                        left: LowerScrollPosition.left,
                        width: LowerScrollPosition.width,
                        height: LowerScrollPosition.height,
                        backgroundSize: `${LowerScrollPosition.width}px ${LowerScrollPosition.height}px`
                    }
                }>
                    <div id={"lower_scroll_texture"} className={"scroll_texture"} style={
                        {
                            top: LowerScrollTexturePosition.top,
                            left: LowerScrollTexturePosition.left,
                            width: LowerScrollTexturePosition.width,
                            height: LowerScrollTexturePosition.height,
                            backgroundSize: `${LowerScrollTexturePosition.width}px ${LowerScrollTexturePosition.backgroundY}px`,
                            backgroundPositionY: this.state.lowerScrollTexture.backgroundPositionY
                        }
                    }></div>
                </div>


            </div>
        );
    }
}