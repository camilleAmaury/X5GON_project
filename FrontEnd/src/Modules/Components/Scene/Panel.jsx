import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';
import Cursor from '../Cursor/Cursor';

import './Panel.css';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PanelBox: {
                width: 0,
                height: 0
            },
            FloorBox: {
                height: 30
            },
            NavbarBox:{
                width:320
            },
            DoorBox:{
                width:800
            },
            ratio: 1
        }
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.resize);
        let panel = document.getElementById("Panel");
        this.setState({
            PanelBox: {
                width: panel.clientWidth,
                height: panel.clientHeight
            },
            ratio: panel.clientWidth / 1920
        });
    }

    resize = () => {
        let panel = document.getElementById("Panel");
        this.setState({
            PanelBox: {
                width: panel.clientWidth,
                height: panel.clientHeight
            },
            ratio: panel.clientWidth / 1920
        });
    }

    preparePositions = () => {
        let obj = {};
        let pilarSize = Math.floor(this.state.FloorBox.height * this.state.ratio);
        // floor
        obj.floor = {
            width: this.state.PanelBox.width,
            height: pilarSize * 2,
        };
        obj.floor.top = this.state.PanelBox.height - obj.floor.height;
        // bottom pilars
        obj.floorPilars = {
            top: pilarSize,
            width:obj.floor.width,
            height:pilarSize
        };
        // bottom pilar
        obj.floorPilar = {
            width: pilarSize,
            height: pilarSize,
            left1: 0
        };
        obj.floorPilar.left5 = this.state.PanelBox.width - obj.floorPilar.width;
        obj.floorPilar.left4 = Math.floor(3 * (this.state.PanelBox.width - obj.floorPilar.width) / 4);
        obj.floorPilar.left3 = Math.floor((this.state.PanelBox.width - obj.floorPilar.width) / 2);
        obj.floorPilar.left2 = Math.floor((this.state.PanelBox.width - obj.floorPilar.width) / 4);
        // floor bottom
        obj.floorBottom = {
            width:obj.floor.width,
            height:pilarSize
        };
        // navbar box
        obj.navbar = {
            width: Math.floor(this.state.NavbarBox.width * this.state.ratio),
            height: this.state.PanelBox.height - obj.floor.height
        };
        // roof
        obj.roof = {
            width: this.state.PanelBox.width - obj.navbar.width,
            height: pilarSize * 2,
            left:obj.navbar.width,
        };
        // roof pilars
        obj.roofPilars = {
            width:obj.roof.width,
            height:pilarSize
        };
        // roof pilar
        obj.roofPilar = {
            width: pilarSize,
            height: pilarSize,
            left1: 0
        };
        obj.roofPilar.left4 = obj.roofPilars.width - obj.roofPilar.width;
        obj.roofPilar.left3 = Math.floor((obj.roofPilars.width - obj.roofPilar.width - pilarSize*2) / 2);
        obj.roofPilar.left2 = Math.floor((obj.roofPilars.width - obj.roofPilar.width + pilarSize*2) / 2);
        // roof roof
        obj.roofRoof = {
            top:pilarSize,
            width:obj.roof.width,
            height:pilarSize
        }
        // bottom bottom
        obj.bottombottom = {
            top:obj.floor.top-pilarSize,
            left:obj.navbar.width,
            width:this.state.PanelBox.width - obj.navbar.width,
            height:pilarSize
        }
        // left door
        let doorwidth = Math.floor(this.state.DoorBox.width * this.state.ratio);
        let doorheight = obj.floor.top - obj.roof.height;
        obj.leftDoor = {
            top:obj.roof.height,
            left:obj.navbar.width,
            width:doorwidth,
            height:doorheight
        }
        // right door
        obj.rightDoor = {
            top:obj.roof.height,
            left:obj.leftDoor.width + obj.leftDoor.left,
            width:doorwidth,
            height:doorheight
        }
        return obj;
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"Panel"}>
                <Cursor windowSize={this.state.PanelBox}></Cursor>
                <Navbar ratio={this.state.ratio} PanelBox={this.state.PanelBox} NavbarBox={styles.navbar}></Navbar> 
                <div id={"floor"} style={
                    {
                        top: styles.floor.top,
                        width: styles.floor.width,
                        height: styles.floor.height
                    }
                }>
                    <div id={"bottom-pilars"} style={
                        {
                            top: styles.floorPilars.top,
                            height:styles.floorPilars.height,
                            width:styles.floorPilars.width
                        }
                    }>
                        <div className={"bottom-pilar"} style={
                            {
                                left: styles.floorPilar.left1,
                                width: styles.floorPilar.width,
                                height: styles.floorPilar.height
                            }
                        }></div>
                        <div className={"bottom-pilar"} style={
                            {
                                left: styles.floorPilar.left2,
                                width: styles.floorPilar.width,
                                height: styles.floorPilar.height
                            }
                        }></div>
                        <div className={"bottom-pilar"} style={
                            {
                                left: styles.floorPilar.left3,
                                width: styles.floorPilar.width,
                                height: styles.floorPilar.height
                            }
                        }></div>
                        <div className={"bottom-pilar"} style={
                            {
                                left: styles.floorPilar.left4,
                                width: styles.floorPilar.width,
                                height: styles.floorPilar.height
                            }
                        }></div>
                        <div className={"bottom-pilar"} style={
                            {
                                left: styles.floorPilar.left5,
                                width: styles.floorPilar.width,
                                height: styles.floorPilar.height
                            }
                        }></div>
                    </div>
                    <div id={"bottom-floor"} style={
                        {
                            width: styles.floorBottom.width,
                            height: styles.floorBottom.height
                        }
                    }></div>
                </div>
                <div id={"bottom-bottom"} style={
                        {
                            top:styles.bottombottom.top,
                            left:styles.bottombottom.left,
                            width:styles.bottombottom.width,
                            height:styles.bottombottom.height
                        }
                }></div>
                <div id={"roof"} style={
                    {
                        left: styles.roof.left,
                        width: styles.roof.width,
                        height: styles.roof.height
                    }
                }>
                    <div id={"roof-pilars"} style={
                        {
                            height:styles.roofPilars.height,
                            width:styles.roofPilars.width
                        }
                    }>
                        <div className={"roof-pilar"} style={
                            {
                                left: styles.roofPilar.left1,
                                height:styles.roofPilar.height,
                                width:styles.roofPilar.width
                            }
                        }></div>
                        <div className={"roof-pilar"} style={
                            {
                                left: styles.roofPilar.left2,
                                height:styles.roofPilar.height,
                                width:styles.roofPilar.width
                            }
                        }></div>
                        <div className={"roof-pilar"} style={
                            {
                                left: styles.roofPilar.left3,
                                height:styles.roofPilar.height,
                                width:styles.roofPilar.width
                            }
                        }></div>
                        <div className={"roof-pilar"} style={
                            {
                                left: styles.roofPilar.left4,
                                height:styles.roofPilar.height,
                                width:styles.roofPilar.width
                            }
                        }></div>
                    </div>
                    <div id={"roof-roof"} style={
                        {
                            top : styles.roofRoof.top,
                            width: styles.roofRoof.width,
                            height: styles.roofRoof.height
                        }
                    }></div>
                </div>
                <div id={"left-door"} className={"door"} style={
                        {
                            top:styles.leftDoor.top,
                            left:styles.leftDoor.left,
                            width:styles.leftDoor.width,
                            height:styles.leftDoor.height,
                            backgroundSize:styles.leftDoor.width+"px "+styles.leftDoor.height + "px"
                        }
                }></div>
                <div id={"right-door"} className={"door"} style={
                        {
                            top:styles.rightDoor.top,
                            left:styles.rightDoor.left,
                            width:styles.rightDoor.width,
                            height:styles.rightDoor.height,
                            backgroundSize:styles.leftDoor.width+"px "+styles.leftDoor.height + "px"
                        }
                }></div>
            </div>
        );
    }
}