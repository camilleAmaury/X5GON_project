import React, { Component} from 'react';
import { Redirect } from 'react-router';

import Navbar from '../Navbar/Navbar';
import Cursor from '../Cursor/Cursor';
import Scene from './Scene';
import ScholarBubble from '../Popover/ScholarPopover';

// import lantern from '../../../assets/Panel/lantern.png';
// import bonsai from '../../../assets/Panel/bonsai.png';

import './Panel.css';

export default class Panel extends Component {
    _isMounted=true;

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
            NavbarBox: {
                width: 320
            },
            DoorBox: {
                width: 800
            },
            // lanternBox:{
            //     width:131,
            //     height:235
            // },
            // bonsaiBox:{
            //     width:179,
            //     height:238
            // },
            ratio: 1,
            SceneOpened: [false, false, false, false, true],
            isSceneOpen: true,
            isAnimationOpenEnded: true,
            isAnimationCloseEnded: true,
            animationTime: 1500
        };
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.resize);
        let panel = document.getElementById("Panel");
        if(this._isMounted){
            this.setState({
                PanelBox: {
                    width: panel.clientWidth,
                    height: panel.clientHeight
                },
                ratio: panel.clientWidth / 1920
            });
        }
        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    isConnected = () => {
        if(localStorage.getItem("isConnected") === null || localStorage.getItem("isConnected") === undefined){
            return <Redirect to='/'/>;
        }
    }

    resize = () => {
        let panel = document.getElementById("Panel");
        if(this._isMounted){
            this.setState({
                PanelBox: {
                    width: panel.clientWidth,
                    height: panel.clientHeight
                },
                ratio: panel.clientWidth / 1920
            });
        }
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
            width: obj.floor.width,
            height: pilarSize
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
            width: obj.floor.width,
            height: pilarSize
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
            left: obj.navbar.width,
        };
        // roof pilars
        obj.roofPilars = {
            width: obj.roof.width,
            height: pilarSize
        };
        // roof pilar
        obj.roofPilar = {
            width: pilarSize,
            height: pilarSize,
            left1: 0
        };
        obj.roofPilar.left4 = obj.roofPilars.width - obj.roofPilar.width;
        obj.roofPilar.left3 = Math.floor((obj.roofPilars.width - obj.roofPilar.width - pilarSize * 2) / 2);
        obj.roofPilar.left2 = Math.floor((obj.roofPilars.width - obj.roofPilar.width + pilarSize * 2) / 2);
        // roof roof
        obj.roofRoof = {
            top: pilarSize,
            width: obj.roof.width,
            height: pilarSize
        };
        // bottom bottom
        obj.bottombottom = {
            top: obj.floor.top - pilarSize,
            left: obj.navbar.width,
            width: this.state.PanelBox.width - obj.navbar.width,
            height: pilarSize
        };
        // left door
        let doorwidth = Math.ceil(this.state.DoorBox.width * this.state.ratio);
        let doorheight = obj.floor.top - obj.roof.height;
        obj.leftDoor = {
            top: obj.roof.height,
            left: this.state.isSceneOpen ? Math.floor(obj.navbar.width - doorwidth + doorwidth / 10) : obj.navbar.width,
            width: doorwidth,
            height: doorheight
        };
        // right door
        obj.rightDoor = {
            top: obj.roof.height,
            left: this.state.isSceneOpen ? Math.floor(2 * doorwidth + obj.navbar.width - doorwidth / 10) : doorwidth + obj.navbar.width,
            width: doorwidth,
            height: doorheight
        };
        // scene
        obj.scene = {
            top: obj.roof.height,
            left: Math.floor(obj.navbar.width + doorwidth / 10),
            width: Math.floor(2 * doorwidth + obj.navbar.width - doorwidth / 10) - (Math.floor(obj.navbar.width + doorwidth / 10)),
            height: doorheight - obj.bottombottom.height
        };
        // lantern
        // obj.sceneLantern = {
        //     width: Math.floor(this.state.lanternBox.width*this.state.ratio),
        //     height: Math.floor(this.state.lanternBox.height*this.state.ratio),
        // };
        // obj.sceneLantern.top = obj.scene.top;
        // obj.sceneLantern.left = Math.floor(obj.scene.width * 1 / 20 - obj.sceneLantern.width/2) + obj.scene.left;
        // bonsai
        // obj.sceneBonsai = {
        //     width: Math.floor(this.state.bonsaiBox.width*this.state.ratio),
        //     height: Math.floor(this.state.bonsaiBox.height*this.state.ratio),
        // };
        // obj.sceneBonsai.top = obj.floor.top - obj.sceneBonsai.height;
        // obj.sceneBonsai.left = Math.floor(obj.scene.width * 1 / 20 - obj.sceneBonsai.width/2) + obj.scene.left;
        return obj;
    }

    onIconClick = (i) => {
        if(this._isMounted){
            let iconClick = this.state.SceneOpened;
            if (iconClick[i]) {
                // close the door
                iconClick = [false, false, false, false, false];
                this.CloseScene(iconClick, null);
            } else {
                if (this.state.isSceneOpen) {
                    // close + open
                    iconClick = [false, false, false, false, false];
                    this.CloseScene(iconClick, i);
                } else {
                    // open
                    iconClick = [false, false, false, false, false];
                    iconClick[i] = true;
                    this.OpenScene(iconClick);
                }
            }
        }
    }

    OpenScene = (OpenScene) => {
        // if open animation and close animation have already ended, everything's okay for animation
        if (this.state.isAnimationOpenEnded && this.state.isAnimationCloseEnded) {
            // add transition state (not in css to prevent resize left animation)
            let transition = `left ${this.state.animationTime / 1000}s ease-in-out`;
            document.getElementById("left-door").style.transition = transition;
            document.getElementById("right-door").style.transition = transition;
            if(this._isMounted){
                this.setState({
                    SceneOpened: OpenScene,
                    isAnimationOpenEnded: false
                }, () => {
                    setTimeout(() => {
                        if(this._isMounted){
                            // after loading the content we can know animate
                            this.setState({
                                isSceneOpen: true
                            }, () => {
                                // waiting the animation time to re-give right to click on icons + load some future contents
                                setTimeout(() => {
                                    if(this._isMounted){
                                        this.setState({
                                            isAnimationOpenEnded: true
                                        }, () => {
                                            document.getElementById("left-door").style.transition = "none";
                                            document.getElementById("right-door").style.transition = "none";
                                        });
                                    }
                                }, this.state.animationTime);
                            });
                        }
                    }, 500);

                });
            }
        }
    }

    CloseScene = (openScene, key) => {
        // if open animation and close animation have already ended, everything's okay for animation
        if (this.state.isAnimationOpenEnded && this.state.isAnimationCloseEnded) {
            // add transition state (not in css to prevent resize left animation)
            let transition = `left ${this.state.animationTime / 1000}s ease-in-out`;
            document.getElementById("left-door").style.transition = transition;
            document.getElementById("right-door").style.transition = transition;
            if(this._isMounted){
                this.setState({
                    isAnimationCloseEnded: false
                }, () => {
                    if(this._isMounted){
                        // after loading the content we can know animate
                        this.setState({
                            isSceneOpen: false
                        }, () => {
                            // waiting the animation time to re-give right to click on icons + load some future contents
                            setTimeout(() => {
                                if(this._isMounted){
                                    this.setState({
                                        isAnimationCloseEnded: true,
                                        SceneOpened: openScene,
                                    }, () => {
                                        document.getElementById("left-door").style.transition = "none";
                                        document.getElementById("right-door").style.transition = "none";
                                        if (key !== null) {
                                            setTimeout(() => {
                                                openScene[key] = true;
                                                this.OpenScene(openScene);
                                            }, 500);
                                        }
                                    });
                                }
                            }, this.state.animationTime);
                        });
                    }
                });
            }
        }
    }

    knowledgeSearch = (value) => {
        this.onIconClick(1);
        try{
            this.refs.scene.refs.knowledge.askQuestion(value)
        }catch(error){
            console.log("Refs error");
        }
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"Panel"}>
                {this.isConnected()}
                <Cursor windowSize={this.state.PanelBox}></Cursor>
                <Navbar ratio={this.state.ratio} PanelBox={this.state.PanelBox} NavbarBox={styles.navbar} clickIcon={this.onIconClick} knowledgeSearch={this.knowledgeSearch}></Navbar>
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
                            height: styles.floorPilars.height,
                            width: styles.floorPilars.width
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
                        top: styles.bottombottom.top,
                        left: styles.bottombottom.left,
                        width: styles.bottombottom.width,
                        height: styles.bottombottom.height
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
                            height: styles.roofPilars.height,
                            width: styles.roofPilars.width
                        }
                    }>
                        <div className={"roof-pilar"} style={
                            {
                                left: styles.roofPilar.left1,
                                height: styles.roofPilar.height,
                                width: styles.roofPilar.width
                            }
                        }></div>
                        <div className={"roof-pilar"} style={
                            {
                                left: styles.roofPilar.left2,
                                height: styles.roofPilar.height,
                                width: styles.roofPilar.width
                            }
                        }></div>
                        <div className={"roof-pilar"} style={
                            {
                                left: styles.roofPilar.left3,
                                height: styles.roofPilar.height,
                                width: styles.roofPilar.width
                            }
                        }></div>
                        <div className={"roof-pilar"} style={
                            {
                                left: styles.roofPilar.left4,
                                height: styles.roofPilar.height,
                                width: styles.roofPilar.width
                            }
                        }></div>
                    </div>
                    <div id={"roof-roof"} style={
                        {
                            top: styles.roofRoof.top,
                            width: styles.roofRoof.width,
                            height: styles.roofRoof.height
                        }
                    }></div>
                </div>
                <Scene style={styles.scene} ratio={this.state.ratio} sceneOpened={this.state.SceneOpened} clickIcon={this.onIconClick} ref={"scene"} isMounted={this._isMounted}></Scene>
                <div id={"left-door"} className={"door"} style={
                    {
                        top: styles.leftDoor.top,
                        left: styles.leftDoor.left,
                        width: styles.leftDoor.width,
                        height: styles.leftDoor.height,
                        backgroundSize: styles.leftDoor.width + "px " + styles.leftDoor.height + "px"
                    }
                }></div>
                <div id={"right-door"} className={"door"} style={
                    {
                        top: styles.rightDoor.top,
                        left: styles.rightDoor.left,
                        width: styles.rightDoor.width,
                        height: styles.rightDoor.height,
                        backgroundSize: styles.leftDoor.width + "px " + styles.leftDoor.height + "px"
                    }
                }></div>
                {/* <div id={"scene-lantern"} className={"door"} style={
                    {
                        top: styles.sceneLantern.top,
                        left: styles.sceneLantern.left,
                        width: styles.sceneLantern.width,
                        height: styles.sceneLantern.height,
                        backgroundImage: `url('${lantern}')`,
                        backgroundSize: "cover"
                    }
                }></div> */}
                {/* <div id={"scene-bonsai"} className={"door"} style={
                    {
                        top: styles.sceneBonsai.top,
                        left: styles.sceneBonsai.left,
                        width: styles.sceneBonsai.width,
                        height: styles.sceneBonsai.height,
                        backgroundImage: `url('${bonsai}')`,
                        backgroundSize: "cover"
                    }
                }></div> */}
                <ScholarBubble ratio={this.state.ratio} windowSize={this.state.PanelBox} NavbarBox={styles.navbar}></ScholarBubble>
            </div>
        );
    }
}