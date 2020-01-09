import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MenuItem.scss';

import getDivPosition from "../../Functions/Position/DivPosition";
import LoadingGif from '../../assets/icons/loadingIcon.gif';
import notificationIcon from '../../assets/icons/notificationIcon.png';

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            iconPositionGap:{
                leftGap:0,
                topGap:0
            }
        }
    }

    componentDidMount = () => {
        let icon = document.getElementById("logo_" + this.props.alt);
        this.setState({
            iconPositionGap:{
                leftGap:Math.floor(icon.offsetWidth * (1 - this.props.ratio)),
                topGap:Math.floor(icon.offsetHeight * (1 - this.props.ratio))
            }
        });
    }

    changeImage = event => {
        event.preventDefault();
        let image = document.getElementById("logo_" + this.props.alt);
        this.setState({
            hover: !this.state.hover
        }, () => {
            let circle = document.getElementById("cursor-circle");
            if (this.state.hover) {
                if (!this.props.isLoading && !this.props.isNotification) {
                    image.setAttribute("src", this.props.imageHover);
                }
                circle.classList.add("hover-cursor");
                let coord = getDivPosition(image);
                circle.style.left = (coord.left - 10) + 'px';
                circle.style.top = (coord.top - 10) + 'px';

            } else {
                if (!this.props.isLoading && !this.props.isNotification) {
                    image.setAttribute("src", this.props.image);
                }
                circle.classList.remove("hover-cursor");
            }

        });
    }

    render() {
        let iconPosition = {
            left:this.props.toriPosition.left + this.props.left - this.state.iconPositionGap.leftGap,
            top:this.props.toriPosition.top + this.props.top - this.state.iconPositionGap.topGap
        }
        return (
            <div data-key={this.props.data} id={this.props.id} className={"list-item"} onMouseMove={this.hover} onMouseEnter={this.changeImage} onMouseLeave={this.changeImage} 
                onClick={this.props.handleClick} style={
                    {
                        left:iconPosition.left,
                        top:iconPosition.top,
                    }
                }>

                <img data-key={this.props.data} id={"logo_" + this.props.alt} className={"list-item-logo-container"} 
                    src={this.props.isLoading ? LoadingGif : this.props.isNotification ? notificationIcon : this.props.image} alt={this.props.alt} />

                <Popover id={"list-item-popover"} data-key={this.props.data} placement={this.props.placement} isOpen={this.state.hover} target={this.props.id} >
                    <PopoverHeader>{this.props.title}</PopoverHeader>
                    <PopoverBody>{this.props.details}</PopoverBody>
                </Popover>
            </div>
        );
    }
}