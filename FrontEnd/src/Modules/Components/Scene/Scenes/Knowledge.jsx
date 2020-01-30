import React, { Component } from 'react';

import './Knowledge.css';

import axios from "axios";

import Popover from '../../Popover/Popover';

import chair from '../../../../assets/Panel/Scene/Knowledge/chair.png';
import bookshelf from '../../../../assets/Panel/Scene/Knowledge/bookshelf.png';
import lantern from '../../../../assets/Panel/Scene/Knowledge/lantern.png';
import librarian from '../../../../assets/Panel/Scene/Knowledge/librarian.png';
import librarianSeeking from '../../../../assets/Panel/Scene/Knowledge/librarianSeeking.png';
import librarianAnswering from '../../../../assets/Panel/Scene/Knowledge/librarianAnswering.png';

export default class Knowledge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beamBox: {
                size: 60
            },
            railingBox: {
                size: 10
            },
            chairBox:{
                width:202,
                height:106
            },
            bookshelfBox:{
                width:477,
                height:464
            },
            librarianBox:{
                width:297,
                height:630
            },
            librarianHoverBox:{
                width:297,
                height:396
            },
            lanternBox:{
                width:138,
                height:323
            },
            isHovered:false,
            isClicked:false
        }
    }

    componentDidMount = () => {
    }

    preparePositions = () => {
        let obj = {};
        //beams
        if (true) {
            // vertical beams
            obj.verticalBeam = {
                width: Math.ceil(this.state.beamBox.size * this.props.ratio),
                height: this.props.scene.height
            };
            obj.verticalBeam.left = {
                left: Math.floor(this.props.scene.width * 1 / 3 - (obj.verticalBeam.width / 2)),
                top: 0
            }
            obj.verticalBeam.right = {
                left: Math.floor(this.props.scene.width * 2 / 3 - (obj.verticalBeam.width / 2)),
                top: 0
            }
            // horizontal beams
            obj.horizontalBeam = {
                width: obj.verticalBeam.left.left,
                height: Math.ceil(this.state.beamBox.size * this.props.ratio)
            };
            obj.horizontalBeam.left = {
                left: 0,
                top: Math.floor((this.props.scene.height - obj.horizontalBeam.height) / 2)
            }
            obj.horizontalBeam.right = {
                left: obj.verticalBeam.right.left + obj.verticalBeam.width,
                top: Math.floor((this.props.scene.height - obj.horizontalBeam.height) / 2)
            }
            obj.horizontalBeam.top = {
                left: obj.verticalBeam.left.left + obj.verticalBeam.width,
                top: Math.floor(this.props.scene.height * 1 / 4 - (obj.horizontalBeam.height / 2)),
            }
            obj.horizontalBeam.bottom = {
                left: obj.verticalBeam.left.left + obj.verticalBeam.width,
                top: Math.floor(this.props.scene.height * 3 / 4 - (obj.horizontalBeam.height / 2)),
            }
        }
        //window
        if (true) {
            //window
            obj.window = {
                left: obj.verticalBeam.left.left + obj.verticalBeam.width,
                top: obj.horizontalBeam.top.top + obj.horizontalBeam.height,
            };
            obj.window.width = obj.verticalBeam.right.left - obj.window.left;
            obj.window.height = obj.horizontalBeam.bottom.top - obj.window.top;
            // vertical railing
            obj.verticalRailing = {
                width: Math.ceil(this.state.railingBox.size * this.props.ratio),
                height: obj.window.height
            };
            obj.verticalRailing.left = [
                0,
                Math.floor((obj.window.width - 2 * obj.verticalRailing.width) * 1 / 4 + obj.verticalRailing.width / 2),
                Math.floor((obj.window.width - 2 * obj.verticalRailing.width) * 1 / 2 + obj.verticalRailing.width / 2),
                Math.floor((obj.window.width - 2 * obj.verticalRailing.width) * 3 / 4 + obj.verticalRailing.width / 2),
                obj.window.width - obj.verticalRailing.width
            ]
            // horizontal railing
            obj.horizontalRailing = {
                width: obj.window.width,
                height: Math.ceil(this.state.railingBox.size * this.props.ratio)
            };
            obj.horizontalRailing.top = [
                0,
                Math.floor((obj.window.height - 2 * obj.horizontalRailing.height) * 1 / 4 + obj.horizontalRailing.height / 2),
                Math.floor((obj.window.height - 2 * obj.horizontalRailing.height) * 1 / 2 + obj.horizontalRailing.height / 2),
                Math.floor((obj.window.height - 2 * obj.horizontalRailing.height) * 3 / 4 + obj.horizontalRailing.height / 2),
                obj.window.height - obj.horizontalRailing.height
            ]
        }
        // chair
        obj.chair = {
            width:Math.floor(this.state.chairBox.width * this.props.ratio),
            height:Math.floor(this.state.chairBox.height * this.props.ratio),
        }
        obj.chair.left = Math.floor((this.props.scene.width - obj.chair.width)/2)
        obj.chair.top = this.props.scene.height - obj.chair.height
        // bookshelf
        obj.bookshelf = {
            width:Math.floor(this.state.bookshelfBox.width * this.props.ratio),
            height:Math.floor(this.state.bookshelfBox.height * this.props.ratio),
        }
        obj.bookshelf.left = - Math.floor(obj.bookshelf.width/20)
        obj.bookshelf.top = this.props.scene.height - obj.bookshelf.height
        // lantern
        obj.lantern = {
            width:Math.floor(this.state.lanternBox.width * this.props.ratio),
            height:Math.floor(this.state.lanternBox.height * this.props.ratio),
        }
        obj.lantern.left = Math.floor(this.props.scene.width*1/4 - obj.lantern.width/2);
        // librarian
        obj.librarian = {
            width:Math.floor(this.state.librarianBox.width * this.props.ratio),
            height:Math.floor(this.state.librarianBox.height * this.props.ratio),
        }
        obj.librarian.left = Math.floor(this.props.scene.width*8/10 - obj.librarian.width/2);
        obj.librarian.top = this.props.scene.height - obj.librarian.height;
        // librarianHover
        obj.hover = {
            width:Math.floor(this.state.librarianHoverBox.width * this.props.ratio),
            height:Math.floor(this.state.librarianHoverBox.height * this.props.ratio),
        }
        obj.hover.left = Math.floor(this.props.scene.width*8/10 - obj.hover.width/2);
        obj.hover.top = Math.floor(obj.librarian.top + 1/4 * obj.librarian.height)
        return obj;
    }

    hover = () => {
        this.setState({
            isHovered:!this.state.isHovered
        });
    }

    handleClick = () => {
        this.setState({
            isClicked:!this.state.isClicked
        }, () => {
            console.log(this.state.isClicked)
        });
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"knowledge"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>
                {/* Beams */}
                <div id={"beam"}>
                    <div className={"beam"} style={
                        {
                            width: styles.verticalBeam.width,
                            height: styles.verticalBeam.height,
                            left: styles.verticalBeam.left.left,
                            top: styles.verticalBeam.left.top
                        }
                    }></div>
                    <div className={"beam"} style={
                        {
                            width: styles.verticalBeam.width,
                            height: styles.verticalBeam.height,
                            left: styles.verticalBeam.right.left,
                            top: styles.verticalBeam.right.top
                        }
                    }></div>
                    <div className={"beam"} style={
                        {
                            width: styles.horizontalBeam.width,
                            height: styles.horizontalBeam.height,
                            left: styles.horizontalBeam.left.left,
                            top: styles.horizontalBeam.left.top
                        }
                    }></div>
                    <div className={"beam"} style={
                        {
                            width: styles.horizontalBeam.width,
                            height: styles.horizontalBeam.height,
                            left: styles.horizontalBeam.right.left,
                            top: styles.horizontalBeam.right.top
                        }
                    }></div>
                    <div className={"beam"} style={
                        {
                            width: styles.horizontalBeam.width,
                            height: styles.horizontalBeam.height,
                            left: styles.horizontalBeam.top.left,
                            top: styles.horizontalBeam.top.top
                        }
                    }></div>
                    <div className={"beam"} style={
                        {
                            width: styles.horizontalBeam.width,
                            height: styles.horizontalBeam.height,
                            left: styles.horizontalBeam.bottom.left,
                            top: styles.horizontalBeam.bottom.top
                        }
                    }></div>
                </div>

                <div className={"window"} style={
                    {
                        width: styles.window.width,
                        height: styles.window.height,
                        left: styles.window.left,
                        top: styles.window.top
                    }
                }>
                    {/* Railing */}
                    {styles.verticalRailing.left.map((left, i) =>
                        <div key={i} className={"railing vertical"} style={
                            {
                                width: styles.verticalRailing.width,
                                height: styles.verticalRailing.height,
                                left: left,
                            }
                        }></div>)
                    }
                    {styles.horizontalRailing.top.map((top, i) =>
                        <div key={i} className={"railing horizontal"} style={
                            {
                                width: styles.horizontalRailing.width,
                                height: styles.horizontalRailing.height,
                                top: top,
                            }
                        }></div>)
                    }
                </div>
            
                <img id={"knowledge-chair"} src={chair} alt={"chair"} style={
                    {
                        top:styles.chair.top,
                        left:styles.chair.left,
                        width:styles.chair.width,
                        height:styles.chair.height,
                    }
                }></img>

                <img id={"bookshelf"} src={bookshelf} alt={"bookshelf"} style={
                    {
                        top:styles.bookshelf.top,
                        left:styles.bookshelf.left,
                        width:styles.bookshelf.width,
                        height:styles.bookshelf.height,
                    }
                }></img>

                <img id={"knowledge-lantern"} src={lantern} alt={"lantern"} style={
                    {
                        left:styles.lantern.left,
                        width:styles.lantern.width,
                        height:styles.lantern.height,
                    }
                }></img>

                <div id={"knowledge-hover"} style={
                    {
                        top:styles.hover.top,
                        left:styles.hover.left,
                        width:styles.hover.width,
                        height:styles.hover.height,
                        borderRadius: Math.floor(styles.hover.width/2) + "px / " + Math.floor(styles.hover.height/2)  + 'px',
                        visibility:this.state.isHovered?"visible":"hidden"
                    }
                }></div>

                <img id={"librarian"} src={librarian} alt={"librarian"} onMouseEnter={this.hover} onMouseLeave={this.hover} onClick={this.handleClick} style={
                    {
                        top:styles.librarian.top,
                        left:styles.librarian.left,
                        width:styles.librarian.width,
                        height:styles.librarian.height,
                    }
                }></img>

                <Popover id={"librarian-dialog"} target={styles.librarian} ratio={1/2} side={"left"} size={{width:300, height:200}} 
                    isOpen={this.state.isClicked && this.props.isOpen} title={"Librarian"}></Popover>
            </div>
        );
    }
}