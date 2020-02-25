import React, { Component, Fragment } from 'react';

import Popover from '../../../Popover/Popover';
import { Radar } from 'react-chartjs-2';

import axios from "axios";

import './Profile.css';
import './css-circular-prog-bar.css';

import badge1 from '../../../../../assets/Panel/Scene/Profile/badgeApprentice.png';
import badge2 from '../../../../../assets/Panel/Scene/Profile/badgeHelp.png';
import badge3 from '../../../../../assets/Panel/Scene/Profile/badgeEager.png';
import badge4 from '../../../../../assets/Panel/Scene/Profile/badgeMaster.png';
import badge5 from '../../../../../assets/Panel/Scene/Profile/badgeArchitect.png';

import im1 from '../../../../../assets/Img/_1.png';
import im2 from '../../../../../assets/Img/_2.png';
import im3 from '../../../../../assets/Img/_3.png';
import im4 from '../../../../../assets/Img/_4.png';
import im5 from '../../../../../assets/Img/_5.png';
import im6 from '../../../../../assets/Img/_6.png';
import im7 from '../../../../../assets/Img/_7.png';
import im8 from '../../../../../assets/Img/_8.png';
import im9 from '../../../../../assets/Img/_9.png';
import im10 from '../../../../../assets/Img/_10.png';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beamBox: {
                size: 50
            },
            maxXp: 1,
            currentXp: 0,
            currentLevel: 0,
            isHoverExp: false,
            badgesBox: {
                badge1: [125, 133],
                badge2: [423, 131],
                badge3: [151, 124],
                badge4: [240, 124],
                badge5: [194, 299]
            },
            badges: [],
            skills: {},
            keywords: [],
            server: "",
            badgesTexture: [badge1, badge2, badge3, badge4, badge5],
            config: {},
            images:[im1,im2,im3,im4,im5,im6,im7,im8,im9,im10]
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
        if (this.props.isMounted) {
            this.setState({ server: server, config: config }, () => {
                this._loadExperience();
                this._loadKeywords();
                this._loadBadges();
                this._loadRadar();
                if (this.props.isMounted) {

                }
            });
        }
    }

    _loadKeywords = () => {
        axios.get(`${this.state.server}users/${JSON.parse(localStorage.getItem("isConnected")).id}/searches`, this.state.config)
            .then(request => {
                this.setState({ keywords: request.data });
            })
            .catch(error => {
                // error
            });
    }

    _loadRadar = () => {
        axios.get(`${this.state.server}users/${JSON.parse(localStorage.getItem("isConnected")).id}/skills`, this.state.config)
            .then(request => {
                let res = request.data;
                let skills = {
                    labels: [], datasets: [
                        {
                            data: [],
                            label: "Your Skills",
                            backgroundColor: "rgba(180,49,32,0.5)"
                        }
                    ]
                };
                for (let i = 0; i < res.length; i++) {
                    skills.labels.push(res[i].skill_name);
                    skills.datasets[0].data.push(res[i].skill_level);
                }
                this.setState({ skills: skills });
            })
            .catch(error => {
                // error
            });
    }

    _loadExperience = () => {
        axios.get(`${this.state.server}users/${JSON.parse(localStorage.getItem("isConnected")).id}/experience`, this.state.config)
            .then(request => {
                this.setState({
                    currentLevel: request.data.level_number,
                    maxXp: request.data.next_stage,
                    currentXp: request.data.experience
                });
            })
            .catch(error => {
                // error
            });
    }

    _loadBadges = () => {
        axios.get(`${this.state.server}badges?user_id=${JSON.parse(localStorage.getItem("isConnected")).id}`, this.state.config)
            .then(request => {
                let badges = request.data;
                for (let i = 0; i < badges.length; i++) {
                    badges[i].hovered = false;
                    badges[i].image_adress = this.state.badgesTexture[i];
                }
                this.setState({ badges: request.data });
            })
            .catch(error => {
                // error
            });
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
        if (true) {
            // module experience
            obj.experience = {
                width: Math.floor(this.props.scene.width * 1 / 4),
                height: Math.floor(this.props.scene.height * 1 / 2)
            };
            obj.experience.left = Math.floor(this.props.scene.width * 1 / 16);
            obj.experience.top = Math.floor(this.props.scene.height * 1 / 16);
            // circle back
            obj.progressCircle = {
                width: Math.min(Math.floor(obj.experience.width * 1 / 2), Math.floor(obj.experience.height * 1 / 2)),
                height: Math.min(Math.floor(obj.experience.width * 1 / 2), Math.floor(obj.experience.height * 1 / 2))
            };
            obj.progressCircle.left = Math.floor((obj.experience.width - obj.progressCircle.width) / 2);
            obj.progressCircle.top = Math.floor(obj.experience.height * 1 / 8);
            // circle image
            obj.centerCircle = {
                width: obj.progressCircle.width * 0.86,
                height: obj.progressCircle.width * 0.86,
            };
            // xpBar
            obj.xpBar = {
                width: obj.experience.width * 1.1,
                height: obj.experience.width * 2 / 8,
            };
            obj.xpBar.left = obj.experience.left + Math.floor((obj.experience.width - obj.xpBar.width) / 2);
            obj.xpBar.top = Math.floor(obj.experience.height * 13 / 16);
        }
        // modules badge
        if (true) {
            // module badges
            obj.badges = {
                width: Math.floor(this.props.scene.width * 9 / 16),
                height: Math.floor(this.props.scene.height * 3 / 4)
            };
            obj.badges.left = Math.floor(this.props.scene.width * 6 / 16);
            obj.badges.top = Math.floor(this.props.scene.height * 1 / 16);
            // text
            obj.badgesBar = {
                width: Math.floor(obj.badges.width / 6 * 1.2),
                height: Math.floor(this.props.scene.height * 1 / 8)
            };
            obj.badgesBar.left = obj.badges.left + Math.floor(obj.badges.width * 5 / 6);
            obj.badgesBar.top = obj.badges.top + Math.floor(obj.badges.height * 1 / 16);
            // badge1
            obj.badge1 = {
                width: Math.floor(this.state.badgesBox.badge1[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge1[1] * this.props.ratio)
            };
            obj.badge1.left = Math.floor(obj.badges.width * 1 / 16);
            obj.badge1.top = Math.floor(obj.badges.height * 1 / 16);
            // badge2
            obj.badge2 = {
                width: Math.floor(this.state.badgesBox.badge2[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge2[1] * this.props.ratio)
            };
            obj.badge2.left = Math.floor(obj.badges.width * 4 / 16);
            obj.badge2.top = Math.floor(obj.badges.height * 1 / 16);
            // badge3
            obj.badge3 = {
                width: Math.floor(this.state.badgesBox.badge3[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge3[1] * this.props.ratio)
            };
            obj.badge3.left = Math.floor(obj.badges.width * 3 / 16);
            obj.badge3.top = Math.floor(obj.badges.height * 1 / 16) + obj.badge1.height + obj.badge1.top;
            // badge4
            obj.badge4 = {
                width: Math.floor(this.state.badgesBox.badge4[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge4[1] * this.props.ratio)
            };
            obj.badge4.left = Math.floor(obj.badges.width * 3 / 16);
            obj.badge4.top = Math.floor(obj.badges.height * 2 / 16) + obj.badge3.height + obj.badge3.top;
            // badge4
            obj.badge5 = {
                width: Math.floor(this.state.badgesBox.badge5[0] * this.props.ratio),
                height: Math.floor(this.state.badgesBox.badge5[1] * this.props.ratio)
            };
            obj.badge5.left = Math.floor(obj.badges.width * 1 / 16) + obj.badge4.width + obj.badge4.left;
            obj.badge5.top = Math.floor(obj.badges.height * 3 / 32) + obj.badge1.height + obj.badge1.top;
        }
        // modules skills
        if (true) {
            // module skills
            obj.skills = {
                width: Math.floor(this.props.scene.width * 1 / 2),
                height: Math.floor(this.props.scene.height * 2 / 3)
            };
            obj.skills.left = obj.badges.left + Math.floor((obj.badges.width - obj.skills.width) / 2)
            obj.skills.top = obj.badges.top + obj.badges.height + Math.floor(this.props.scene.height * 1 / 16);
            // skillsBar
            obj.skillsBar = {
                width: obj.skills.width * 9 / 8,
                height: obj.skills.height * 7 / 8,
            };
            obj.skillsBar.left = obj.skills.left + Math.floor((obj.skills.width - obj.skillsBar.width) / 2);
            obj.skillsBar.top = obj.skills.top + Math.floor((obj.skills.height - obj.skillsBar.height) / 2)
        }
        // modules recurrent theme
        if (true) {
            // module theme
            obj.theme = {
                width: Math.floor(this.props.scene.width * 1 / 4),
                height: Math.floor(this.props.scene.width * 1 / 2)
            };
            obj.theme.left = Math.floor(this.props.scene.width * 1 / 16);
            obj.theme.top = obj.experience.top + obj.experience.height + Math.floor(this.props.scene.height * 1 / 16);
            // themeBar
            obj.themeBar = {
                width: obj.theme.width * 1.1,
                height: obj.theme.height * 1 / 8,
            };
            obj.themeBar.left = obj.theme.left + Math.floor((obj.theme.width - obj.themeBar.width) / 2);
            obj.themeBar.top = obj.theme.top + Math.floor(obj.theme.height * 1 / 16);
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
        if (this.props.isMounted) {
            this.setState({ isHoverExp: bool });
        }
    }

    hoverBadge = (i, bool) => {
        if (this.props.isMounted) {
            let badges = this.state.badges;
            badges[i].hovered = bool;
            if (this.props.isMounted) {
                this.setState({ badges: badges });
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
                                lineHeight: styles.progressCircle.height
                            }
                        }>
                            <div className={"left-half-clipper"} style={
                                {
                                    left: 0,
                                    top: 0,
                                    width: styles.progressCircle.width,
                                    height: styles.progressCircle.height,
                                    clip: percentage <= 0.5 ? `rect(0px, ${styles.progressCircle.width}px, ${styles.progressCircle.width}px, ${styles.progressCircle.width / 2}px)` : 'rect(auto,auto,auto,auto)'
                                }
                            }>
                                <div className={"value-bar"} style={
                                    {
                                        left: 0,
                                        top: 0,
                                        width: styles.progressCircle.width,
                                        height: styles.progressCircle.height,
                                        border: `${styles.progressCircle.height * 0.08}px solid #53777A`,
                                        clip: `rect(0px, ${styles.progressCircle.width / 2}px, ${styles.progressCircle.width}px, 0px)`,
                                        transform: percentage <= 0.5 ? `rotate(${percentage * 360}deg)` : `rotate(180deg)`
                                    }
                                }></div>
                                <div className={"value-bar"} style={
                                    {
                                        left: 0,
                                        top: 0,
                                        width: styles.progressCircle.width,
                                        height: styles.progressCircle.height,
                                        border: `${styles.progressCircle.height * 0.08}px solid #53777A`,
                                        clip: `rect(0px, ${styles.progressCircle.width / 2}px, ${styles.progressCircle.width}px, 0px)`,
                                        transform: percentage <= 0.5 ? `rotate(0deg)` : `rotate(${percentage * 360}deg)`
                                    }
                                }></div>
                            </div>
                            <div className={"image"} onClick={this.openUploadFile} style={
                                {
                                    width: styles.centerCircle.width,
                                    height: styles.centerCircle.height,
                                    backgroundImage: `url('${this.state.images[JSON.parse(localStorage.getItem("isConnected")).image]}')`,
                                    backgroundSize: "cover"
                                }
                            }></div>


                        </div>

                    </div>
                    <div className={"xpBar moduleTitle"} onMouseEnter={() => { this.hoverExp(true) }} onMouseLeave={() => { this.hoverExp(false) }} style={
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
                        {this.state.badges.map((item, i) =>
                            <Fragment key={i}>
                                <div className={"badge"} onMouseEnter={() => { this.hoverBadge(i, true) }} onMouseLeave={() => { this.hoverBadge(i, false) }} style={
                                    {
                                        left: styles["badge" + item.badge_id].left,
                                        width: styles["badge" + item.badge_id].width,
                                        height: styles["badge" + item.badge_id].height,
                                        top: styles["badge" + item.badge_id].top,
                                        borderRadius: i === 0 ? "50%" : "0%",
                                        backgroundImage: i !== 0 ? `url('${item.image_adress}')` : "linear-gradient(0.15turn, white, grey)",
                                        backgroundSize: i !== 0 ? "cover" : "none"
                                    }
                                }>
                                    {i === 0 ?
                                        <div className={"badge1"} style={
                                            {
                                                width: styles["badge" + item.badge_id].width * 0.8,
                                                height: styles["badge" + item.badge_id].height * 0.8,
                                                backgroundImage: `url('${item.image_adress}')`,
                                                backgroundSize: "cover"
                                            }
                                        }></div> : ""
                                    }

                                    <div className={"silk"} style={
                                        {
                                            borderRadius: i === 0 ? "50%" : "0%",
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: item.possess_by_user ? (item.hovered ? `rgba(0,0,0,0.1)` : `rgba(0,0,0,0)`) : (item.hovered ? `rgba(0,0,0,0)` : `rgba(0,0,0,0.3)`)
                                        }
                                    }></div>
                                </div>
                                <Popover color={"#334458"} id={"badge-hover-" + i} ratio={1 / 2} side={"left"} size={{ width: 350, height: 100 }}
                                    target={{ left: styles["badge" + item.badge_id].left, width: styles["badge" + item.badge_id].width, height: styles["badge" + item.badge_id].height, top: styles["badge" + item.badge_id].top }}
                                    isOpen={item.hovered && this.props.isOpen} title={item.badge_name}>
                                    <div className={"badge-hover"}>
                                        <span>{item.description}</span>
                                    </div>
                                </Popover>
                            </Fragment>
                        )}
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
                            backgroundColor: "white"
                        }
                    }>
                        <Radar data={this.state.skills} width={styles.skillsBar.height * 0.9} height={styles.skillsBar.height * 0.9} options={
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
                            <div className={"item"} key={i} onClick={() => this.props.knowledgeSearch(item.search_subject)}>
                                <div className={"item-number"}><span>{i + 1}</span></div>
                                <div className={"item-info"}>
                                    <span className={"title"}>{item.search_subject}</span>
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