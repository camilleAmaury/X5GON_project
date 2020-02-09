import React, { Component } from 'react';

import './Popover.css';

export default class Popover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color:"darkred",
            arrowBox:{
                width:30,
                height:15
            }
        }
    }

    componentDidMount = () => {
        this.setState({
            color:this.props.color === null || this.props.color === undefined ? this.state.color : this.props.color  
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

        obj.popover.left = this.props.side === "left" ? this.props.target.left - obj.popover.width - obj.arrow.width : 
            this.props.side === "right" ? this.props.target.left + this.props.target.width + obj.arrow.width : 0;
        obj.arrow.left = this.props.side === "left" ? obj.popover.width : this.props.side === "right" ? - obj.arrow.width : 0;
        obj.popover.top = this.props.target.top + Math.floor(this.props.ratio * this.props.target.height - (obj.popover.height)/2);
        obj.arrow.top = Math.floor((obj.popover.height - obj.arrow.height)/2);
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
                }
            }>
                <div className={"popover-header"}><span>{this.props.title}</span></div>
                <div className={"popover-body"} style={
                    {
                        backgroundColor:this.state.color,
                        direction:this.props.side === "right" ? "ltr" : 'rtl'
                    }
                }>
                    {this.props.children}
                </div>
                <div className={"triangle"} style={
                    {
                        left:styles.arrow.left,
                        top:styles.arrow.top,
                        borderLeft:this.props.side === "left" ? styles.arrow.width + "px solid " + this.state.color: "none",
                        borderRight:this.props.side === "right" ? styles.arrow.width + "px solid " + this.state.color : "none",
                        borderTop:styles.arrow.height + "px solid transparent",
                        borderBottom:styles.arrow.height + "px solid transparent",
                    }
                }></div>
            </div>
        );
    }
}