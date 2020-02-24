import React, { Component } from 'react';

import './Popover.css';

export default class Popover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color:"darkred",
            arrowColor:"white",
            arrowBox:{
                width:30,
                height:15
            },
            pointerEvents:true
        }
    }

    componentDidMount = () => {
        let color = this.props.color === null || this.props.color === undefined ? this.state.color : this.props.color;
        this.setState({
            color:color,
            arrowColor:this.props.side === "bottom" ? "white" : color,
            pointerEvents:this.props.pointerEvents === undefined || this.props.pointerEvents === null || this.props.pointerEvents
        });
    }

    preparePositions = () => {
        let obj = {};
        // popover
        obj.popover = {
            width: this.props.size.width,
            height: this.props.size.height
        };
        // arrow
        obj.arrow = this.state.arrowBox;

        obj.popover.left = this.props.side !== "bottom" && this.props.side !== "top" ? (this.props.side === "left" ? this.props.target.left - obj.popover.width - obj.arrow.width : 
            (this.props.side === "right" ? this.props.target.left + this.props.target.width + obj.arrow.width : 0)) 
            : this.props.target.left + Math.floor((this.props.target.width-obj.popover.width)/2);
        obj.arrow.left = this.props.side !== "bottom" && this.props.side !== "top" ? 
            (this.props.side === "left" ? obj.popover.width : this.props.side === "right" ? - obj.arrow.width : 0) 
            : Math.floor((obj.popover.width-obj.arrow.width)/2);
        obj.popover.top = this.props.side !== "left" && this.props.side !== "right" ? (this.props.side === "top" ? this.props.target.top - obj.popover.height - obj.arrow.height : 
        (this.props.side === "bottom" ? this.props.target.top + this.props.target.height + obj.arrow.height: 0)) :
            this.props.target.top + Math.floor(this.props.ratio * this.props.target.height - (obj.popover.height)/2);
        obj.arrow.top = this.props.side !== "left" && this.props.side !== "right" ? 
            (this.props.side === "top" ? obj.popover.height : this.props.side === "bottom" ? -30 : 0) 
            : Math.floor((obj.popover.height - obj.arrow.height)/2);

        return obj;
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"popover-" + this.props.id} className={"popover " + this.props.className} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden",
                    width:styles.popover.width,
                    height:styles.popover.height,
                    left:styles.popover.left,
                    top:styles.popover.top,
                    zIndex:(this.props.zIndex === null || this.props.zIndex === undefined ? "0" : this.props.zIndex),
                    pointerEvents:this.state.pointerEvents ? "auto" : "none"
                }
            }>
                <div className={"popover-header"} style={{pointerEvents:this.state.pointerEvents ? "auto" : "none"}}><span>{this.props.title}</span></div>
                <div className={"popover-body"} style={
                    {
                        backgroundColor:this.state.color,
                        direction:this.props.side === "right" ? "ltr" : 'rtl',
                        pointerEvents:this.state.pointerEvents ? "auto" : "none"
                    }
                }>
                    {this.props.children}
                </div>
                <div className={"triangle"} style={
                    {
                        left:styles.arrow.left,
                        top:styles.arrow.top,
                        borderLeft:this.props.side === "bottom" || this.props.side === "top" ? styles.arrow.height + "px solid transparent":
                            this.props.side === "left" ? styles.arrow.width + "px solid " + this.state.arrowColor: "none",
                        borderRight:this.props.side === "bottom" || this.props.side === "top" ? styles.arrow.height + "px solid transparent":
                            this.props.side === "right" ? styles.arrow.width + "px solid " + this.state.arrowColor: "none",
                        borderTop:this.props.side === "left" || this.props.side === "right" ? styles.arrow.height + "px solid transparent":
                            this.props.side === "top" ? styles.arrow.width + "px solid " + this.state.arrowColor: "none",
                        borderBottom:this.props.side === "left" || this.props.side === "right" ? styles.arrow.height + "px solid transparent":
                            this.props.side === "bottom" ? styles.arrow.width + "px solid " + this.state.arrowColor: "none",
                        pointerEvents:this.state.pointerEvents ? "auto" : "none"
                    }
                }></div>
            </div>
        );
    }
}