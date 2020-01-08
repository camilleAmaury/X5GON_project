import React, { Component } from 'react';

import './Document.scss';
import getDivPosition from '../../../Functions/Position/DivPosition';


export default class Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
        // positionning div
        let scene = document.getElementById("scene");
        let centerdiv = getDivPosition(scene);
        centerdiv = {
            height: scene.offsetHeight,
            width: scene.offsetWidth,
            top:centerdiv.top,
            left:centerdiv.left
        }
        let document_open = document.getElementById("document_open");
        let document_pos = {
            left:(centerdiv.width - document_open.offsetWidth)/2 + centerdiv.left,
            top:(centerdiv.top - document_open.offsetHeight)/2 + centerdiv.top,
            width: document_open.offsetWidth,
            height:document_open.offsetHeight
        }
        document_open.style.left = document_pos.left + "px";
        document_open.style.top = document_pos.top + "px";
        // positionning scroll
        let upper_scroll = document.getElementById("upper_scroll");
        let lower_scroll = document.getElementById("lower_scroll");
        let upper={
            left:(document_pos.width - upper_scroll.offsetWidth)/2,
            top:0,
            width:upper_scroll.offsetWidth,
            height:upper_scroll.offsetHeight
        }
        let lower={
            left:(document_pos.width - lower_scroll.offsetWidth)/2,
            top: lower_scroll.offsetHeight,
            width:lower_scroll.offsetWidth,
            height:lower_scroll.offsetHeight
        }
        upper_scroll.style.left = upper.left + "px";
        upper_scroll.style.top = upper.top + "px";
        lower_scroll.style.left = lower.left + "px";
        lower_scroll.style.top = lower.top + "px";
        // positionning scroll texture
        let upper_scroll_texture = document.getElementById("upper_scroll_texture");
        let lower_scroll_texture = document.getElementById("lower_scroll_texture");
        let upper_texture={
            left:(upper.width - upper_scroll_texture.offsetWidth)/2,
            top:(upper.height - upper_scroll_texture.offsetHeight)/2,
            width:upper_scroll_texture.offsetWidth,
            height:upper_scroll_texture.offsetHeight
        }
        let lower_texture={
            left:(lower.width - lower_scroll_texture.offsetWidth)/2,
            top:(lower.height - lower_scroll_texture.offsetHeight)/2,
            width:lower_scroll_texture.offsetWidth,
            height:lower_scroll_texture.offsetHeight
        }
        upper_scroll_texture.style.left = upper_texture.left + "px";
        upper_scroll_texture.style.top = upper_texture.top + "px";
        lower_scroll_texture.style.left = lower_texture.left + "px";
        lower_scroll_texture.style.top = lower_texture.top + "px";
        lower_scroll_texture.style.backgroundPositionY = 150 + 'px';
        // positionning scroll_center texture
        let scroll_center = document.getElementById("scroll_center");
        let scroll_center_texture={
            left:(upper.width - scroll_center.offsetWidth)/2 + upper.left,
            top:(upper.height)/2 + upper.top,
            width:scroll_center.offsetWidth,
            height:scroll_center.offsetHeight
        }
        scroll_center.style.left = scroll_center_texture.left + "px";
        scroll_center.style.top = scroll_center_texture.top + "px";
    }
    

    scroll = event => {
       
        // get scrolling speed
        let speed = event.deltaY/50;
        // scrolling textures
        let upper_scroll_texture = document.getElementById("upper_scroll_texture");
        let lower_scroll_texture = document.getElementById("lower_scroll_texture");
        let scroll_center_texture = document.getElementById("scroll_center");
        let one = isNaN(parseInt(upper_scroll_texture.style.backgroundPositionY.replace("px", ""))) ? 0 : parseInt(upper_scroll_texture.style.backgroundPositionY.replace("px", ""));
        let two = isNaN(parseInt(lower_scroll_texture.style.backgroundPositionY.replace("px", ""))) ? 0 : parseInt(lower_scroll_texture.style.backgroundPositionY.replace("px", ""));
        let three = isNaN(parseInt(scroll_center_texture.style.backgroundPositionY.replace("px", ""))) ? 0 : parseInt(scroll_center_texture.style.backgroundPositionY.replace("px", ""));
        upper_scroll_texture.style.backgroundPositionY = one - speed + 'px';
        lower_scroll_texture.style.backgroundPositionY = two - speed + 'px';
        scroll_center_texture.style.backgroundPositionY = three - speed + 'px';
    }

    render() {
        return (
            <div id={"document_open"} onWheel={this.scroll}>
                <div id={"scroll_center"}>
                    
                </div>
                <div id={"upper_scroll"} className={"scroll"}>
                    <div id={"upper_scroll_texture"} className={"scroll_texture"}></div>
                </div>
                <div id={"lower_scroll"} className={"scroll"}>
                    <div id={"lower_scroll_texture"} className={"scroll_texture"}></div>
                </div>
            </div>
        );
    }
}