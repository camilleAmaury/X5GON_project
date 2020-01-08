import React, { Component } from 'react';

import './Panel.scss';

import scholar from '../../assets/icons/iconScholar.png';
import scholarHover from '../../assets/icons/iconScholarHover.png';
import documentIm from '../../assets/icons/iconDocument.png';
import documentHover from '../../assets/icons/iconDocumentHover.png';
import knowledge from '../../assets/icons/iconKnowledge.png';
import knowledgeHover from '../../assets/icons/iconKnowledgeHover.png';
import account from '../../assets/icons/iconAccount.png';
import accountHover from '../../assets/icons/iconAccountHover.png';
import tori from '../../assets/tori.png';

import ListItem from './Listitem';
import Cursor from '../cursor/cursor';
import Scene from './Scene';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listitems_right: [],
            listitems_left: [],
            isOpenedIcon: [],
            isLoadingIcon: [],
            isNotificationIcon: [],
            // animation
            openAnimationExec: false,
            isOpened: false,
            closeAnimationExec: false,
            dismissPopover: false,
            gif_number: 0
        }
    }
    componentDidMount = () => {
        let listitems_left = [
            { image: documentIm, imageHover: documentHover, alt: "knowledge", title: "Find a Knowledge", details: "As an apprentice, you should learn to new knowledge in order to improve yourself. Just ask for some documents to the librarian !" },
            { image: scholar, imageHover: scholarHover, alt: "scholar", title: "Ask the scholar", details: "Sometimes, those who wrote books also forgot to explain basic context to begginners. Just ask the scholar what you want to know !" }
        ];
        let listitems_right = [
            { image: knowledge, imageHover: knowledgeHover, alt: "rank", title: "Improvement", details: "As an apprentice, you would probably like to see your progression since the begginning of your studies. Just click here !" },
            { image: account, imageHover: accountHover, alt: "account", title: "Apprentice Papers", details: "Quite boring stuff, but it is really important to have an identity !" }
        ];
        let container = document.getElementById("container-panel");
        let centerdiv = {
            height: container.offsetHeight,
            width: container.offsetWidth,
            top:0,
            left:0
        }
        // set tori position
        let tori = document.getElementById("tori");
        let document_pos = {
            left:(centerdiv.width - tori.clientWidth)/2,
            top:(centerdiv.height - tori.clientHeight) - 30,
            width: tori.clientWidth,
            height:tori.clientHeight
        }
        tori.style.left = document_pos.left + "px";
        tori.style.top = document_pos.top + "px";
        this.setState({
            listitems_right: listitems_right,
            listitems_left: listitems_left,
            isOpenedIcon: [false, false, false, false],
            isLoadingIcon: [false, false, false, false],
            isNotificationIcon: [false, false, false, false]
        });
    }

    handleSubmit = event => {
        event.preventDefault();
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
                                gif_number: Math.random()
                            }, () => {
                                if (change) {
                                    setTimeout(() => {
                                        this.animation_open(id);
                                    }, 750);
                                } else {
                                    this.setState({
                                        isOpenedIcon: [false, false, false, false]
                                    });
                                }
                            });
                        }, 300);
                    }, 200);
                });
            }, 1850);
        });
    }

    handleLoadingIcon = (id) => {
        let loadingIcon = this.state.isLoadingIcon;
        loadingIcon[id] = true;
        this.setState({
            isLoadingIcon: loadingIcon
        });
    }
    handleNotificationIcon = (id) => {
        let notifIcon = this.state.isNotificationIcon;
        let loadingIcon = this.state.isLoadingIcon;
        loadingIcon[id] = false;
        notifIcon[id] = !notifIcon[id];
        this.setState({
            isLoadingIcon: loadingIcon,
            isNotificationIcon: notifIcon
        });
    }

    render() {
        return (
            <div id={"container-panel"}>
                <img id={"tori"} src={tori} alt={"tori"} width={1572} height={767}></img>
                <div className={"space-container"}></div>
                <div className={"presentation-container"}>
                    <div className={"presentation-container-pre-title"}>

                    </div>
                    <div className={"presentation-container-title"}>
                        <div className={"presentation-container-title-text"}>
                            <span className={"pre-title"}>A X5GON project</span>
                            <span className={"title"}>Knowledge's Recipe</span>
                        </div>
                    </div>

                </div>
                <div className={"space-container"}></div>
                <div className={"panel-container"}>
                    <div className={"left-panel-container"}>
                        <div className={"side-panel-container-title"}>Actions</div>
                        <div className={"side-panel-container-list-container left-list-container"}>
                            {this.state.listitems_left.map((item, i) => <ListItem key={i} image={item.image} imageHover={item.imageHover} alt={item.alt} left={true} title={item.title}
                                details={item.details} detailsTitle={item.detailsTitle} handleClick={this.handleClickOnIcon} data={i} isLoading={this.state.isLoadingIcon[i]}
                                isNotification={this.state.isNotificationIcon[i]}></ListItem>)}
                        </div>
                    </div>
                    <div className={"center-panel-container"}>
                        <Scene opened={this.state.isOpenedIcon} isOpened={this.state.isOpened} number={this.state.gif_number} handleNotification={this.handleNotificationIcon}
                            openAnimationExec={this.state.openAnimationExec} closeAnimationExec={this.state.closeAnimationExec} handleLoading={this.handleLoadingIcon}
                            notification={this.state.isNotificationIcon} dismissPopover={this.state.dismissPopover}></Scene>
                    </div>
                    <div className={"right-panel-container"}>
                        <div className={"side-panel-container-title"}>Apprentice's Information</div>
                        <div className={"side-panel-container-list-container right-list-container"}>
                            {this.state.listitems_right.map((item, i) => <ListItem key={i} image={item.image} imageHover={item.imageHover} alt={item.alt} left={false} title={item.title}
                                details={item.details} detailsTitle={item.detailsTitle} handleClick={this.handleClickOnIcon} data={this.state.listitems_left.length + i}
                                isLoading={this.state.isLoadingIcon[this.state.listitems_left.length + i]} isNotification={this.state.isNotificationIcon[this.state.listitems_left.length + i]}></ListItem>)}
                        </div>
                    </div>
                </div>
                <Cursor></Cursor>
            </div>
        );
    }
}