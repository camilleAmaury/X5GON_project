import React, { Component } from 'react';

import './Scholar.css';

// import axios from "axios";

// import Popover from '../../../Popover/Popover';

import chair from '../../../../../assets/Panel/Scene/Scholar/chair.png';
import scroll from '../../../../../assets/Panel/Scene/Scholar/goldScroll.png';
import table from '../../../../../assets/Panel/Scene/Scholar/table.png';
import lantern from '../../../../../assets/Panel/Scene/Scholar/lantern.png';
import scholar from '../../../../../assets/Panel/Scene/Scholar/ScholarHigh.png';
// import scholarSeeking from '../../../../../assets/Panel/Scene/Scholar/ScholarSeeking.png';
// import scholarAnswering from '../../../../../assets/Panel/Scene/Scholar/ScholarAnswering.png';

export default class Scholar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beamBox: {
                size: 50
            },
            chairBox:{
                width:204,
                height:107
            },
            tableBox:{
                width:307,
                height:240
            },
            scrollBox:{
                width:219,
                height:420
            },
            lanternBox:{
                width:131,
                height:235
            },
            scholarBox:{
                width:346,
                height:466
            },
            isHovered:false
        };
    }

    componentDidMount = () => {
    }

    preparePositions = () => {
        let obj = {};
        // background
        if(true){
            // verticalbeam
            obj.beamVertical = {
                width:Math.floor(this.state.beamBox.size*this.props.ratio),
                height:this.props.scene.height
            };
            obj.beamVertical.left2 = Math.floor(this.props.scene.width * 11/16 - (obj.beamVertical.width)/2);
            obj.beamVertical.left1 = Math.floor(this.props.scene.width * 5/16 - (obj.beamVertical.width)/2);
            // horizontalBeam
            obj.beamHorizontal = {
                height:Math.floor(this.state.beamBox.size*this.props.ratio),
                width1:obj.beamVertical.left1 + obj.beamVertical.width,
                width2:obj.beamVertical.left2 - (obj.beamVertical.left1 + obj.beamVertical.width),
                left1:0,
                left2:obj.beamVertical.left1 + obj.beamVertical.width,
                left3:obj.beamVertical.left2 + obj.beamVertical.width
            };
            obj.beamHorizontal.top1 = Math.floor(this.props.scene.width * 1/16 - (obj.beamHorizontal.height)/2);
            obj.beamHorizontal.top2 = Math.floor((this.props.scene.height - obj.beamHorizontal.height)/2);
        }
        // details
        if(true){
            // chair
            obj.chair = {
                width:Math.floor(this.state.chairBox.width*this.props.ratio),
                height:Math.floor(this.state.chairBox.height*this.props.ratio),
            };
            obj.chair.left = Math.floor(this.props.scene.width * 1/6 - (obj.chair.width)/2);
            obj.chair.top = this.props.scene.height - obj.chair.height;
            // table
            obj.table = {
                width:Math.floor(this.state.tableBox.width*this.props.ratio),
                height:Math.floor(this.state.tableBox.height*this.props.ratio),
            };
            obj.table.left = Math.floor((this.props.scene.width - obj.table.width)/2);
            obj.table.top = this.props.scene.height - obj.table.height;
            // scroll
            obj.scroll = {
                width:Math.floor(this.state.scrollBox.width*this.props.ratio),
                height:Math.floor(this.state.scrollBox.height*this.props.ratio),
            };
            obj.scroll.left = Math.floor(this.props.scene.width * 5/6 - (obj.scroll.width)/2);
            obj.scroll.top = Math.floor((this.props.scene.height - obj.scroll.height)/2);
            // lantern
            obj.lantern = {
                width:Math.floor(this.state.lanternBox.width*this.props.ratio),
                height:Math.floor(this.state.lanternBox.height*this.props.ratio),
            };
            obj.lantern.left = Math.floor((this.props.scene.width - obj.lantern.width)/2);
            obj.lantern.top = 0;
        }
        // scholar
        if(true){
            // scholar
            obj.scholar = {
                width:Math.floor(this.state.scholarBox.width*this.props.ratio),
                height:Math.floor(this.state.scholarBox.height*this.props.ratio),
            };
            obj.scholar.left = Math.floor(this.props.scene.width * 1/6 - (obj.scholar.width)/2);
            obj.scholar.top = Math.floor(this.props.scene.height - obj.scholar.height - 3/4*obj.chair.height);
            // hover
            obj.hover = {
                width:obj.scholar.width,
                height:obj.scholar.height-30,
            };
            obj.hover.left = Math.floor(this.props.scene.width * 1/6 - (obj.hover.width)/2);
            obj.hover.top = Math.floor(this.props.scene.height - obj.hover.height - 3/4*obj.chair.height);
        }
        return obj;
    }

    hover = (bool) => {
        this.setState({isHovered:bool});
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"scholar"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>
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
                <div className={"scholar-hover"} style={
                    {
                        left: styles.hover.left,
                        width: styles.hover.width,
                        height: styles.hover.height,
                        top: styles.hover.top,
                        borderRadius:`${styles.hover.width/2}px / ${styles.hover.height/2}px`,
                        visibility:this.state.isHovered ? "visible":"hidden"
                    }
                }></div>
                <div className={"chair"} style={
                    {
                        left: styles.chair.left,
                        width: styles.chair.width,
                        height: styles.chair.height,
                        top: styles.chair.top,
                        backgroundImage:`url('${chair}')`,
                        backgroundSize:"cover"
                    }
                }></div>
                <div className={"table"} style={
                    {
                        left: styles.table.left,
                        width: styles.table.width,
                        height: styles.table.height,
                        top: styles.table.top,
                        backgroundImage:`url('${table}')`,
                        backgroundSize:"cover"
                    }
                }></div>
                <div className={"scroll"} style={
                    {
                        left: styles.scroll.left,
                        width: styles.scroll.width,
                        height: styles.scroll.height,
                        top: styles.scroll.top,
                        backgroundImage:`url('${scroll}')`,
                        backgroundSize:"cover"
                    }
                }></div>
                <div className={"lantern"} style={
                    {
                        left: styles.lantern.left,
                        width: styles.lantern.width,
                        height: styles.lantern.height,
                        top: styles.lantern.top,
                        backgroundImage:`url('${lantern}')`,
                        backgroundSize:"cover"
                    }
                }></div>
                
                <div className={"scholar"} onMouseEnter={() => {this.hover(true)}} onMouseLeave={() => {this.hover(false)}} style={
                    {
                        left: styles.scholar.left,
                        width: styles.scholar.width,
                        height: styles.scholar.height,
                        top: styles.scholar.top,
                        backgroundImage:`url('${scholar}')`,
                        backgroundSize:"cover"
                    }
                }></div>
            </div>
        );
    }
}