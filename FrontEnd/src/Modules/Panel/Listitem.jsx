import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import getDivPosition from "../../Functions/Position/DivPosition";
import LoadingGif from '../../assets/icons/loadingIcon.gif';
import notificationIcon from '../../assets/icons/notificationIcon.png';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover:false
        }
    }

    componentDidMount = () => {
    }

    handleSubmit = event => {
        event.preventDefault();
    }
    changeImage = event => {
        event.preventDefault();
        let image = document.getElementById("logo_" + this.props.alt);
        let text = document.getElementById("text_" + this.props.alt);
        this.setState({
            hover:!this.state.hover
        }, () => {
            let circle = document.getElementById("cursor-circle");
            if(this.state.hover){
                text.style.color ="white";
                if(!this.props.isLoading && !this.props.isNotification){
                    image.setAttribute("src", this.props.imageHover);
                }
                circle.classList.add("hover-cursor");
                let coord = getDivPosition(image);
                circle.style.left = (coord.left-10) +'px';
                circle.style.top = (coord.top-10) +'px';
                
            }else{
                text.style.color ="grey";
                if(!this.props.isLoading && !this.props.isNotification){
                    image.setAttribute("src", this.props.image);
                }
                circle.classList.remove("hover-cursor");
            }
            
        });
    }

    render() {
        return (
            this.props.left ? 
                <div data-key={this.props.data} id={this.props.alt} className={"side-panel-container-list-item left-list-item"} onMouseMove={this.hover} onMouseEnter={this.changeImage} onMouseLeave={this.changeImage} onClick={this.props.handleClick}>
                    <div data-key={this.props.data} id={"text_" + this.props.alt} className={"list-item-text-container left-list-text-item"}>{this.props.title}</div>
                    <img data-key={this.props.data} id={"logo_" + this.props.alt} className={"list-item-logo-container"} src={this.props.isLoading ? LoadingGif : this.props.isNotification ? notificationIcon : this.props.image} alt={this.props.alt} />
                    <Popover id={"itempopover"} data-key={this.props.data} placement="right" isOpen={this.state.hover} target={this.props.alt} >
                        <PopoverHeader>{this.props.title}</PopoverHeader>
                        <PopoverBody>{this.props.details}</PopoverBody>
                    </Popover>
                </div>
            :
                <div data-key={this.props.data} id={this.props.alt} className={"side-panel-container-list-item right-list-item"} onMouseEnter={this.changeImage} onMouseLeave={this.changeImage} onClick={this.props.handleClick}>
                    <Popover id={"itempopover"} data-key={this.props.data} placement="left" isOpen={this.state.hover} target={this.props.alt}>
                        <PopoverHeader>{this.props.title}</PopoverHeader>
                        <PopoverBody>{this.props.details}</PopoverBody>
                    </Popover>
                    <img data-key={this.props.data} id={"logo_" + this.props.alt} className={"list-item-logo-container"} src={this.props.isLoading ? LoadingGif : this.props.isNotification ? notificationIcon : this.props.image} alt={this.props.alt} />
                    <div data-key={this.props.data} id={"text_" + this.props.alt} className={"list-item-text-container right-list-text-item"}>{this.props.title}</div>
                </div>
        );
    }
}