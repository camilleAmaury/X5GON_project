import React, { Component, Fragment } from 'react';

import Popover from '../../../Popover/Popover';
import {Radar} from 'react-chartjs-2';

import './Profile.css';
import './css-circular-prog-bar.css';

import badgeApprentice from '../../../../../assets/Panel/Scene/Profile/badgeApprentice.png';
import badgeHelp from '../../../../../assets/Panel/Scene/Profile/badgeHelp.png';
import badgeEager from '../../../../../assets/Panel/Scene/Profile/badgeEager.png';
import badgeMaster from '../../../../../assets/Panel/Scene/Profile/badgeMaster.png';
import badgeArchitect from '../../../../../assets/Panel/Scene/Profile/badgeArchitect.png';

// import axios from "axios";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beamBox: {
                size: 50
            },
            maxXp:1,
            currentXp:0,
            currentLevel:0,
            isHoverExp:false,
            badgesBox:{
                badge1:[125,133],
                badge2:[423,131],
                badge3:[151,124],
                badge4:[240,124],
                badge5:[194,299]
            },
            badges:[
                {name:"Apprentice", condition:"add 5 documents to your panel", texture:badgeApprentice, has:true, hovered:false},
                {name:"Seeking for help", condition:"Ask 3 questions to the community", texture:badgeHelp, has:false, hovered:false},
                {name:"Eager to learn", condition:"Ask 10 questions to the scholar", texture:badgeEager, has:false, hovered:false},
                {name:"Path of mastership", condition:"Be the top answer of a community question", texture:badgeMaster, has:false, hovered:false},
                {name:"Knowledge Architect", condition:"rate and validate 10 documents", texture:badgeArchitect, has:false, hovered:false}
            ],
            skills:{labels:["None", "Politics", "Blowjob", "Computer science"], datasets:[{
                data:[0,2,8,5], 
                label:"Your Skills",
                backgroundColor:"rgba(180,49,32,0.5)"
            }]},
            keywords:[],
            server: "",
            server2: "",
            config: {}
        };
    }

    componentDidMount = () => {
        let server = (process.env.REACT_APP_DEV === "1" ? process.env.REACT_APP_SERVER_DEV : process.env.REACT_APP_SERVER);
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        if(this.props.isMounted){
            this.setState({ server: server, config: config, server2: server2 }, () => {
                
                if(this.props.isMounted){
                    this.setState({
                        maxXp:200,
                        currentXp:125,
                        currentLevel:4
                    });
                }
            });
        }
    }

    _loadKeywords = () => {

    }

    preparePositions = () => {
        let obj = {};
        // background
        if (true) {
            // verticalbeam
            obj.beamVertical = {
                width: Math.floor(this.state.beamBox.size * this.props.ratio),
                height: this.props.scene.height
            };
            obj.beamVertical.left2 = Math.floor(this.props.scene.width * 11 / 16 - (obj.beamVertical.width) / 2);
            obj.beamVertical.left1 = Math.floor(this.props.scene.width * 5 / 16 - (obj.beamVertical.width) / 2);
            // horizontalBeam
            obj.beamHorizontal = {
                height: Math.floor(this.state.beamBox.size * this.props.ratio),
                width1: obj.beamVertical.left1 + obj.beamVertical.width,
                width2: obj.beamVertical.left2 - (obj.beamVertical.left1 + obj.beamVertical.width),
                left1: 0,
                left2: obj.beamVertical.left1 + obj.beamVertical.width,
                left3: obj.beamVertical.left2 + obj.beamVertical.width
            };
            obj.beamHorizontal.top1 = Math.floor(this.props.scene.width * 1 / 16 - (obj.beamHorizontal.height) / 2);
            obj.beamHorizontal.top2 = Math.floor((this.props.scene.height - obj.beamHorizontal.height) / 2);
        }
        // modules experience
        if(true){
            // module experience
            obj.experience = {
                width: Math.floor(this.props.scene.width * 1/4),
                height: Math.floor(this.props.scene.height * 1/2)
            };
            obj.experience.left = Math.floor(this.props.scene.width * 1/16);
            obj.experience.top = Math.floor(this.props.scene.height * 1/16);
            // circle back
            obj.progressCircle = {
                width: Math.min(Math.floor(obj.experience.width * 1/2), Math.floor(obj.experience.height * 1/2)),
                height: Math.min(Math.floor(obj.experience.width * 1/2), Math.floor(obj.experience.height * 1/2))
            };
            obj.progressCircle.left = Math.floor((obj.experience.width - obj.progressCircle.width)/2);
            obj.progressCircle.top = Math.floor(obj.experience.height*1/8);
            // circle image
            obj.centerCircle = {
                width: obj.progressCircle.width*0.86,
                height: obj.progressCircle.width*0.86,
            };
            // xpBar
            obj.xpBar = {
                width: obj.experience.width*1.1,
                height: obj.experience.width*2/8,
            };
            obj.xpBar.left = obj.experience.left + Math.floor((obj.experience.width - obj.xpBar.width)/2);
            obj.xpBar.top = Math.floor(obj.experience.height*13/16);
        }
        // modules badge
        if(true){
            // module badges
            obj.badges = {
                width: Math.floor(this.props.scene.width * 9/16),
                height: Math.floor(this.props.scene.height * 3/4)
            };
            obj.badges.left = Math.floor(this.props.scene.width * 6/16);
            obj.badges.top = Math.floor(this.props.scene.height * 1/16);
            // text
            obj.badgesBar = {
                width: Math.floor(obj.badges.width/6 * 1.2),
                height: Math.floor(this.props.scene.height * 1/8)
            };
            obj.badgesBar.left = obj.badges.left + Math.floor(obj.badges.width*5/6);
            obj.badgesBar.top = obj.badges.top + Math.floor(obj.badges.height * 1/16);
            // badge1
            obj.badge1 = {
                width: Math.floor(this.state.badgesBox.badge1[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge1[1] * this.props.ratio)
            };
            obj.badge1.left = Math.floor(obj.badges.width * 1/16);
            obj.badge1.top = Math.floor(obj.badges.height * 1/16);
            // badge2
            obj.badge2 = {
                width: Math.floor(this.state.badgesBox.badge2[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge2[1] * this.props.ratio)
            };
            obj.badge2.left = Math.floor(obj.badges.width * 4/16);
            obj.badge2.top = Math.floor(obj.badges.height * 1/16);
            // badge3
            obj.badge3 = {
                width: Math.floor(this.state.badgesBox.badge3[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge3[1] * this.props.ratio)
            };
            obj.badge3.left = Math.floor(obj.badges.width * 3/16);
            obj.badge3.top = Math.floor(obj.badges.height * 1/16) + obj.badge1.height + obj.badge1.top;
            // badge4
            obj.badge4 = {
                width: Math.floor(this.state.badgesBox.badge4[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge4[1] * this.props.ratio)
            };
            obj.badge4.left = Math.floor(obj.badges.width * 3/16);
            obj.badge4.top = Math.floor(obj.badges.height * 2/16) + obj.badge3.height + obj.badge3.top;
            // badge4
            obj.badge5 = {
                width: Math.floor(this.state.badgesBox.badge5[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge5[1] * this.props.ratio)
            };
            obj.badge5.left = Math.floor(obj.badges.width * 1/16) + obj.badge4.width + obj.badge4.left;
            obj.badge5.top = Math.floor(obj.badges.height * 3/32) + obj.badge1.height + obj.badge1.top;
        }
        // modules skills
        if(true){
            // module skills
            obj.skills = {
                width: Math.floor(this.props.scene.width * 1/2),
                height:  Math.floor(this.props.scene.height * 2/3)
            };
            obj.skills.left = obj.badges.left + Math.floor((obj.badges.width - obj.skills.width)/2)
            obj.skills.top = obj.badges.top + obj.badges.height + Math.floor(this.props.scene.height * 1/16);
            // skillsBar
            obj.skillsBar = {
                width: obj.skills.width*9/8,
                height: obj.skills.height*7/8,
            };
            obj.skillsBar.left = obj.skills.left + Math.floor((obj.skills.width - obj.skillsBar.width)/2);
            obj.skillsBar.top = obj.skills.top + Math.floor((obj.skills.height - obj.skillsBar.height)/2)
        }
        // modules recurrent theme
        if(true){
            // module theme
            obj.theme = {
                width: Math.floor(this.props.scene.width * 1/4),
                height:  Math.floor(this.props.scene.width * 1/2)
            };
            obj.theme.left  = Math.floor(this.props.scene.width * 1/16);
            obj.theme.top = obj.experience.top + obj.experience.height + Math.floor(this.props.scene.height * 1/16);
            // themeBar
            obj.themeBar = {
                width: obj.theme.width*1.1,
                height: obj.theme.height*1/8,
            };
            obj.themeBar.left = obj.theme.left + Math.floor((obj.theme.width - obj.themeBar.width)/2);
            obj.themeBar.top = obj.theme.top + Math.floor(obj.theme.height*1/16);
            // keywords
            obj.keywords = {
                width: obj.theme.width,
                height: obj.theme.top + obj.theme.height - (obj.themeBar.top + obj.themeBar.height) - 20,
            };
            obj.keywords.left = obj.theme.left;
            obj.keywords.top = obj.themeBar.top + obj.themeBar.height + 10;
        }

        return obj;
    }

    hoverExp = (bool) => {
        if(this.props.isMounted){
            this.setState({isHoverExp:bool});
        }
    }

    hoverBadge = (i, bool) => {
        if(this.props.isMounted){
            let badges = this.state.badges;
            badges[i].hovered = bool;
            if(this.props.isMounted){
                this.setState({badges:badges});
            }
        }
    }

    render() {
        let styles = this.preparePositions();
        
        let percentage = this.props.isMounted ? this.state.currentXp / this.state.maxXp : 0;
        return (
            <div id={"profile"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>
                {/* beams */}
                <Fragment>
                        <div className={"verticalBeam"} style={
                            {
                                left: styles.beamVertical.left1,
                                width: styles.beamVertical.width,
                                height: styles.beamVertical.height,
                            }
                        }></div>
                        <div className={"verticalBeam"} style={
                            {
                                left: styles.beamVertical.left2,
                                width: styles.beamVertical.width,
                                height: styles.beamVertical.height,
                            }
                        }></div>
                        <div className={"horizontalBeam"} style={
                            {
                                left: styles.beamHorizontal.left1,
                                width: styles.beamHorizontal.width1,
                                height: styles.beamHorizontal.height,
                                top: styles.beamHorizontal.top1,
                            }
                        }></div>
                        <div className={"horizontalBeam"} style={
                            {
                                left: styles.beamHorizontal.left3,
                                width: styles.beamHorizontal.width1,
                                height: styles.beamHorizontal.height,
                                top: styles.beamHorizontal.top1,
                            }
                        }></div>
                        <div className={"horizontalBeam"} style={
                            {
                                left: styles.beamHorizontal.left2,
                                width: styles.beamHorizontal.width2,
                                height: styles.beamHorizontal.height,
                                top: styles.beamHorizontal.top2,
                            }
                        }></div>
                    </Fragment>
                <div id={"profile-inner"}>
                    
                    {/* ---------------------------> Modules <--------------------------- */}
                    {/* experience */}
                    <div className={"experience module"} style={
                        {
                            left: styles.experience.left,
                            top: styles.experience.top,
                            width: styles.experience.width,
                            height: styles.experience.height,
                        }
                    }>
                        <div className={"progress-circle"} style={
                            {
                                left: styles.progressCircle.left,
                                top: styles.progressCircle.top,
                                width: styles.progressCircle.width,
                                height: styles.progressCircle.height,
                                lineHeight:styles.progressCircle.height
                            }
                        }>
                            <div className={"left-half-clipper"} style={
                                {
                                    left: 0,
                                    top: 0,
                                    width: styles.progressCircle.width,
                                    height: styles.progressCircle.height,
                                    clip:percentage <= 0.5 ? `rect(0px, ${styles.progressCircle.width}px, ${styles.progressCircle.width}px, ${styles.progressCircle.width/2}px)` : 'rect(auto,auto,auto,auto)'
                                }
                            }>
                                <div className={"value-bar"} style={
                                    {
                                        left: 0,
                                        top: 0,
                                        width: styles.progressCircle.width,
                                        height: styles.progressCircle.height,
                                        border:`${styles.progressCircle.height*0.08}px solid #53777A`,
                                        clip:`rect(0px, ${styles.progressCircle.width/2}px, ${styles.progressCircle.width}px, 0px)`,
                                        transform: percentage <= 0.5 ? `rotate(${percentage * 360}deg)` : `rotate(180deg)`
                                    }
                                }></div>
                                <div className={"value-bar"} style={
                                    {
                                        left: 0,
                                        top: 0,
                                        width: styles.progressCircle.width,
                                        height: styles.progressCircle.height,
                                        border:`${styles.progressCircle.height*0.08}px solid #53777A`,
                                        clip:`rect(0px, ${styles.progressCircle.width/2}px, ${styles.progressCircle.width}px, 0px)`,
                                        transform: percentage <= 0.5 ? `rotate(0deg)`:`rotate(${percentage * 360}deg)`
                                    }
                                }></div>
                            </div>
                            <div className={"image"} style={
                                {
                                    width: styles.centerCircle.width,
                                    height: styles.centerCircle.height
                                }
                            }></div>
                        </div>
                    </div>
                    <div className={"xpBar moduleTitle"} onMouseEnter={()=>{this.hoverExp(true)}} onMouseLeave={()=>{this.hoverExp(false)}} style={
                        {
                            left: styles.xpBar.left,
                            width: styles.xpBar.width,
                            height: styles.xpBar.height,
                            top: styles.xpBar.top,
                        }
                    }>
                        {this.state.isHoverExp ? <span>Level {this.state.currentLevel}</span> : <Fragment><span>{this.state.currentXp}</span><div className={"separation"}></div><span>{this.state.maxXp}</span></Fragment>}
                    </div>
                    {/* badges */}
                    <div className={"badges module"} style={
                        {
                            left: styles.badges.left,
                            top: styles.badges.top,
                            width: styles.badges.width,
                            height: styles.badges.height,
                        }
                    }>
                        {/* Apprentice */}
                        <div className={"badge"} onMouseEnter={() => {this.hoverBadge(0, true)}} onMouseLeave={() => {this.hoverBadge(0, false)}} style={
                            {
                                left: styles.badge1.left,
                                width: styles.badge1.width,
                                height: styles.badge1.height,
                                top: styles.badge1.top,
                                borderRadius:"50%",
                            }
                        }>
                            <div className={"badge1"} style={
                                {
                                    width: styles.badge1.width*0.8,
                                    height: styles.badge1.height*0.8,
                                    backgroundImage:`url(${this.state.badges[0].texture})`,
                                    backgroundSize:"cover"
                                }
                            }></div>
                            <div className={"silk"} style={
                                {
                                    borderRadius:"50%",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: this.state.badges[0].has ? (this.state.badges[0].hovered ? `rgba(0,0,0,0.1)` : `rgba(0,0,0,0)`) : (this.state.badges[0].hovered ? `rgba(0,0,0,0)` : `rgba(0,0,0,0.3)`)
                                }
                            }></div>
                        </div>
                        <Popover color={"#334458"} id={"badge-hover-" + 0} ratio={1 / 2} side={"left"} size={{ width: 350, height: 100 }}
                            target={{left: styles.badge1.left,width: styles.badge1.width,height: styles.badge1.height,top: styles.badge1.top}}
                            isOpen={this.state.badges[0].hovered && this.props.isOpen} title={this.state.badges[0].name}>
                            <div className={"badge-hover"}>
                                <span>{this.state.badges[0].condition}</span>
                            </div>
                        </Popover>
                        {/* Help */}
                        <div className={"badge"} onMouseEnter={() => {this.hoverBadge(1, true)}} onMouseLeave={() => {this.hoverBadge(1, false)}} style={
                            {
                                left: styles.badge2.left,
                                width: styles.badge2.width,
                                height: styles.badge2.height,
                                top: styles.badge2.top,
                                backgroundImage:`url(${this.state.badges[1].texture})`,
                                backgroundSize:"cover"
                            }
                        }>
                            <div className={"silk"} style={
                                {
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: this.state.badges[1].has ? (this.state.badges[1].hovered ? `rgba(0,0,0,0.1)` : `rgba(0,0,0,0)`) : (this.state.badges[1].hovered ? `rgba(0,0,0,0)` : `rgba(0,0,0,0.3)`)
                                }
                            }></div>
                        </div>
                        <Popover color={"#334458"} id={"badge-hover-" + 1} ratio={1 / 2} side={"left"} size={{ width: 350, height: 100 }}
                            target={{left: styles.badge2.left,width: styles.badge2.width,height: styles.badge2.height,top: styles.badge2.top}}
                            isOpen={this.state.badges[1].hovered && this.props.isOpen} title={this.state.badges[1].name}>
                            <div className={"badge-hover"}>
                                <span>{this.state.badges[1].condition}</span>
                            </div>
                        </Popover>
                        {/* Eager */}
                        <div className={"badge"} onMouseEnter={() => {this.hoverBadge(2, true)}} onMouseLeave={() => {this.hoverBadge(2, false)}} style={
                            {
                                left: styles.badge3.left,
                                width: styles.badge3.width,
                                height: styles.badge3.height,
                                top: styles.badge3.top,
                                backgroundImage:`url(${this.state.badges[2].texture})`,
                                backgroundSize:"cover"
                            }
                        }>
                            <div className={"silk"} style={
                                {
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: this.state.badges[2].has ? (this.state.badges[2].hovered ? `rgba(0,0,0,0.1)` : `rgba(0,0,0,0)`) : (this.state.badges[2].hovered ? `rgba(0,0,0,0)` : `rgba(0,0,0,0.3)`)
                                }
                            }></div>
                        </div>
                        <Popover color={"#334458"} id={"badge-hover-" + 1} ratio={1 / 2} side={"left"} size={{ width: 350, height: 100 }}
                            target={{left: styles.badge3.left,width: styles.badge3.width,height: styles.badge3.height,top: styles.badge3.top}}
                            isOpen={this.state.badges[2].hovered && this.props.isOpen} title={this.state.badges[2].name}>
                            <div className={"badge-hover"}>
                                <span>{this.state.badges[2].condition}</span>
                            </div>
                        </Popover>
                        {/* Master */}
                        <div className={"badge"} onMouseEnter={() => {this.hoverBadge(3, true)}} onMouseLeave={() => {this.hoverBadge(3, false)}} style={
                            {
                                left: styles.badge4.left,
                                width: styles.badge4.width,
                                height: styles.badge4.height,
                                top: styles.badge4.top,
                                backgroundImage:`url(${this.state.badges[3].texture})`,
                                backgroundSize:"cover"
                            }
                        }>
                            <div className={"silk"} style={
                                {
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: this.state.badges[3].has ? (this.state.badges[3].hovered ? `rgba(0,0,0,0.1)` : `rgba(0,0,0,0)`) : (this.state.badges[3].hovered ? `rgba(0,0,0,0)` : `rgba(0,0,0,0.3)`)
                                }
                            }></div>
                        </div>
                        <Popover color={"#334458"} id={"badge-hover-" + 1} ratio={1 / 2} side={"left"} size={{ width: 350, height: 100 }}
                            target={{left: styles.badge4.left,width: styles.badge4.width,height: styles.badge4.height,top: styles.badge4.top}}
                            isOpen={this.state.badges[3].hovered && this.props.isOpen} title={this.state.badges[3].name}>
                            <div className={"badge-hover"}>
                                <span>{this.state.badges[3].condition}</span>
                            </div>
                        </Popover>
                        {/* Architect */}
                        <div className={"badge"} onMouseEnter={() => {this.hoverBadge(4, true)}} onMouseLeave={() => {this.hoverBadge(4, false)}} style={
                            {
                                left: styles.badge5.left,
                                width: styles.badge5.width,
                                height: styles.badge5.height,
                                top: styles.badge5.top,
                                backgroundImage:`url(${this.state.badges[4].texture})`,
                                backgroundSize:"cover"
                            }
                        }>
                            <div className={"silk"} style={
                                {
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: this.state.badges[4].has ? (this.state.badges[4].hovered ? `rgba(0,0,0,0.1)` : `rgba(0,0,0,0)`) : (this.state.badges[4].hovered ? `rgba(0,0,0,0)` : `rgba(0,0,0,0.3)`)
                                }
                            }></div>
                        </div>
                        <Popover color={"#334458"} id={"badge-hover-" + 1} ratio={1 / 2} side={"left"} size={{ width: 350, height: 100 }}
                            target={{left: styles.badge5.left,width: styles.badge5.width,height: styles.badge5.height,top: styles.badge5.top}}
                            isOpen={this.state.badges[4].hovered && this.props.isOpen} title={this.state.badges[4].name}>
                            <div className={"badge-hover"}>
                                <span>{this.state.badges[4].condition}</span>
                            </div>
                        </Popover>
                    </div>
                    <div className={"badgesBar moduleTitle"} style={
                        {
                            left: styles.badgesBar.left,
                            width: styles.badgesBar.width,
                            height: styles.badgesBar.height,
                            top: styles.badgesBar.top,
                        }
                    }>
                        <span>Badges</span>
                    </div>
                    {/* skills */}
                    <div className={"skills module"} style={
                        {
                            left: styles.skills.left,
                            top: styles.skills.top,
                            width: styles.skills.width,
                            height: styles.skills.height,
                        }
                    }></div>
                    <div className={"skillsBar moduleTitle"} style={
                        {
                            left: styles.skillsBar.left,
                            width: styles.skillsBar.width,
                            height: styles.skillsBar.height,
                            top: styles.skillsBar.top,
                            backgroundColor:"white"
                        }
                    }>
                        <Radar data={this.state.skills} width={styles.skillsBar.height*0.9} height={styles.skillsBar.height*0.9} options={
                            { 
                                maintainAspectRatio: false,
                                scale: {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0
                                    }
                                }
                            }}></Radar>
                    </div>
                    {/* theme */}
                    <div className={"theme module"} style={
                        {
                            left: styles.theme.left,
                            top: styles.theme.top,
                            width: styles.theme.width,
                            height: styles.theme.height,
                        }
                    }></div>
                    <div className={"themeBar moduleTitle"} style={
                        {
                            left: styles.themeBar.left,
                            width: styles.themeBar.width,
                            height: styles.themeBar.height,
                            top: styles.themeBar.top
                        }
                    }>Keywords</div>
                    <div className={"keywords"} style={
                        {
                            left: styles.keywords.left,
                            width: styles.keywords.width,
                            height: styles.keywords.height,
                            top: styles.keywords.top
                        }
                    }>
                        {this.state.keywords.map((item, i) => 
                                <div className={"item"} key={i} onClick={() => this.props.knowledgeSearch(item)}>
                                    <div className={"item-number"}><span>{i+1}</span></div>
                                    <div className={"item-info"}>
                                        <span className={"title"}>{item}</span>
                                        <span></span>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}