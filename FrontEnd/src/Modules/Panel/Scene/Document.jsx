import React, { Component } from 'react';

import './Document.scss';


export default class Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollPosition: {
                width: 724,
                height: 74
            },
            scrollTexturePosition: {
                width: 492,
                height: 62,
                backgroundY: 825
            },
            lowerScrollPosition: {
                top: 74
            },
            upperScrollTexture: {
                backgroundPositionY: 0
            },
            lowerScrollTexture: {
                backgroundPositionY: 150
            },
            documentContainerPosition: {
                width: 800
            },
            centerScrollPosition: {
                width: 470,
                height: 74,
                backgroundY: 789,
                backgroundPositionY: 0
            },
            isOpen: false
        }
    }

    componentDidMount = () => {
        document.getElementById("upper_scroll").addEventListener('click', ()=>{this.handleScroll()});
        document.getElementById("lower_scroll").addEventListener('click', ()=>{this.handleScroll()});
    }

    handleScroll = () => {
        console.log(this.state.isOpen)
        document.getElementById("upper_scroll").removeEventListener('click', this.handleScroll);
        document.getElementById("lower_scroll").removeEventListener('click', this.handleScroll);
        document.getElementById("lower_scroll_texture").style.transition = "2s background-position-y";
        document.getElementById("scroll_center").style.transition = "2s height";
        
        // open scroll
        let bgY = this.state.isOpen ? -500 : 500;
        this.setState({
            lowerScrollPosition: {
                top: (this.state.isOpen ? 74 : (this.props.windowSize.height + Math.floor(800 * this.props.ratio)) / 2)
            },
            centerScrollPosition: {
                width: 470,
                height: (this.state.isOpen ? 74 : (this.props.windowSize.height + Math.floor(800 * this.props.ratio)) / 2),
                backgroundY: 789,
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
                    document.getElementById("lower_scroll_texture").style.transition = "none";
                    document.getElementById("scroll_center").style.transition = "none";
                });
            }, 2000);
        });
        
    }


    scroll = event => {

        // get scrolling speed
        let speed = event.deltaY / 20;
        // scrolling textures
        this.setState({
            upperScrollTexture: {
                backgroundPositionY: this.state.upperScrollTexture.backgroundPositionY - speed
            },
            lowerScrollTexture: {
                backgroundPositionY: this.state.lowerScrollTexture.backgroundPositionY - speed
            },
            centerScrollPosition: {
                backgroundPositionY: this.state.centerScrollPosition.backgroundPositionY - speed
            }
        });
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