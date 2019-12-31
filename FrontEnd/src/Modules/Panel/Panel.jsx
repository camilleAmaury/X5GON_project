import React, { Component } from 'react';

import './Panel.scss';

import gif from '../../assets/loadinganimation5.gif';
import scholar from '../../assets/icons/iconScholar.png';
import scholarHover from '../../assets/icons/iconScholarHover.png';
import documentIm from '../../assets/icons/iconDocument.png';
import documentHover from '../../assets/icons/iconDocumentHover.png';
import knowledge from '../../assets/icons/iconKnowledge.png';
import knowledgeHover from '../../assets/icons/iconKnowledgeHover.png';
import account from '../../assets/icons/iconAccount.png';
import accountHover from '../../assets/icons/iconAccountHover.png';

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
            // animation
            openAnimationExec: false,
            isOpened: false,
            closeAnimationExec: false,
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
        this.setState({
            listitems_right: listitems_right,
            listitems_left: listitems_left,
            isOpenedIcon: [false, false, false, false]
        })
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    changeScholarHover = event => {
        event.preventDefault();
        event.target.setAttribute("src", scholarHover);
    }
    changeScholar = event => {
        event.preventDefault();
        event.target.setAttribute("src", scholar);
    }

    handleClickOnIcon = event => {
        let double = false;
        let iconKey = event.target.getAttribute("data-key");
        let openIcon = this.state.isOpenedIcon;
        if (openIcon.includes(true)) {
            if (openIcon[iconKey]) {
                //already opened --> no changement
                openIcon[iconKey] = false;
            } else {
                openIcon = [false, false, false, false];
                openIcon[iconKey] = true;
                // close - open animation
                double = true;
            }
        } else {
            openIcon[iconKey] = true;
            // stop animation
        }
        this.setState({
            isOpenedIcon: openIcon
        }, () => {
            this.handleAnimation(openIcon, double);
        });
    }

    animation_open = () => {
        let scene_animation = document.getElementById("scene-animation");
        let scene_background = document.getElementById("scene-background");
        scene_animation.style.visibility = "visible";
        scene_background.style.visibility = "hidden";
        this.setState({
            openAnimationExec: true
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
                                gif_number: Math.random()
                            });
                        }, 200);
                    }, 300);
                });
            }, 1700);
        });
    }
    animation_close = (change) => {
        let scene_animation = document.getElementById("scene-animation");
        let scene_background = document.getElementById("scene-background");
        // --> fermeture
        scene_animation.style.visibility = "visible";
        scene_background.style.visibility = "hidden";
        this.setState({
            closeAnimationExec: true
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
                                if(change){
                                    setTimeout(this.animation_open, 500);
                                }
                            });
                        }, 300);
                    }, 200);
                });
            }, 1850);
        });
    }
    handleAnimation(tab_bool, double) {
        if (tab_bool.includes(true) && !this.state.openAnimationExec && !this.state.isOpened && !this.state.closeAnimationExec && !double) {
            this.animation_open();
        } else if (!tab_bool.includes(true) && this.state.isOpened && !this.state.openAnimationExec && !this.state.closeAnimationExec && !double) {
            this.animation_close(double);
        } else if (tab_bool.includes(true) && this.state.isOpened && !this.state.openAnimationExec && !this.state.closeAnimationExec && double) {
            // --> fermeture puis ouverture
            this.animation_close(double);
        }
    }

    render() {
        return (
            <div id={"container-panel"}>
                <div className={"space-container"}></div>
                <div className={"presentation-container"}>
                    <div className={"presentation-container-pre-title"}>

                    </div>
                    <div className={"presentation-container-title"}>
                        {/* <img src={gif} alt={"potion"} className={"presentation-title-gif"} /> */}
                        <div className={"presentation-container-title-text"}>
                            <span className={"pre-title"}>A X5GON project</span>
                            <span className={"title"}>Knowledge's Recipe</span>
                        </div>
                        {/* <img src={gif} alt={"potion"} className={"presentation-title-gif"} /> */}
                    </div>

                </div>
                <div className={"space-container"}></div>
                <div className={"panel-container"}>
                    <div className={"left-panel-container"}>
                        <div className={"side-panel-container-title"}>Actions</div>
                        <div className={"side-panel-container-list-container left-list-container"}>
                            {this.state.listitems_left.map((item, i) => <ListItem key={i} image={item.image} imageHover={item.imageHover} alt={item.alt} left={true} title={item.title}
                                details={item.details} detailsTitle={item.detailsTitle} handleClick={this.handleClickOnIcon} data={i} ></ListItem>)}
                        </div>
                    </div>
                    <div className={"center-panel-container"}>
                        <Scene opened={this.state.isOpenedIcon} isOpened={this.state.isOpened} number={this.state.gif_number}
                            openAnimationExec={this.state.openAnimationExec} closeAnimationExec={this.state.closeAnimationExec}></Scene>
                    </div>
                    <div className={"right-panel-container"}>
                        <div className={"side-panel-container-title"}>Apprentice's Information</div>
                        <div className={"side-panel-container-list-container right-list-container"}>
                            {this.state.listitems_right.map((item, i) => <ListItem key={i} image={item.image} imageHover={item.imageHover} alt={item.alt} left={false} title={item.title}
                                details={item.details} detailsTitle={item.detailsTitle} handleClick={this.handleClickOnIcon} data={this.state.listitems_left.length + i} ></ListItem>)}
                        </div>
                    </div>
                </div>
                <Cursor></Cursor>
            </div>
        );
    }
}