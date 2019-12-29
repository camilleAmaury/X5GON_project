import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover:false
        }
    }

    componentDidMount = () => {
        // this.setState({hover:true})
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
            image.setAttribute("src", this.state.hover ? this.props.imageHover : this.props.image);
            text.style.color = this.state.hover ? "white" : "grey";
        });
    }

    render() {
        return (
            this.props.left ? 
                <div id={this.props.alt} className={"side-panel-container-list-item left-list-item"} onMouseEnter={this.changeImage} onMouseLeave={this.changeImage}>
                    <div id={"text_" + this.props.alt} className={"list-item-text-container left-list-text-item"}>{this.props.title}</div>
                    <img id={"logo_" + this.props.alt} className={"list-item-logo-container"} src={this.props.image} alt={this.props.alt} />
                    <Popover placement="right" isOpen={this.state.hover} target={this.props.alt} >
                        <PopoverHeader>{this.props.title}</PopoverHeader>
                        <PopoverBody>{this.props.details}</PopoverBody>
                    </Popover>
                </div>
            :
                <div id={this.props.alt} className={"side-panel-container-list-item right-list-item"} onMouseEnter={this.changeImage} onMouseLeave={this.changeImage}>
                    <Popover placement="left" isOpen={this.state.hover} target={this.props.alt}>
                        <PopoverHeader>{this.props.title}</PopoverHeader>
                        <PopoverBody>{this.props.details}</PopoverBody>
                    </Popover>
                    <img id={"logo_" + this.props.alt} className={"list-item-logo-container"} src={this.props.image} alt={this.props.alt} />
                    <div id={"text_" + this.props.alt} className={"list-item-text-container right-list-text-item"}>{this.props.title}</div>
                </div>
        );
    }
}