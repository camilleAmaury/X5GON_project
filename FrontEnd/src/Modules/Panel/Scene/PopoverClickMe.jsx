import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import './PopoverClickMe.scss';

export default class PopoverClickMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Popover id={"clickme"} placement={this.props.placement} isOpen={this.props.isOpen} target={this.props.target}>
                <PopoverHeader>Click here !</PopoverHeader>
                <PopoverBody>
                    In order to see more, just click.
                </PopoverBody>
            </Popover>
        );
    }
}