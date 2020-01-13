import React, { Component } from 'react';

import './Panel.scss';

import scholar from '../../assets/icons/iconScholar.png';
import scholarHover from '../../assets/icons/iconScholarHover.png';
import documentIm from '../../assets/icons/iconDocument.png';
import documentHover from '../../assets/icons/iconDocumentHover.png';
// import knowledge from '../../assets/icons/iconKnowledge.png';
// import knowledgeHover from '../../assets/icons/iconKnowledgeHover.png';
// import account from '../../assets/icons/iconAccount.png';
// import accountHover from '../../assets/icons/iconAccountHover.png';
import tori from '../../assets/tori.png';

import MenuItem from './MenuItem';
import Cursor from '../cursor/cursor';
import Scene from './Scene';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mousePosition:{
                left:0,
                top:0
            },
            windowSize:{
                left:0,
                top:0,
                ratio:1
            },
            toriPosition:{
                left:0,
                top:0,
                height:0,
                width:0
            },
            toriInit:{
                height:767,
                width:1572
            },
            listItemsInit:{
                left:275,
                top:[300,400,500]
            },
            listitems: [],
            isOpenedIcon: [],
            isLoadingIcon: [],
            isNotificationIcon: [],
            // animation
            openAnimationExec: false,
            isOpened: false,
            closeAnimationExec: false,
            dismissPopover: false,
            gif_number: 0,
            cursorLoaded:false
        }
    }

    componentDidMount = () => {
        // handle responsive resizing
        window.addEventListener('resize', this.responiveResizing);
        window.addEventListener('mousemove', this.movemouse);
        let tab_bool = [false, false, false, false];
        this.setState({
            isOpenedIcon: tab_bool,
            isLoadingIcon: tab_bool,
            isNotificationIcon: tab_bool
        }, () => {
            this.responiveResizing();
        });
    }

    movemouse = event => {
        this.setState({
            mousePosition:{
                left:event.x,
                top:event.y
            },
        })
    }

    responiveResizing = () => {
        let container = document.getElementById("container-panel");
        this.setState({
            windowSize:{
                width:container.offsetWidth,
                height:container.offsetHeight,
                ratio:container.offsetWidth / 2304
            }
        }, () =>{
            let left_pos = Math.floor(this.state.windowSize.ratio*this.state.listItemsInit.left);
            let listitems = [
                { image: documentIm, imageHover: documentHover, alt: "knowledge", title: "Find a Knowledge", details: "As an apprentice, you should learn to new knowledge in order to improve yourself. Just ask for some documents to the librarian !" 
                , id:"knowledge-icon", left:left_pos, top:Math.floor(this.state.windowSize.ratio*this.state.listItemsInit.top[0])},
                { image: scholar, imageHover: scholarHover, alt: "scholar", title: "Ask the scholar", details: "Sometimes, those who wrote books also forgot to explain basic context to begginners. Just ask the scholar what you want to know !" 
                , id:"scholar-icon", left:left_pos, top:Math.floor(this.state.windowSize.ratio*this.state.listItemsInit.top[1])},
                // { image: knowledge, imageHover: knowledgeHover, alt: "rank", title: "Improvement", details: "As an apprentice, you would probably like to see your progression since the begginning of your studies. Just click here !" 
                // , id:"improvement-icon", left:left_pos, top:Math.floor(this.state.windowSize.ratio*this.state.listItemsInit.top[2])},
                // { image: account, imageHover: accountHover, alt: "account", title: "Apprentice Papers", details: "Quite boring stuff, but it is really important to have an identity !" 
                //  , id:""}
            ];
            // set tori position
            let toriWidth =  Math.floor(this.state.windowSize.ratio*this.state.toriInit.width);
            let toriHeight = Math.floor(this.state.windowSize.ratio*this.state.toriInit.height);
            this.setState({
                toriPosition:{
                    left:(this.state.windowSize.width - toriWidth) / 2,
                    top:(this.state.windowSize.height - toriHeight) - Math.floor(30 * this.state.windowSize.ratio),
                    height:toriHeight,
                    width:toriWidth
                },
                listitems: listitems
            });
        });
    }

    handleClickOnIcon = event => {
        let iconKey = event.target.getAttribute("data-key");
        let openIcon = this.state.isOpenedIcon;
        if (openIcon.includes(true)) {
            if (openIcon[iconKey]) {
                this.animation_close(false, iconKey);
            } else {
                this.animation_close(true, iconKey);
            }
        } else {
            this.animation_open(iconKey);
        }

    }

    animation_open = (id) => {
        let open = [false, false, false, false];
        open[id] = true;
        let scene_animation = document.getElementById("scene-animation");
        let scene_background = document.getElementById("scene-background");
        scene_animation.style.visibility = "visible";
        scene_background.style.visibility = "hidden";
        this.setState({
            openAnimationExec: true,
            isOpenedIcon: open,
        }, () => {
            setTimeout(() => {
                this.setState({
                    isOpened: true,
                }, () => {
                    setTimeout(() => {
                        scene_background.style.visibility = "visible";
                        setTimeout(() => {
                            scene_animation.style.visibility = "hidden";
                            this.setState({
                                openAnimationExec: false,
                                dismissPopover: false,
                                gif_number: Math.random()
                            });
                        }, 200);
                    }, 300);
                });
            }, 1700);
        });
    }

    animation_close = (change, id) => {
        let scene_animation = document.getElementById("scene-animation");
        let scene_background = document.getElementById("scene-background");
        // --> fermeture
        scene_animation.style.visibility = "visible";
        scene_background.style.visibility = "hidden";
        this.setState({
            closeAnimationExec: true,
            dismissPopover: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    isOpened: false,
                }, () => {
                    setTimeout(() => {
                        scene_background.style.visibility = "visible";
                        setTimeout(() => {
                            scene_animation.style.visibility = "hidden";
                            this.setState({
                                closeAnimationExec: false,
                                gif_number: Math.random(),
                                isOpenedIcon: [false, false, false, false]
                            }, () => {
                                if (change) {
                                    setTimeout(() => {
                                        this.animation_open(id);
                                    }, 750);
                                }
                            });
                        }, 300);
                    }, 200);
                });
            }, 1850);
        });
    }

    handleLoadingIcon = (id) => {
        let loadingIcon = {...this.state.isLoadingIcon};
        loadingIcon[id] = true;
        this.setState({
            isLoadingIcon: loadingIcon
        });
    }
    handleNotificationIcon = (id) => {
        let notifIcon = {...this.state.isNotificationIcon};
        let loadingIcon = {...this.state.isLoadingIcon};
        loadingIcon[id] = false;
        notifIcon[id] = !notifIcon[id];
        this.setState({
            isLoadingIcon: loadingIcon,
            isNotificationIcon: notifIcon
        });
    }

    cursorLoaded = () => {
        this.setState({
            cursorLoaded:true
        })
    }

    render() {
        return (
            <div id={"container-panel"}>

                <img id={"tori"} src={tori} alt={"tori"} style={
                    {
                        top:this.state.toriPosition.top, 
                        left:this.state.toriPosition.left,
                        height:this.state.toriPosition.height,
                        width:this.state.toriPosition.width
                    }
                }></img>

                <Scene opened={this.state.isOpenedIcon} isOpened={this.state.isOpened} number={this.state.gif_number} handleNotification={this.handleNotificationIcon}
                    openAnimationExec={this.state.openAnimationExec} closeAnimationExec={this.state.closeAnimationExec} handleLoading={this.handleLoadingIcon}
                    notification={this.state.isNotificationIcon} dismissPopover={this.state.dismissPopover} windowSize={this.state.windowSize}
                    ratio={this.state.windowSize.ratio} mousePosition={this.state.mousePosition} cursorLoaded={this.state.cursorLoaded}
                    animation_close={this.animation_close}></Scene>

                {this.state.listitems.map((item, i) => <MenuItem key={i} image={item.image} imageHover={item.imageHover} alt={item.alt} title={item.title}
                    details={item.details} detailsTitle={item.detailsTitle} handleClick={this.handleClickOnIcon} data={i} isLoading={this.state.isLoadingIcon[i]}
                    isNotification={this.state.isNotificationIcon[i]} id={item.id} placement={"right"} left={item.left} top={item.top} 
                    toriPosition={this.state.toriPosition} ratio={this.state.windowSize.ratio}></MenuItem>)}

                <Cursor cursorLoaded={this.cursorLoaded} ratio={this.state.windowSize.ratio} windowSize={this.state.windowSize}></Cursor>
            </div>
        );
    }
}