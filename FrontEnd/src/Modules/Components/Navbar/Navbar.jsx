import React, { Component, Fragment } from 'react';

import './Navbar.css';

import BackgroundImage from '../../../assets/Panel/Navbar/backgroundimage.png';
import Icon1 from '../../../assets/Panel/Navbar/IconImprovement.png';
import Icon2 from '../../../assets/Panel/Navbar/IconKnowledge.png';
import Icon3 from '../../../assets/Panel/Navbar/IconCommunity.png';
import Icon4 from '../../../assets/Panel/Navbar/IconScholar.png';
import Icon5 from '../../../assets/Panel/Navbar/IconLectures.png';
import Icon1Hover from '../../../assets/Panel/Navbar/IconImprovementHover.png';
import Icon2Hover from '../../../assets/Panel/Navbar/IconKnowledgeHover.png';
import Icon3Hover from '../../../assets/Panel/Navbar/IconCommunityHover.png';
import Icon4Hover from '../../../assets/Panel/Navbar/IconScholarHover.png';
import Icon5Hover from '../../../assets/Panel/Navbar/IconLecturesHover.png';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: [],
            scrollBox:{
                height:90
            },
            hoverIcon : [false, false, false, false, false],
            images:[]
        }
    }

    componentDidMount = () => {
        let icons = [{ text: "Profile", icon: Icon1, IconHover: Icon1Hover, hover:"See your progression and achievements" }, 
            { text: "Knowledge", icon: Icon2, IconHover: Icon2Hover, hover:"Looking for more knowledge ?"  }, 
            { text: "Community", icon: Icon3, IconHover: Icon3Hover, hover:"Retrieve all your answers and questions"  }, 
            { text: "Scholar", icon: Icon4, IconHover: Icon4Hover, hover:"Ask the scholar something you don't know"  }, 
            { text: "Lectures", icon: Icon5, IconHover: Icon5Hover, hover:"Retrieve Your document and improve yourself"  }];
        this.setState({
            icons: icons
        }, () => {
            document.getElementById("Navbar").addEventListener("keypress", this.askQuestion);
        });
    }

    preparePositions = () => {
        let obj = {};
        // Navbar background
        obj.navbarBg = {
            width: this.props.NavbarBox.width,
            height: this.props.NavbarBox.height
        };
        // information
        obj.info = {
            width: this.props.NavbarBox.width,
            height: 30 / 100 * this.props.NavbarBox.height
        };
        // personnal Image
        let imagewidth = Math.floor(this.props.NavbarBox.width * 1 / 2 * this.props.ratio);
        obj.imageAccount = {
            width: imagewidth,
            height: imagewidth,
            left: Math.floor((obj.info.width - imagewidth) / 2),
            top: Math.floor((obj.info.height - imagewidth) / 8)
        };
        // username account
        obj.usernameAccount = {
            width: obj.info.width,
            top: obj.imageAccount.top + obj.imageAccount.height + 20
        };
        // separation bar 1 
        obj.sepBar1 = {
            width: obj.info.width / 2,
            top: obj.info.height - 4
        };
        obj.sepBar1.left = Math.floor((obj.info.width - obj.sepBar1.width) / 2);
        // search
        obj.searchBar = {
            width: this.props.NavbarBox.width,
            height: 15 / 100 * this.props.NavbarBox.height,
            top: obj.info.height
        };
        // search
        obj.searchBarText = {
            width: Math.floor(obj.searchBar.width * 3 / 4),
            height: Math.floor(obj.searchBar.height / 2 - 20),
            borderRadius: Math.floor(obj.searchBar.height / 4) + 2,
            lineHeight: Math.floor((obj.searchBar.height) / 2 - 20),
        };
        obj.searchBarText.left = Math.floor((obj.searchBar.width - obj.searchBarText.width - 20) / 2);
        obj.searchBarText.top = Math.floor((obj.searchBar.height - obj.searchBarText.height - 20) / 2);
        // icons
        obj.icons = {
            width: this.props.NavbarBox.width,
            height: 55 / 100 * this.props.NavbarBox.height,
            top: obj.searchBar.height + obj.searchBar.top
        };
        // separation bar 2
        obj.sepBar2 = {
            width: obj.icons.width / 2,
            top: 0
        };
        obj.sepBar2.left = Math.floor((obj.icons.width - obj.sepBar2.width) / 2);
        // icons
        obj.icon = {
            width: Math.floor(obj.icons.width * 3 / 4),
            height: Math.floor(obj.icons.height * 2 / 3 * 1 / 7)
        };
        obj.icon.icons = [];
        obj.icon.icons.push(
            {
                top: Math.floor(obj.icons.height * 1 / 7),
                left: Math.floor((obj.icons.width - obj.icon.width) / 2),
            },
            {
                top: Math.floor(obj.icons.height * 2 / 7),
                left: Math.floor((obj.icons.width - obj.icon.width) / 2)
            },
            {
                top: Math.floor(obj.icons.height * 3 / 7),
                left: Math.floor((obj.icons.width - obj.icon.width) / 2)
            },
            {
                top: Math.floor(obj.icons.height * 4 / 7),
                left: Math.floor((obj.icons.width - obj.icon.width) / 2)
            },
            {
                top: Math.floor(obj.icons.height * 5 / 7),
                left: Math.floor((obj.icons.width - obj.icon.width) / 2)
            }
        );
        obj.scroll = {
            width:obj.navbarBg.width
        }
        obj.icon.iconScrolls = [];
        obj.icon.iconScrolls.push(
            {
                top: obj.icon.icons[0].top + obj.icons.top - Math.floor((this.state.scrollBox.height - obj.icon.height) / 2),
                left: this.state.hoverIcon[0] ? obj.navbarBg.width : 0,
                zIndex:this.state.hoverIcon[0] ? 3:2
            },
            {
                top: obj.icon.icons[1].top + obj.icons.top - Math.floor((this.state.scrollBox.height - obj.icon.height) / 2),
                left: this.state.hoverIcon[1] ? obj.navbarBg.width : 0,
                zIndex:this.state.hoverIcon[1] ? 3:2
            },
            {
                top: obj.icon.icons[2].top + obj.icons.top - Math.floor((this.state.scrollBox.height - obj.icon.height) / 2),
                left: this.state.hoverIcon[2] ? obj.navbarBg.width : 0,
                zIndex:this.state.hoverIcon[2] ? 3:2
            },
            {
                top: obj.icon.icons[3].top + obj.icons.top - Math.floor((this.state.scrollBox.height - obj.icon.height) / 2),
                left: this.state.hoverIcon[3] ? obj.navbarBg.width : 0,
                zIndex:this.state.hoverIcon[3] ? 3:2
            },
            {
                top: obj.icon.icons[4].top + obj.icons.top - Math.floor((this.state.scrollBox.height - obj.icon.height) / 2),
                left: this.state.hoverIcon[4] ? obj.navbarBg.width : 0,
                zIndex:this.state.hoverIcon[4] ? 3:2
            }
        );
        return obj;
    }

    HoverIcon = (i, bool) => {
        let hover = [false, false, false, false, false];
        hover[i] = bool;
        this.setState({
            hoverIcon:hover
        });
    }

    askQuestion = event => {
        if(event.key === 'Enter'){
            let question = document.getElementById('Search-bar-text');
            let questionValue = question.value.replace(" ", "%20").replace(",", "%20").replace(".", "%20").replace("\n", "%20");
            if (!(questionValue === null || questionValue === undefined || questionValue === "")) {
                this.props.knowledgeSearch(questionValue);
                setTimeout(() => {
                    question.value="";
                },50);
            }
            
        }
        
    }

    onChangeHandler = event => {
        console.log(event.target.files[0])
    }

    render() {
        let styles = this.preparePositions();

        return (
            <Fragment>
                <div id={"Navbar"} style={
                    {
                        height: styles.navbarBg.height,
                        width: styles.navbarBg.width
                    }
                }>
                    <div id={"Account-information"} style={
                        {
                            height: styles.info.height,
                            width: styles.info.width
                        }
                    }>
                        <div id={"image-account"} style={
                            {
                                width: styles.imageAccount.width,
                                height: styles.imageAccount.height,
                                left: styles.imageAccount.left,
                                top: styles.imageAccount.top,
                                backgroundImage:`url('${BackgroundImage}')`,
                                backgroundSize:"cover"
                            }
                        }></div>
                        <div id={"username-text"} style={
                            {
                                width: styles.usernameAccount.width,
                                top: styles.usernameAccount.top
                            }
                        }>Static Username</div>
                        <div className={"separation-bar"} style={
                            {
                                width: styles.sepBar1.width,
                                top: styles.sepBar1.top,
                                left: styles.sepBar1.left
                            }
                        }></div>
                    </div>
                    <div id={"Search-bar"} style={
                        {
                            height: styles.searchBar.height,
                            width: styles.searchBar.width,
                            top: styles.searchBar.top
                        }
                    }>
                        <textarea id={"Search-bar-text"} rows={1} placeholder={"Some keywords ..."} style={
                            {
                                height: styles.searchBarText.height,
                                width: styles.searchBarText.width,
                                top: styles.searchBarText.top,
                                left: styles.searchBarText.left,
                                borderRadius: styles.searchBarText.borderRadius,
                                lineHeight: styles.searchBarText.lineHeight + "px",
                            }
                        }></textarea>
                    </div>
                    <div id={"Icons"} style={
                        {
                            height: styles.icons.height,
                            width: styles.icons.width,
                            top: styles.icons.top
                        }
                    }>
                        <div className={"separation-bar"} style={
                            {
                                width: styles.sepBar2.width,
                                top: styles.sepBar2.top,
                                left: styles.sepBar2.left
                            }
                        }></div>
                        {/* Icons list */}
                        {this.state.icons.map((icon, i) =>
                            <div className={"icon-navbar"} key={i} data-key={i} style={
                                {
                                    width: styles.icon.width,
                                    height: styles.icon.height,
                                    top: styles.icon.icons[i].top,
                                    left: styles.icon.icons[i].left
                                }
                            } onMouseEnter={() => {this.HoverIcon(i, true)}} onMouseLeave={() => {this.HoverIcon(i, false)}} onClick={() => {this.props.clickIcon(i)}}>
                                <div className={"icon-image"} 
                                    width={styles.icon.height} height={styles.icon.height} style={
                                        {
                                            width: styles.icon.height,
                                            height: styles.icon.height,
                                            backgroundImage:`url('${this.state.hoverIcon[i] ? icon.IconHover : icon.icon}')`,
                                            backgroundSize:"cover"
                                        }
                                }>

                                </div>
                                <span className={"icon-text"} style={
                                    {
                                        color:this.state.hoverIcon[i] ? "#c4c4c4":"white"
                                    }
                                }>{icon.text}</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* scrolls */}
                {this.state.icons.map((icon, i) =>
                    <div className={"icon-scroll-body"} key={i} data-key={i} style={
                        {
                            width: styles.scroll.width,
                            height: this.state.scrollBox.height,
                            top: styles.icon.iconScrolls[i].top,
                            left: styles.icon.iconScrolls[i].left,
                            zIndex:styles.icon.iconScrolls[i].zIndex
                        }
                    }>
                        <div className={"hover-text"} style={
                            {
                                width: Math.floor(styles.scroll.width*3/4),
                            }
                        }>{icon.hover}</div>
                        <div className={"icon-scroll-head"} style={
                            {
                                width: 20,
                                height: 120,
                                top: -15,
                                left: styles.scroll.width-10
                            }
                        }>
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}