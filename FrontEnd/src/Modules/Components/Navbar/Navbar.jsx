import React, { Component } from 'react';

import './Navbar.css';

import BackgroundImage from '../../../assets/Panel/Navbar/backgroundimage.png';

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
            top:Math.floor((obj.info.height - imagewidth)/8),
        };
        // username account
        obj.usernameAccount = {
            width:obj.info.width,
            top:obj.imageAccount.top + obj.imageAccount.height + 20,
        };
        // search
        obj.searchBar = {
            width:this.props.NavbarBox.width,
            height:15/100 * this.props.NavbarBox.height,
            top:obj.info.height
        };
        // icons
        obj.icons = {
            width:this.props.NavbarBox.width,
            height:55/100 * this.props.NavbarBox.height,
            top:obj.searchBar.height + obj.searchBar.top 
        };

        return obj;
    }

    render() {
        let styles = this.preparePositions();

        return (
            <div id={"Navbar"} style={
                {
                    height:styles.navbarBg.height,
                    width:styles.navbarBg.width,
                }
            }>
                <div id={"Account-information"} style={
                    {
                        height:styles.info.height,
                        width:styles.info.width,
                    }
                }>
                    <img id={"image-account"} src={BackgroundImage} alt={"image frame"} style={
                        {
                            width:styles.imageAccount.width,
                            height:styles.imageAccount.height,
                            left:styles.imageAccount.left,
                            top:styles.imageAccount.top,
                        }
                    }></img>
                    <div id={"username-text"} style={
                        {
                            width:styles.usernameAccount.width,
                            top:styles.usernameAccount.top,
                        }
                    }>Static Username</div>
                </div>
                <div id={"Search-bar"} style={
                    {
                        height:styles.searchBar.height,
                        width:styles.searchBar.width,
                        top:styles.searchBar.top
                    }
                }></div>
                <div id={"Icons"} style={
                    {
                        height:styles.icons.height,
                        width:styles.icons.width,
                        top:styles.icons.top
                    }
                }></div>
            </div>
        );
    }
}