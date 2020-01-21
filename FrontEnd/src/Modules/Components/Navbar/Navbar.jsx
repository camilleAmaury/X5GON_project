import React, { Component } from 'react';

import './Navbar.css';

import BackgroundImage from '../../../assets/Panel/Navbar/backgroundimage.png';
import Icon1 from '../../../assets/Panel/Navbar/IconImprovement.png';
import Icon2 from '../../../assets/Panel/Navbar/IconKnowledge.png';
import Icon3 from '../../../assets/Panel/Navbar/IconCommunity.png';
import Icon4 from '../../../assets/Panel/Navbar/IconScholar.png';
import Icon5 from '../../../assets/Panel/Navbar/IconLectures.png';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    preparePositions = () => {
        let obj = {};
        // Navbar background
        obj.navbarBg = {
            width:this.props.NavbarBox.width,
            height:this.props.NavbarBox.height
        };
        // information
        obj.info = {
            width:this.props.NavbarBox.width,
            height:30/100 * this.props.NavbarBox.height
        };
        // personnal Image
        let imagewidth = Math.floor(this.props.NavbarBox.width * 1/2 * this.props.ratio);
        obj.imageAccount = {
            width:imagewidth,
            height:imagewidth,
            left:Math.floor((obj.info.width - imagewidth)/2),
            top:Math.floor((obj.info.height - imagewidth)/8)
        };
        // username account
        obj.usernameAccount = {
            width:obj.info.width,
            top:obj.imageAccount.top + obj.imageAccount.height + 20
        };
        // separation bar 1 
        obj.sepBar1 = {
            width:obj.info.width/2,
            top:obj.info.height - 4
        };
        obj.sepBar1.left = Math.floor((obj.info.width - obj.sepBar1.width)/2);
        // search
        obj.searchBar = {
            width:this.props.NavbarBox.width,
            height:15/100 * this.props.NavbarBox.height,
            top:obj.info.height
        };
        // search
        obj.searchBarText = {
            width:Math.floor(obj.searchBar.width*3/4),
            height:Math.floor(obj.searchBar.height/2-20),
            borderRadius:Math.floor(obj.searchBar.height/4) + 2,
            lineHeight:Math.floor((obj.searchBar.height)/2-20),
        };
        obj.searchBarText.left = Math.floor((obj.searchBar.width-obj.searchBarText.width-20)/2);
        obj.searchBarText.top = Math.floor((obj.searchBar.height-obj.searchBarText.height-20)/2);
        // icons
        obj.icons = {
            width:this.props.NavbarBox.width,
            height:55/100 * this.props.NavbarBox.height,
            top:obj.searchBar.height + obj.searchBar.top 
        };
        // separation bar 2
        obj.sepBar2 = {
            width:obj.icons.width/2,
            top:0
        };
        obj.sepBar2.left = Math.floor((obj.icons.width - obj.sepBar2.width)/2);
        // icons
        obj.icon = {
            width:Math.floor(obj.icons.width*3/4),
            height:Math.floor(obj.icons.height* 2/3 * 1/7)
        };
        obj.icon.icon1 = {
            top:Math.floor(obj.icons.height*1/7),
            left:Math.floor((obj.icons.width - obj.icon.width)/2)
        }
        obj.icon.icon2 = {
            top:Math.floor(obj.icons.height*2/7),
            left:Math.floor((obj.icons.width - obj.icon.width)/2)
        }
        obj.icon.icon3 = {
            top:Math.floor(obj.icons.height*3/7),
            left:Math.floor((obj.icons.width - obj.icon.width)/2)
        }
        obj.icon.icon4 = {
            top:Math.floor(obj.icons.height*4/7),
            left:Math.floor((obj.icons.width - obj.icon.width)/2)
        }
        obj.icon.icon5 = {
            top:Math.floor(obj.icons.height*5/7),
            left:Math.floor((obj.icons.width - obj.icon.width)/2)
        }
        return obj;
    }

    render() {
        let styles = this.preparePositions();

        return (
            <div id={"Navbar"} style={
                {
                    height:styles.navbarBg.height,
                    width:styles.navbarBg.width
                }
            }>
                <div id={"Account-information"} style={
                    {
                        height:styles.info.height,
                        width:styles.info.width
                    }
                }>
                    <img id={"image-account"} src={BackgroundImage} alt={"frame"} style={
                        {
                            width:styles.imageAccount.width,
                            height:styles.imageAccount.height,
                            left:styles.imageAccount.left,
                            top:styles.imageAccount.top
                        }
                    }></img>
                    <div id={"username-text"} style={
                        {
                            width:styles.usernameAccount.width,
                            top:styles.usernameAccount.top
                        }
                    }>Static Username</div>
                    <div className={"separation-bar"} style={
                        {
                            width:styles.sepBar1.width,
                            top:styles.sepBar1.top,
                            left:styles.sepBar1.left
                        }
                    }></div>
                </div>
                <div id={"Search-bar"} style={
                    {
                        height:styles.searchBar.height,
                        width:styles.searchBar.width,
                        top:styles.searchBar.top
                    }
                }>
                    <textarea id={"Search-bar-text"} rows={1} placeholder={"Some keywords ..."} style={
                        {
                            height:styles.searchBarText.height,
                            width:styles.searchBarText.width,
                            top:styles.searchBarText.top,
                            left:styles.searchBarText.left,
                            borderRadius:styles.searchBarText.borderRadius,
                            lineHeight:styles.searchBarText.lineHeight+"px",
                        }
                    }></textarea>
                </div>
                <div id={"Icons"} style={
                    {
                        height:styles.icons.height,
                        width:styles.icons.width,
                        top:styles.icons.top
                    }
                }>
                    <div className={"separation-bar"} style={
                        {
                            width:styles.sepBar2.width,
                            top:styles.sepBar2.top,
                            left:styles.sepBar2.left
                        }
                    }></div>
                    {/* Icons list */}
                    <div className={"icon-navbar"} data-key={0} style={
                        {
                            width:styles.icon.width,
                            height:styles.icon.height,
                            top:styles.icon.icon1.top,
                            left:styles.icon.icon1.left
                        }
                    }>
                        <img src={Icon1} alt={"Icon Improvement"} className={"icon-image"} width={styles.icon.height} height={styles.icon.height}></img>
                        <span className={"icon-text"}>Improvement</span>
                    </div>
                    <div className={"icon-navbar"} data-key={1} style={
                        {
                            width:styles.icon.width,
                            height:styles.icon.height,
                            top:styles.icon.icon2.top,
                            left:styles.icon.icon2.left
                        }
                    }>
                        <img src={Icon2} alt={"Icon Knowledge"} className={"icon-image"} width={styles.icon.height} height={styles.icon.height}></img>
                        <span className={"icon-text"}>Knowledge</span>
                    </div>
                    <div className={"icon-navbar"} data-key={2} style={
                        {
                            width:styles.icon.width,
                            height:styles.icon.height,
                            top:styles.icon.icon3.top,
                            left:styles.icon.icon3.left
                        }
                    }>
                        <img src={Icon3} alt={"Icon Community"} className={"icon-image"} width={styles.icon.height} height={styles.icon.height}></img>
                        <span className={"icon-text"}>Community</span>
                    </div>
                    <div className={"icon-navbar"} data-key={3} style={
                        {
                            width:styles.icon.width,
                            height:styles.icon.height,
                            top:styles.icon.icon4.top,
                            left:styles.icon.icon4.left
                        }
                    }>
                        <img src={Icon4} alt={"Icon Scholar"} className={"icon-image"} width={styles.icon.height} height={styles.icon.height}></img>
                        <span className={"icon-text"}>Scholar</span>
                    </div>
                    <div className={"icon-navbar"} data-key={4} style={
                        {
                            width:styles.icon.width,
                            height:styles.icon.height,
                            top:styles.icon.icon5.top,
                            left:styles.icon.icon5.left
                        }
                    }>
                        <img src={Icon5} alt={"Icon Lectures"} className={"icon-image"} width={styles.icon.height} height={styles.icon.height}></img>
                        <span className={"icon-text"}>Lectures</span>
                    </div>
                </div>
            </div>
        );
    }
}